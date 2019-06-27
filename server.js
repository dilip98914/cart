const express = require('express');
const config=require('./config/config.js');
const mongoose = require('mongoose');
const cors=require('cors');
const cookieParser = require('cookie-parser');
const port  = process.env.PORT || 8080;

//mongodb  connect
mongoose.connect(config.mongodb,(err,docs)=>{
    if(!err){
        console.log("mongodb connected");
    }
    else{
        console.log('error connecting mongodb');
        
    }
});
mongoose.Promise = global.Promise;

const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
require('./routes/api/user.js')(app);

//must last ??
require('./routes/index.js')(app);




app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

module.exports=app;