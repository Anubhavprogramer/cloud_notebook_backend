const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const router = express.Router();


// creating a user using: POST "api/auth/", Dosen't require auth
router.post('/',[
    body('name','Enter a valid name').isLength({min:2}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
],(req,res)=>{

    //creating a  normal user 
    // const user = User(req.body);
    // user.save();
    // console.log(req.body)

    // creating a user using express validator
     const errors = validationResult(req);
     if(!errors.isEmpty())
     {
        return res.status(400).json({errors:errors.array()})
     }
     User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
     })
     .then(user => {res.json(user),console.log(user)})
     .catch(err=> {console.log(err),
     res.json({error:"Please enter the unique value"})})

     
})

module.exports = router;