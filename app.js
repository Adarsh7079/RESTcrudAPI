const express=require('express');
const app=express();
const studentRoute=require('./api/routes/studentrout');
const facultyRout=require("./api/routes/faculty");
const mongoose=require('mongoose');
const { connected } = require('process');
const bodParser=require('body-parser');


// mongoose.connect('mongodb+srv://adarshk8271:Adarsh123@cluster0.96enh9y.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log("connection fail");
});

mongoose.connection.on('connected',connected=>{
    console.log(`connected with database.....`);
})




app.use(bodParser.urlencoded({extended:false}));
app.use(bodParser.json());


//koi v /student hit krega student rout me jayega 
app.use('/student',studentRoute); 
app.use('/faculty',facultyRout); 


app.use((req,res,next)=>{
    res.status(400).json({
       error:'bad request'
    })
})

module.exports=app