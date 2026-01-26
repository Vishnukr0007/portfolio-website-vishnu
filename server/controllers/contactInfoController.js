const ContactInfo = require('../models/ContactInfo');

exports.getContactInfo = async (req, res) => {
    try {
        let info = await ContactInfo.findOne();
        if (!info) {
            // Provide defaults if none exist
            info = await ContactInfo.create({
                email: 'vishnukrishnankutty54@gmail.com',
                phone: '+91 6282899456'
            });
        }
        res.json(info);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateContactInfo = async (req, res) => {
    try {
        let info = await ContactInfo.findOne();
        if (info) {
            info = await ContactInfo.findByIdAndUpdate(info._id, req.body, { new: true });
        } else {
            info = await ContactInfo.create(req.body);
        }
        res.json(info);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.downloadResume = async (req, res) => {
    try {
        const info = await ContactInfo.findOne();
        if (!info || !info.resumeUrl) {
            console.error('[Resume] Download failed: No resume URL found in database');
            return res.status(404).json({ message: 'Resume URL not found in database. Please upload/save it in admin panel.' });
        }
        
        let downloadUrl = info.resumeUrl;

        // Log the redirection for debugging
        console.log(`[Resume] Redirecting to: ${downloadUrl}`);

        // Normalize Google Drive links for direct download
        if (downloadUrl.includes('drive.google.com')) {
            const fileIdMatch = downloadUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || downloadUrl.match(/id=([a-zA-Z0-9_-]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
                // Using the uc?export=download endpoint for direct download
                downloadUrl = `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
                console.log(`[Resume] Normalized to Direct Download: ${downloadUrl}`);
            } else {
                console.warn('[Resume] Drive link detected but file ID could not be extracted');
            }
        }
        
        info.resumeDownloadCount += 1;
        await info.save();
        
        res.redirect(downloadUrl);
    } catch (error) {
        console.error('[Resume] Download Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getResumeStats = async (req, res) => {
    try {
        const info = await ContactInfo.findOne();
        res.json({ count: info ? info.resumeDownloadCount : 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
