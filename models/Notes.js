const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotesSchema = new Schema({
    user:{
        // this is a primary key which xonnet our notes collection to our user collection in short i am linking both collection togather
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tittle:{
        type: String,
        required: true
    },
    discreption:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default:"General"
    },
    Date:{
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);