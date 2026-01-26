const Project = require('../models/Project');
const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a project
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Project ID' });
        }

        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Delete image from Cloudinary
        if (project.image) {
            const publicId = project.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`portfolio/${publicId}`);
        }

        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Project ID format' });
        }

        // Handle image replacement logic
        if (req.body.image) {
            const oldProject = await Project.findById(id);
            if (oldProject && oldProject.image && oldProject.image !== req.body.image) {
                 const publicId = oldProject.image.split('/').pop().split('.')[0];
                 await cloudinary.uploader.destroy(`portfolio/${publicId}`);
            }
        }

        const project = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
