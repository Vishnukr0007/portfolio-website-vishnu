const https = require('https');

/**
 * Send WhatsApp notification to site owner via CallMeBot API
 * CallMeBot API Format:
 * https://api.callmebot.com/whatsapp.php?phone=[phone]&text=[text]&apikey=[apikey]
 */
const sendWhatsAppNotification = async ({ name, email, subject, message }) => {
    try {
        const phone = process.env.CALLMEBOT_PHONE || process.env.WHATSAPP_PHONE || '+916282899456';
        const apiKey = process.env.CALLMEBOT_API_KEY;

        if (!apiKey) {
            console.log('[WhatsAppService] CALLMEBOT_API_KEY not set in .env. Skipping WhatsApp notification.');
            return { success: false, reason: 'No CALLMEBOT_API_KEY configured' };
        }

        const formattedMessage = 
`*New Portfolio Contact*

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject || 'General Inquiry'}

*Message:*
${message}`;

        const encodedPhone = encodeURIComponent(phone.replace(/[^0-9+]/g, ''));
        const encodedText = encodeURIComponent(formattedMessage);
        const encodedApiKey = encodeURIComponent(apiKey);

        const url = `https://api.callmebot.com/whatsapp.php?phone=${encodedPhone}&text=${encodedText}&apikey=${encodedApiKey}`;

        return new Promise((resolve) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        console.log('[WhatsAppService] CallMeBot notification sent successfully.');
                        resolve({ success: true });
                    } else {
                        console.warn(`[WhatsAppService] CallMeBot API responded with status ${res.statusCode}: ${data}`);
                        resolve({ success: false, status: res.statusCode, data });
                    }
                });
            }).on('error', (err) => {
                console.error('[WhatsAppService] Error triggering CallMeBot API:', err.message);
                resolve({ success: false, error: err.message });
            });
        });
    } catch (error) {
        console.error('[WhatsAppService] Exception in sendWhatsAppNotification:', error.message);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendWhatsAppNotification,
};
