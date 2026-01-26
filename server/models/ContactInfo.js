const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String, default: '' },
    resumeDownloadCount: { type: Number, default: 0 },
    heroTitle: { type: String, default: '' },
    heroSubtitle: { type: String, default: '' },
    heroDescription: { type: String, default: '' },
    heroImage: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
