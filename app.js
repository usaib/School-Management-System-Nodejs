//require modules
const express=require('express');
const path=require('path');
const fs=require('fs');
const logger=require('./middleware/logger');
var cors = require('cors');
//db connection
const dbconnect=require('./db/db');
//create app
const app=express();
//Port setup
const PORT=process.env.PORT || 5000;
//Path to firebase-admin-SDK
//initializing firebase-admin-app
//setting static folder
app.use(express.static(path.join(__dirname,'public')));
//Init middleware
app.use(logger);
//setup CORS
app.use(cors());
//body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//routes for student's data.
app.use('/',require('./routes/api/students'));
//routes for class labels.
app.use('/',require('./routes/api/classLabels'));
//routes for section Labels.
app.use('/',require('./routes/api/sectionLabels'));
//routes for created class.
app.use('/',require('./routes/api/createclasses'));
//routes for notifications.
app.use('/',require('./routes/api/notification'));
//route for credentials and token insertion.
app.use('/',require('./routes/api/credentials-token'));

//setup listening
app.listen(PORT,()=>{
    console.log('server is running on: ',PORT);
});
