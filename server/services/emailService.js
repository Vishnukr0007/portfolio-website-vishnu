const nodemailer = require('nodemailer');

// Create transporter from environment variables
const createTransporter = () => {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
        return null;
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass,
        },
    });
};

/**
 * Send notification email to the site owner (Vishnu)
 */
const sendAdminAlertEmail = async ({ name, email, subject, message }) => {
    try {
        const transporter = createTransporter();
        const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'vishnukrishnankutty54@gmail.com';

        if (!transporter) {
            console.log('[EmailService] SMTP credentials not set in .env. Skipping admin email dispatch.');
            return { success: false, reason: 'No SMTP credentials' };
        }

        const mailOptions = {
            from: `"${name} (Portfolio)" <${process.env.SMTP_USER}>`,
            to: adminEmail,
            replyTo: email,
            subject: `[New Inquiry] ${subject || 'Portfolio Contact'} from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-radius: 10px; background-color: #ffffff;">
                    <h2 style="color: #d97706; margin-bottom: 10px;">New Portfolio Inquiry Received</h2>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 20px;" />
                    <p style="margin: 8px 0; font-size: 14px; color: #475569;"><strong>Sender Name:</strong> ${name}</p>
                    <p style="margin: 8px 0; font-size: 14px; color: #475569;"><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p style="margin: 8px 0; font-size: 14px; color: #475569;"><strong>Subject:</strong> ${subject || 'Portfolio Contact'}</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #d97706; border-radius: 4px;">
                        <p style="margin: 0; font-size: 15px; color: #1e293b; white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="margin-top: 25px; font-size: 12px; color: #94a3b8; text-align: center;">This message was saved to your portfolio database and sent from your website contact form.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`[EmailService] Admin alert sent: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('[EmailService] Failed to send admin alert email:', error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Send auto-reply confirmation email to visitor
 */
const sendVisitorAutoReplyEmail = async ({ name, email, subject }) => {
    try {
        const transporter = createTransporter();

        if (!transporter) {
            console.log('[EmailService] SMTP credentials not set in .env. Skipping visitor auto-reply dispatch.');
            return { success: false, reason: 'No SMTP credentials' };
        }

        const mailOptions = {
            from: `"Vishnu K (Full-Stack Engineer)" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Thank you for reaching out, ${name}!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                    <h2 style="color: #10b981; margin-bottom: 10px;">Hello ${name},</h2>
                    <p style="font-size: 15px; color: #334155; line-height: 1.6;">
                        Thank you for visiting my portfolio website and getting in touch! I have received your message regarding <strong>"${subject || 'your inquiry'}"</strong>.
                    </p>
                    <p style="font-size: 15px; color: #334155; line-height: 1.6;">
                        I review all inquiries promptly and will respond to your email as soon as possible.
                    </p>
                    <div style="margin: 25px 0; padding: 15px; background-color: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
                        <p style="margin: 0; font-size: 14px; color: #166534;">
                            <strong>Best regards,</strong><br />
                            Vishnu K<br />
                            <span style="font-size: 12px; color: #15803d;">Full-Stack Engineer | MERN Developer</span>
                        </p>
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`[EmailService] Visitor auto-reply sent: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('[EmailService] Failed to send visitor auto-reply email:', error.message);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendAdminAlertEmail,
    sendVisitorAutoReplyEmail,
};
