const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//ROUTE:1 Get all products using : GET "api/products/getallproducts"
router.get('/getallproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured in get all products");
    }
})

module.exports = router;