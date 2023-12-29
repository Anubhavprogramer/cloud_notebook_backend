const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();
const Notes = require('../models/Notes')


//routes to get all the notes from the database and show it the user as GET request
router.get('/fetchallnotes',fetchuser, async(req,res)=>{

    const notes = await Notes.find({user:req.user.id});

    res.json(notes)
    // res.send("radhe radhe");  mendatory to be written
})

//  this routes add notes to  our database useing post and login required  
router.get('/addnotes',fetchuser,[
    
], async(req,res)=>{

   res.json(notes)
    // res.send("radhe radhe");  mendatory to be written
})

module.exports = router;