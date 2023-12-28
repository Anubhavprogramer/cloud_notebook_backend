const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("radhe radhe");
})

module.exports = router;