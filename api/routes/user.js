const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const bcrypt=require('bcryptjs')

const User =require("../model/user");

const { error } = require('console');
const jwt=require('jsonwebtoken');



router.post('/sign-up',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else{
            const user =new User ({
                _id:mongoose.Schema.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                userType:req.body.userType

            })

            user.save()
            .then(result=>{
                res.status(200).json({
                    newuser:result
                })
            })
            .catch(err=>{
                error:err;
            })
        }
    })
})


//login rout 
router.post("/logn",(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1)
        {
            return res.status(401).json({
                message:'user not exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    message:'password not match'
                })
            }
            if(result)
            {
                const token=jwt.sign({
                    username:user[0].username,
                    userType:user[0].userType,

                },
                'this is dummy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username:uset[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token
                })
            }
        })
    })
})



module.exports=router