const express = require('express');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3003;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'de7c5b9dc12d706b1773e6bc12b1dd25-6df690bb-64f231f8' });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle POST requests to send emails
app.post('/send-email', (req, res) => {
  const email = req.body.email;

  mg.messages.create('sandbox14c6a440996b4ac9b9b84741d07e06f5.mailgun.org', {
    from: "gurnoorka05@gmail.com",
    to: [email],
    subject: "Welcome to DEV@DEAKIN",
    text: "Welcome to our platform!",
    html: "<h1>Welcome to our platform!</h1>"
  })
  .then(msg => {
    console.log(msg);
    res.status(200).send('Welcome email sent successfully!');
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error sending welcome email');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
