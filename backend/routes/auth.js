const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "This is a secret signature";

//ROUTE : 1 Create a user using : POST "/api/auth/createuser"
router.post('/createuser', [
    body('email', "Enter a valid email").isEmail(),
    body('name', "Name must be atleast 3 characters long").isLength({ min: 3 }),
    body('password', "Password must be atleast 5 characters long").isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    let pwdnotmatch = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        if (req.body.password === req.body.cpassword) {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                phoneNo: req.body.phoneNo,
                password: secPass
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken });
        } else {
            pwdnotmatch = true;
            return res.status(400).json({ pwdnotmatch, error: "Password and confirm password does not match" })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//ROUTE : 2 Authenticate a user using : POST "/api/auth/login"
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password can not be blank").exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE : 3 Get loggedin user detail using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE : $ Change loggedin user password using: PUT "/api/auth/changepwd/id". login required
router.put('/changepwd', fetchuser, async (req, res) => {
    let success = false;
    let pwdnotmatch = false;
    try {
        //Find the user to be updated and update it
        let user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).send("Not found");
        }
        const passwordCompare = await bcrypt.compare(req.body.oldpassword, user.password);
        if (passwordCompare) {
            if (req.body.newpassword === req.body.cpassword) {
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.newpassword, salt);
                let uData = await User.updateOne({ email: user.email }, { $set: { password: secPass } });
                success = true;
                res.status(200).json({ success, uData })
            } else {
                pwdnotmatch = true
                res.status(400).json({ pwdnotmatch, error: "New password and re-typed password doesn't match" });
            }
        } else {
            res.status(400).json({ success, error: "Old password doesn't match" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Change password error" + error);
    }
})


module.exports = router;