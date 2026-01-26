const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    type: { type: String, required: true, enum: ['Experience', 'Education'] },
    title: { type: String, required: true },
    subtitle: { type: String, required: true }, // Company or Institution
    date: { type: String, required: true },
    description: [{ type: String }] // Bullet points
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
