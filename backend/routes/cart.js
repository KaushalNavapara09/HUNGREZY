const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const fetchuser = require('../middleware/fetchuser');
const Product = require('../models/Product')
const User = require('../models/User')

//ROUTE:1 Add a new product in cart using : POST "/api/cart/addProduct"
router.post('/addProduct', fetchuser, async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.body.id })
        const cartdata = new Cart({
            user: req.user.id,
            name: data.name,
            veg: data.veg,
            price: data.price,
            description: data.description,
            seller: data.seller,
            quantity: data.quantity,
            img: data.img
        })
        let totalPriceData = await Cart.find({ user: req.user.id })
        let newdata = totalPriceData.reduce((accum, elem) => {
            let val = elem.price
            return accum + val
        }, 0)//calculate cart total

        await Cart.updateMany({ user: req.user.id }, { $set: { cartamount: newdata } }, { new: true })//update cart total
        const addedProduct = await cartdata.save();
        res.json(addedProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured in add to cart");
    }
})

//ROUTE:2 Fetch all products from cart using : GET "/api/cart/getallproducts"
router.get('/getallproducts', fetchuser, async (req, res) => {
    try {
        // const data = await Cart.find({ user: req.user.id });
        const tolatdata = await Cart.find({ user: req.user.id });
        let newdata = tolatdata.reduce((accum, elem) => {
            let val = elem.price
            return accum + val
        }, 0)//calculate cart total
        await Cart.updateMany({ user: req.user.id }, { $set: { cartamount: newdata } }, { new: true })//update cart total
        const updateddata = await Cart.find({ user: req.user.id })
        // console.log(updateddata); //get updated obj
        res.status(200).json(updateddata)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured in fetch all products from cart");
    }
})

//ROUTE:3 Remove product from cart using : DELETE "/api/cart/removeproduct"
router.delete('/removeproduct/:id', fetchuser, async (req, res) => {
    try {
        let product = await Cart.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product Not found");
        }

        product = await Cart.findByIdAndDelete(req.params.id);
        let totalPriceData = await Cart.find({ user: req.user.id })
        let newdata = totalPriceData.reduce((accum, elem) => {
            let val = elem.price
            return accum + val
        }, 0)//calculate cart total

        await Cart.updateMany({ user: req.user.id }, { $set: { cartamount: newdata } }, { new: true })//update cart total amount
        const updatedData = await Cart.findOne({ _id: req.params.id })
        // console.log(updateddata); //get updated obj
        res.status(200).json(updatedData)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured in remove products from cart");
    }
})

//ROUTE:4 Fetch number of products from cart using : GET "/api/cart/getnumofproducts"
router.get('/getnumofproducts', fetchuser, async (req, res) => {
    try {
        const data = await Cart.find({}).count({ user: req.user.id });
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured in fetch number products from cart");
    }
})


//ROUTE:5 Increase the quantity of products from cart using : PUT "/api/cart/incrQty"
router.put('/incrQty/:id', fetchuser, async (req, res) => {
    try {
        const cartData = await Cart.findById(req.params.id);
        const foodData = await Product.findOne({ name: cartData.name })
        if (cartData.user == req.user.id) {
            const updatedCartData = await Cart.findByIdAndUpdate({ _id: req.params.id }, { $set: { quantity: cartData.quantity + 1 } }, { new: true }) //increased quatity

            const updatedPriceData = await Cart.findByIdAndUpdate({ _id: req.params.id }, { $set: { price: (updatedCartData.quantity * foodData.price) } }, { new: true }) //update price with updated quatity
            // console.log(updatedPriceData)
            let totalPriceData = await Cart.find({ user: req.user.id })
            let newdata = totalPriceData.reduce((accum, elem) => {
                let val = elem.price
                return accum + val
            }, 0)//calculate cart total

            await Cart.updateMany({ user: req.user.id }, { $set: { cartamount: newdata } }, { new: true })//update cart total amount
            const updatedData = await Cart.findOne({ _id: req.params.id })
            // console.log(updateddata); //get updated obj
            res.status(200).json(updatedData)
        } else {
            res.status(400).json("Error : You have no access to plus the quantity")
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured in increase quantity in cart");
    }
})

//ROUTE:6 Decrease the quantity of products from cart using : PUT "/api/cart/decrQty"
router.put('/decrQty/:id', fetchuser, async (req, res) => {
    try {
        const cartData = await Cart.findById(req.params.id);
        const foodData = await Product.findOne({ name: cartData.name })
        if (cartData.user == req.user.id) {
            const updatedCartData = await Cart.findByIdAndUpdate({ _id: req.params.id }, { $set: { quantity: cartData.quantity - 1 } }, { new: true }) //increased quatity

            const updatedPriceData = await Cart.findByIdAndUpdate({ _id: req.params.id }, { $set: { price: (updatedCartData.quantity * foodData.price) } }, { new: true }) //update price with updated quatity
            // console.log(updatedPriceData)
            let totalPriceData = await Cart.find({ user: req.user.id })
            let newdata = totalPriceData.reduce((accum, elem) => {
                let val = elem.price
                return accum + val
            }, 0)//calculate cart total

            await Cart.updateMany({ user: req.user.id }, { $set: { cartamount: newdata } }, { new: true })//update cart total amount
            const updatedData = await Cart.findOne({ _id: req.params.id })
            // console.log(updateddata); //get updated obj
            res.status(200).json(updatedData)
        } else {
            res.status(400).json("Error : You have no access to minus the quantity")
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured in decrease quantity in cart");
    }
})

//ROUTE:7 Put the address details of user using : PUT "/api/cart/address"
router.put("/address", fetchuser, async (req, res) => {
    try {
        const addedData = await User.updateOne({ _id: req.user.id }, { $set: { houseNo: req.body.houseNo, area: req.body.area, city: req.body.city, pincode: req.body.pincode } }, { new: true })
        res.status(200).json(addedData)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured in adding address");
    }
})

module.exports = router;