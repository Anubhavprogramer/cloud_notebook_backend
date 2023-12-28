const express = require('express');
const { body } = require('express-validator');
const router = express.Router();



router.get('/',(req,res)=>{
    res.send("radhe radhe");
    console.log(req.body)
})

module.exports = router;