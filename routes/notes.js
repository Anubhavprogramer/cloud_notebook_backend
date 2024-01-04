const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();
const Note = require('../models/Notes')
const { body, validationResult } = require("express-validator");


//routes to get all the notes from the database and show it the user as GET request
router.get('/fetchallnotes',fetchuser, async(req,res)=>{

    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes)
        // res.send("radhe radhe");  mendatory to be written
    } catch (error) {
        
      //sending the error is any problem occured
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER OCCURED");
    }
})

//  this routes add notes to  our database useing post and login required  
router.post('/addnotes',fetchuser,[
    body("title", "Enter a valid title") // checking for a valid title from the req.body
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
        const {title,description,tag} = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
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


// route to update user
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
    try {       
        //here we are creating our note from the user inshort i am doing destructuring 
        const {title,description,tag} = req.body;
        //creating a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        // find the note that  has to be updated
        let note = await Note.findById(req.params.id)
        if(!note)
        {
            res.status(404).send("Not found")
        }
        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note})
        // res.send("radhe radhe");  mendatory to be written
    } catch (error) {
      //sending the error is any problem occured
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER OCCURED");
    }

})

//delete the note using DELETE request 
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {       
        // find the note that  has to be deleted
        let note = await Note.findById(req.params.id)
        if(!note)
        {
            res.status(404).send("Not found")
        }
        //allow deletion if user owns this note
        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted"})
        // res.send("radhe radhe");  mendatory to be written
    } catch (error) {
      //sending the error is any problem occured
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER OCCURED");
    }
})


module.exports = router;