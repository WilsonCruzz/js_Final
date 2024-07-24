const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Load User model
const users = require('./routes/api/users');

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose.connect(db)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});