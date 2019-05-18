require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const invitation_handler = require('./handlers/invitations');

app.use(express.static(path.join(__dirname, '../../build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/invitations', invitation_handler);

// catch-all fallback route for spa
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('success'));