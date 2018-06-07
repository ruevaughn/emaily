const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys/webhooks', (req, res) => {
   const p = new Path('/api/surveys/:surveyId/:choice');

   const events = _.chain(req.body)
     .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {email, surveyId: match.surveyId, choice: match.choice}
        }
     })
     .compact()
     .uniqBy('email', 'surveyId')
     .value();

     console.log(events);
   res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();


      res.send(user);
    } catch(err) {
      console.log(err)
      res.status(422).send(err);
    }


  });
};
