const Experience = require('../models/Experience');

exports.getExperience = async (req, res) => {
    try {
        const experience = await Experience.find().sort({ date: -1 });
        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createExperience = async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json(experience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Experience deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(experience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
