const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    veg: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    cartamount:{
        type: Number
    }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;