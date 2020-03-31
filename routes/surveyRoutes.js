const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const _ = require('lodash');
const Survey = require('../models/Survey');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/surveyTemplate');
const { Path } = require('path-parser');
const { URL } = require('url');

module.exports = (app) => {
    // app.get('/api/surveys/thanks', (req, res) => {
    //     res.send('Thank you for voting!')
    // });
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true, 'recipients.$.answer': choice },
                        lastResponded: new Date()
                    }
                ).exec();
                console.log(surveyId, email, choice)
            })
            .value();

        res.send({});
    });
    // app.get('api/surveys', requireLogin, async (req, res) => {
    //     //
    // });
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() }) ),
            _user: req.user.id,
            dateSent: Date.now()
        });
        const mailer = new Mailer(survey, template(survey));

        try {
            if (req.user.credits >= 10) {
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