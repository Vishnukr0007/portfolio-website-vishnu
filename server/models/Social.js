const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
    platform: { type: String, required: true }, // e.g., 'GitHub', 'LinkedIn', 'Twitter'
    url: { type: String, required: true },
    icon: { type: String }, // Optional: lucide icon name or similar
}, { timestamps: true });

module.exports = mongoose.model('Social', socialSchema);
