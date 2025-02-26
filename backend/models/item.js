const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true},
    quantity: { type: Number, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);