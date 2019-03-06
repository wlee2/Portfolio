const mongoose = require('mongoose');

const {Schema} = mongoose;
const projectListsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    src: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: false
    },
    tags: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('ProjectLists', projectListsSchema)