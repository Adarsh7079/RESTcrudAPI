const express=require('express');
const app=express();
const facultyRout=require("./api/routes/faculty");
const mongoose=require('mongoose');
const { connected } = require('process');
const bodyParser=require('body-parser');

const studentRoute=require('./api/routes/studentrout');
const userRout=require('./api/routes/user');


mongoose.connect('mongodb+srv://adarshk8271:Adarsh123@cluster0.96enh9y.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log("connection fail");
});

mongoose.connection.on('connected',connected=>{
    console.log(`connected with database.....`);
});




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//koi v /student hit krega student rout me jayega 
app.use('/student',studentRoute); 
app.use('/faculty',facultyRout); 
app.use('/user',userRout);


app.use((req,res,next)=>{
    res.status(400).json({
       error:'bad request'
    })
})

module.exports=app