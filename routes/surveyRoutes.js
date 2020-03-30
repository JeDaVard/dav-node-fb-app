const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('../models/Survey');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {
    // app.get('api/surveys', requireLogin, async (req, res) => {
    //     //
    // });
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(`, `).map(email => ({ email }) ), // if we have error check this to trim the email
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, template(survey));

        try {
            if (req.user.credits > 10) {
                await mailer.send();
                await survey.save();

                req.user.credits -= 10;
                const user = await req.user.save();

                res.send(user);
            }
        } catch (e) {
            res.status(422).send(e)
        }

    });
    // app.post('api/surveys/webhooks', requireLogin, async (req, res) => {
    //     //
    // });
};