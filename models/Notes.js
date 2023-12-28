const mongoose = require('mongoose');

const NotesSchema = new Schema({
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