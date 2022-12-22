const express=require('express');
require('./db/conn');
const dotenv=require("dotenv");
const mongoose=require('mongoose');

const User=require('./model/userSchema');
const Router=require('./router/auth');

const app=express();
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(Router);
dotenv.config({path:'./config.env'});

require('./middleware/authenticate');

const port=process.env.PORT;
app.use(express.urlencoded({ extended: false }));

app.listen(port,()=>{
    console.log(`Connection setup at ${port}`)
})