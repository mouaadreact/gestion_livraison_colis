const express=require("express");
const cors = require('cors');
const fs=require("fs");
const http=require('http');
const socketIO=require("socket.io");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./Routers/user.routers');
const { checkUser,requireAuth } = require("./Middleware/auth.middleware");
require('dotenv').config({path : './Config/.env'});
require('./Config/db');
const {addUsers,removeUsers,getUsers}=require("./Utils/crud.users");
const app=express();
const corsOptions = {
    origin:process.env.CLIENT_URL,
    credentials :true,

}
app.use(cors(corsOptions));
const fileUpload=require("express-fileupload");
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use(cookieParser());
 
//-------------------------------------------------------------
//routers:
app.use(express.static('client/build'));
app.get("*",checkUser);

       
//app.get('*',checkUser);
app.get('/jwtid',requireAuth,(req,res) => { res.status(200).send(res.locals.user._id)});
app.use('/api/user',userRoutes);


app.all('*',(req,res)=>{
    res.sendFile(`${__dirname}/client/build/index.html`)
})
//-------------------------------------------------------------------------
//serevr of socket.io:

const server=http.createServer(app);


//-----------------------------------------------------------------
//server:
server.listen(process.env.PORT,()=>console.log(`Run server on Port 5000`))