const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./User');
const path = require('path');
require('dotenv').config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 1000;
//connect to mongodb
// Using promises
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('view'));

//routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'view','login.html'));
});
// ✅ Route: Register page
app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname,'view','signup.html'));
});

// ✅ Route: Dashboard page
app.get('/ice.html', (req, res) => {
  res.sendFile(path.join(__dirname,'view','ice.html'));
});

// ✅ Route: Dashboard page
app.get('/cart.html', (req, res) => {
  res.sendFile(path.join(__dirname,'view','cart.html'));
});
app.post('/',async (req,res) => {
    const { username, password} =req.body;
    const user = await User.findOne({username,password}); 
    if(user) {
      res.send(`<h2>welcome,${user.username}!</h2>`);
    }
    else{
      res.send('<h2>Invalid credentials</h2>');
    }
});
//start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)

});

 
