const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();
const Note = require('../models/Notes')
const { body, validationResult } = require("express-validator");


//routes to get all the notes from the database and show it the user as GET request
router.get('/fetchallnotes',fetchuser, async(req,res)=>{

    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes)
        // res.send("radhe radhe");  mendatory to be written
    } catch (error) {
        
      //sending the error is any problem occured
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER OCCURED");
    }
})

//  this routes add notes to  our database useing post and login required  
router.get('/addnotes',fetchuser,[
    body("tittle", "Enter a valid tittle") // checking for a valid tittle from the req.body
    .isLength({min: 5}) //must have min legth of 5 
    .exists(),  // must exists 
    body("description", "must contain discretion") //check for valid description of the note
     .isLength({ min: 5 })   //this is to check for the valid length that is 5
     .exists(), //it is compulsory that password should be exists
    // body("tag","add a valid tag")
], async(req,res)=>{

    try {
        
        //if any error occured in geting data from the user of notes that is not a valid note than this error will be returned and note will not be created
        const errors = validationResult(req);
        //if there are erors than send bad request otherwise create the error
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        //here we are creating our note from the user
        const {tittle,description,tag} = req.body;
        const note = new Note({
            tittle, description, tag, user: req.user.id
        })
        
        const savednote = await note.save()
        
        res.json(savednote)
        // res.send("radhe radhe");  mendatory to be written
    } catch (error) {
      //sending the error is any problem occured
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER OCCURED");
    }
})

module.exports = router;