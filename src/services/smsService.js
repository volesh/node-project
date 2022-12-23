const twilio = require('twilio')
const {envsConfig} = require('../configs')
const smsTemplates = require('../smsTemplates/smsTemplates')

const client = twilio(envsConfig.TWILIO_ACCOUNT_SID, envsConfig.TWILIO_AUTH_TOKEN)

module.exports = {
    sendSms: async (body, phone) => {
        const accountSid = envsConfig.TWILIO_ACCOUNT_SID;
        const authToken = envsConfig.TWILIO_AUTH_TOKEN;

        try {
            const smsResponse = await client.messages.create({
                body: smsTemplates[body],
                messagingServiceSid: envsConfig.TWILIO_MESSAGING_SERVICE_SID,
                to: phone
            })
        }catch (e) {
            console.error(e.message)
        }
    }
}
