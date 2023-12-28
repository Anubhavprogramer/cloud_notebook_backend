const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const router = express.Router();


// creating a user using: POST "api/auth/createUser", Dosen't require login , it is signup
router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:2}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
],async(req,res)=>{

    //creating a  normal user 
    // const user = User(req.body);
    // user.save();
    // console.log(req.body)

    // creating a user using express validator
     const errors = validationResult(req);
     //if there are erors than send bad request otherwise create the error
     if(!errors.isEmpty())
     {
        return res.status(400).json({errors:errors.array()})
     }
     //check weather the eamil exits already

     try {
        
         let user = await User.findOne({email: req.body.email})
         if(user){
             return res.status(400).json({error:"Sorry a user with this email already exits"})
            } 
            
            //creating user for databse
            user = await User.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            
            res.json({"nice":"User created"})
            
            
            //  .then(user => {res.json(user),console.log(user)}) //if user gets created than add it to the database
            //  .catch(err=> {console.log(err), res.json({error:"Please enter the unique value",message:err.message})}) //if error occured than console.log the error
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some:error occured")
        }
            
        })
        
module.exports = router;