const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: true
    }
}, {
    timestamps: true
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;