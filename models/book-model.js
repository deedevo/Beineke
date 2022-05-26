let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        default: ''
    },
    subtitle: String,
    pages: String,
    year: String,
    publisher:String,
    description:  String
});
let bookModel = new mongoose.model('book', schema);
module.exports = bookModel;