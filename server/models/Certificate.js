const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    image: { type: String, required: true, trim: true },
    credentialUrl: { type: String, default: '', trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
