const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderItems: [{
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
        }],
       
        
    }, 
    {
        timestamps: true
    }

);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;