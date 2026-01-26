const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['Frontend', 'Backend', 'Database & API', 'Tools'] },
    icon: { type: String } // Optional: FontAwesome class or Image URL
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
