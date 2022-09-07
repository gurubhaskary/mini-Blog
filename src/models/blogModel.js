const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: "authorDataBase"
    },
    tags: [{
        type: String
    }],
    category: {
        type: String,
        required: true,

    },
    subcategory: [{
        type: String
    }],
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt:  {
        type: Date, 
        default: Date.now
    },
    deletedAt:String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: String,
    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('blogProject_1', blogSchema)