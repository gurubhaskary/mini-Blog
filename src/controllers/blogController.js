const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
var moment = require('moment'); // require moment().format();

//Create a blog document from request body. Get authorId in request body only
const createBlog = async function (req, res) {
    try {
        let blog = req.body
        let authorId = blog.authorId
        const authorArr = await authorModel.find().select({ _id: 1 })
        let checkAuthorID = false
        authorArr.forEach(element => {
            let authorID2 = element._id
            if (authorID2 == authorId) {
                checkAuthorID = true
            }
        });
        if (checkAuthorID) {
            let data = await blogModel.create(blog)
            res.status(201).send({ data: data })

        }
        else res.status(400).send({ msg: "author id is not valid" })

    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

// =========================================
let getBlogs = async function (req, res) {
    try {
        let { tags, authorId, category, subcategory } = req.query
        const filter = { isDeleted: false, isPublished: true }
        if (category) filter.category = category
        if (authorId) filter.authorId = authorId
        if (subcategory) filter.subcategory = subcategory.split(",");
        if (tags) filter.tags = tags.split(",");
        const matchedData = await blogModel.find(filter)
        if (matchedData.length == 0) res.status(404).send({ status: false, msg: "No data found" })
        return res.status(200).send({ status: true, data: matchedData })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}



// ===================================updateBlogs======================
const updateBlogs = async function (req, res) {
    try {
        let Id = req.params.blogId
        let validBlogId = await blogModel.findById(Id).select({ _id: 1 })
        if (!validBlogId) {
            let msgUser = "please enter a valid blogId"
            return res.send(msgUser)
        }
        let t = moment().format('MMMM Do YYYY, h:mm:ss a')
        let data = await blogModel.findOneAndUpdate({ _id: Id }, { $set: { "title": req.body.title, "body": req.body.body, "category": req.body.category, publishedAt: t }, $push: { "tags": req.body.tags, "subcategory": req.body.subcategory } }, { new: true })
        return res.status(200).send({ status: true, msg: data })
    }
    catch (error) {
        return res.status(400).send({ status: false, msg: error.message })
    }
}

// ======================delBlogByParams=============================
const delBlogByParams = async function (req, res) {
    try {
        let blogToBeDeleted = req.params.blogId;
        let getBlog = await blogModel.findOne({ _id: blogToBeDeleted });
        if (!getBlog) res.status(404).send({ status: false, msg: "No Blog" })
        let check = getBlog.isDeleted;
        let now = moment();
        if (!check) {
            let deleteBlog = await blogModel.findByIdAndUpdate({ _id: blogToBeDeleted }, { isDeleted: true, deletedAt: now.format() }, { new: true })
            res.status(200).send({ status: true, data: deleteBlog })
        } else {
            res.status(404).send("blog is not exist")
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

// ========================DeleteBlog By Query Param===========================
const delBlogByQuery = async function (req, res) {
    try {
        let { category, authorId, tags, subcategory, isPublished } = req.query;
        const filter = { isDeleted: false };
        if (category) filter.category = category;
        if (authorId) filter.authorId = authorId;
        if (tags) filter.tags = tags.split(",");
        if (subcategory) filter.subcategory = subcategory.split(",");
        // if isPublished true then we dont needto add this filter because we nned to delete only if blog is unpublished
        if (isPublished == false) filter.isPublished = isPublished;

        let matchedData = await blogModel.find(filter);
        if (matchedData.length === 0) return res.status(404).send({ status: false, message: "no such data with provided filter conditions" });
        let updateDelete = await blogModel.updateMany(filter, { $set: { isDeleted: true, deletedAt: date.format() } }, { new: true })
        return res.status(200).send({ status: true, data: updateDelete })
    }
    catch (err) {
        return res.status(500).send({ data: err.mrssage })
    }
}

module.exports.delBlogByQuery = delBlogByQuery
module.exports.updateBlogs = updateBlogs
module.exports.delBlogByParams = delBlogByParams
module.exports.getBlogs = getBlogs
module.exports.createBlog = createBlog