const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, default: 'Portfolio Contact Inquiry', trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
