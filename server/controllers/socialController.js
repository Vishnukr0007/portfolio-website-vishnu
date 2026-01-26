const Social = require('../models/Social');

exports.getSocials = async (req, res) => {
    try {
        const socials = await Social.find();
        res.json(socials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSocial = async (req, res) => {
    try {
        const social = new Social(req.body);
        await social.save();
        res.status(201).json(social);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateSocial = async (req, res) => {
    try {
        const social = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(social);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSocial = async (req, res) => {
    try {
        await Social.findByIdAndDelete(req.params.id);
        res.json({ message: 'Social link deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
