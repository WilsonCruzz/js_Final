const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//Load User model
const users = require('./routes/api/users');

//DB config
const db = require('./config/keys').mongoURI;

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));  
app.use(bodyParser.json());

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