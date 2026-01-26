const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String }, // e.g. E-commerce, AI, Portfolio
    image: { type: String, required: true }, // Cloudinary URL
    tags: [{ type: String }],
    links: {
        demo: { type: String },
        code: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
