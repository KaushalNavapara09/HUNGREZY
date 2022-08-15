const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

//ROUTE:1 Place order using : POST "/api/order/placeorder"
router.post("/placeorder", fetchuser, async (req, res) => {
    try {
        const cartdata = await Cart.find({ user: req.user.id })
        cartdata.map(async (elem) => {
            const data = new Order({
                user: req.user.id, //reference
                name: elem.name,
                veg: elem.veg,
                price: elem.price,
                description: elem.description,
                seller: elem.seller,
                quantity: elem.quantity,
                img: elem.img,
                cartamount: elem.cartamount
            })
            await data.save()
        })
        const orderdata = await Order.find({ user: req.user.id })
        await Cart.deleteMany({ user: req.user.id })
        res.status(201).json(orderdata)
    } catch (e) {
        res.status(400).json(`${e}`)
    }
})

//ROUTE:2 Get order data using : GET "/api/order/getorders"
router.get("/getorders", fetchuser, async (req, res) => {
    try {
        const data = await Order.find({ user: req.user.id })
        res.status(200).send(data);
    } catch (error) {
        res.status(400).json(`${error}`)
    }
})

module.exports = router;