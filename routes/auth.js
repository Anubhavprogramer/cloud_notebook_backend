const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User')
const router = express.Router();


// creating a user using: POST "api/auth/", Dosen't require auth
router.post('/',(req,res)=>{
    res.send(req.body);
    const user = User(req.body);
    user.save();
    console.log(req.body)
})

module.exports = router;