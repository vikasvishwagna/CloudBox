const express = require("express");
// const router = require("./routes/user.routes");
const app = express();
const userRouter = require('./routes/user.routes');
const { body } = require('express-validator');

const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use('/user', userRouter);


app.listen(3000,()=>{
  console.log('running the app on port 3000')
})