const mongoose = require('mongoose');
const Certificate = require('../models/Certificate');

exports.getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.create(req.body);
        res.status(201).json(certificate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid certificate ID' });
        }

        const certificate = await Certificate.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json(certificate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid certificate ID' });
        }

        const certificate = await Certificate.findByIdAndDelete(id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json({ message: 'Certificate deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
