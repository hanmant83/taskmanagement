const express=require('express');  // call express
const bodyParser=require('body-parser');  
const app=express();  // define our app using express
require("dotenv/config");
let taskRouter=require('./routes/task.js');
let userRouter=require('./routes/user.js');
const cors = require('cors')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var port=process.env.PORT || 8080  // set our port

// REGISTER OUR ROUTES
app.use('/task',taskRouter);
app.use('/user',userRouter);
// START THE SERVER

var server=app.listen(port,function(){
    console.log('Service running on port ',port);
})