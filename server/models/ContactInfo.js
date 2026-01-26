const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String, default: '' },
    resumeDownloadCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
