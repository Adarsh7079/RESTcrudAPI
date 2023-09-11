const express=require('express');
const router=express.Router();
const Student=require('../model/student');
const mongoose=require("mongoose");



router.get('/',(req,res,next)=>{
    // res.status(200).json({
    //     message:'This is student get request'
    // })
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        });
    })

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})


router.post('/',(req,res,next)=>{
    //create object of student and put data in it 
   const student=new Student({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    gender:req.body.gender
   })
   student.save()
   .then(result=>{
    console.log(result);
    res.status(200).json({
        newStudent:result,
        message:"data submit successfully"
    })
   })

   .catch(err=>{
    console.log(err);
    res.status(500).json({  
        error:err
    })
   })
})


//find by ID
router.get('/:id',(req,res,next)=>{
     console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
   })

   //delete 
   router.delete('/:id',(req,res,next)=>{
    Student.findByIdAndDelete({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'Data Deleted successfully',
            result:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            
            error:err
        })
    })
   })


   //update 
   router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
        }
    })
    .then(result=>{
        res.status(200).json({
            updated:result
        })
    })
    .catch(err=>{
        console.log(err),
        res.status(500).json({
            error:err
        })
    })
   })

module.exports=router
