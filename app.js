const express = require("express");
// const router = require("./routes/user.routes");
const app = express();
const userRouter = require('./routes/user.routes');
// const { body } = require('express-validator');
const cookieParser = require('cookie-parser');
const indexRouter =  require('./routes/index.routes');

const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use('/user', userRouter);
app.use('/', indexRouter);


app.listen(3000,()=>{
  console.log('running the app on port 3000')
})