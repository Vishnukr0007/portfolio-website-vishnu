const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSkill = async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
