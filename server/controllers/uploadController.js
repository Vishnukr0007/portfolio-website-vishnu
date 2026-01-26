const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload to Cloudinary using stream
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'portfolio' },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                stream.write(buffer);
                stream.end();
            });
        };

        const result = await streamUpload(req.file.buffer);

        res.status(200).json({ url: result.secure_url });
    } catch (error) {
        console.error('Upload Error Details:', error);
        res.status(500).json({ message: error.message });
    }
};
