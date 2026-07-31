const Message = require('../models/Message');
const { sendAdminAlertEmail, sendVisitorAutoReplyEmail } = require('../services/emailService');
const { sendWhatsAppNotification } = require('../services/whatsappService');

// POST /api/contact - Public contact submission
exports.createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required fields.' });
        }

        // 1. Save message to MongoDB
        const newMessage = await Message.create({
            name,
            email,
            subject: subject || 'Portfolio Contact Inquiry',
            message,
        });

        console.log(`[ContactMessage] New message saved to MongoDB with ID: ${newMessage._id}`);

        // 2. Dispatch notifications asynchronously (does not block HTTP response)
        Promise.allSettled([
            sendAdminAlertEmail({ name, email, subject, message }),
            sendVisitorAutoReplyEmail({ name, email, subject }),
            sendWhatsAppNotification({ name, email, subject, message }),
        ]).then((results) => {
            console.log('[ContactMessage] Notification dispatch cycle completed.');
        });

        return res.status(201).json({
            success: true,
            message: 'Your message has been received! Thank you for getting in touch.',
            data: newMessage,
        });
    } catch (error) {
        console.error('[ContactMessage] Error processing message submission:', error);
        return res.status(500).json({ message: 'Server error processing your message. Please try again later.' });
    }
};

// GET /api/messages - Admin protected: Fetch all inbox messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// PUT /api/messages/:id/read - Admin protected: Mark message as read
exports.markMessageRead = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE /api/messages/:id - Admin protected: Delete message
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
