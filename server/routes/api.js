const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { getProjects, createProject, deleteProject, updateProject } = require('../controllers/projectController');
const { getSkills, createSkill, deleteSkill, updateSkill } = require('../controllers/skillController');
const { getExperience, createExperience, deleteExperience, updateExperience } = require('../controllers/experienceController');
const { getSocials, createSocial, deleteSocial, updateSocial } = require('../controllers/socialController');
const { getContactInfo, updateContactInfo } = require('../controllers/contactInfoController');
const { uploadImage } = require('../controllers/uploadController');
const auth = require('../middleware/auth');

// Projects
router.get('/projects', getProjects);
router.post('/projects', auth, createProject);
router.put('/projects/:id', auth, updateProject);
router.delete('/projects/:id', auth, deleteProject);

// Skills
router.get('/skills', getSkills);
router.post('/skills', auth, createSkill);
router.put('/skills/:id', auth, updateSkill);
router.delete('/skills/:id', auth, deleteSkill);

// Experience
router.get('/experience', getExperience);
router.post('/experience', auth, createExperience);
router.put('/experience/:id', auth, updateExperience);
router.delete('/experience/:id', auth, deleteExperience);

// Socials
router.get('/socials', getSocials);
router.post('/socials', auth, createSocial);
router.put('/socials/:id', auth, updateSocial);
router.delete('/socials/:id', auth, deleteSocial);

// Contact Info
router.get('/contact-info', getContactInfo);
router.put('/contact-info', auth, updateContactInfo);

// Resume
const { downloadResume, getResumeStats } = require('../controllers/contactInfoController');
router.get('/resume/download', downloadResume);
router.get('/resume/stats', auth, getResumeStats);

// Auth
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === process.env.ADMIN_KEY) {
        res.json({ success: true, key: password });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Upload
router.post('/upload', auth, upload.single('image'), uploadImage);

module.exports = router;
