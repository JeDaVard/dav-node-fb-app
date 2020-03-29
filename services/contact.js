const sgMail = require('@sendgrid/mail');
const { sendgridApiKey } = require('../config/keys');
sgMail.setApiKey( sendgridApiKey );

console.log(sendgridApiKey)

const msg = {
    to: 'mikashahinyan@gmail.com',
    from: 'stefani@facebook.co',
    subject: 'Mika',
    text: ':)',
    html: 'heriqa mtnes profiles',
};
sgMail.send(msg).catch(e => console.log(e));