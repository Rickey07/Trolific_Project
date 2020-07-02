require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const expressLayouts = require('express-layouts');

// Connect to db
mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser: true , useUnifiedTopology: true})
.then(done => console.log('Database Connected'))
.catch(err => console.log(`Failed ${err}`));

// Set
app.set('view engine' , 'ejs');
app.set('views' , __dirname + '/views')
app.set('layout' ,'layouts/layout');

// Use 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:'10mb' , extended: false}))
app.use(bodyParser.json());
app.use(expressLayouts);

// Routes 
const photoRouter = require('./controllers/photo');


app.use('/' , photoRouter);


app.listen(process.env.PORT || 80 , () => {
    console.log('Server Started');
})