const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');// create express server 
const app = express();
require('dotenv').config();


// Require App Routes..
const AuthRouter = require('./Routes/AuthRouter');
const UserRouter = require('./Routes/UserRouter');
const PostRouter = require('./Routes/PostRouter');

//3d Party MiddleWares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Custom MiddleWares 

// Connect To Node Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server Runing On Port: " + port);
});

// connect to mongoose
mongoose.connect("mongodb://localhost:27017/TwitterCloneApp")
    .then(() => {
        console.log("Data Base Connected....");
    }).catch((err) => {
        console.log(err);
    });

// Call Routes
app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/post', PostRouter)