Node / React / Redux / Mongodb / Stripe / Oauth Application

TODO:
Test with Jest, decide other testing framework

https://stark-refuge-69905.herokuapp.com

Naming convention - if the file exports somethings it is capitalized. So if the file just returns a function it is not capitalized. index.js files do not follow this convention.

Using Application:
Use credit card 4242 4242 4242 4242 as test to get credits so you can setup a survey and send email as well as get results.

Notes
Sendgrid only sends to webhook every 30 seconds or so, so have to process clicks in bulk.


Developing Application:
`npm run dev`
to start development, opens port 3000 and 5000.

Deployment:
git push heroku
