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
        let data = req.query
        let blog = await blogModel.find(data)
        if (blog) {
            let newBlog = []
            for (let i = 0; i < blog.length; i++) {
                if (blog[i].isDeleted == false && blog[i].isPublished == true) {
                    newBlog.push(blog[i])
                }
            }
            res.status(201).send({ data: newBlog })
        }
        else {
            res.status(404).send({ status: false, msg: "No data found" })
        }
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

// =========================================

//Returns all blogs in the collection that aren't deleted and are published
// let getBlogs = async function (req, res) {
//     try {
//         // let data=req.query
//         // let blog=await blogModel.find(data)
//         // if(blog){
//         //     if(blog.isDeleted==false&&blog.isPublished==true){
//         //         res.send({data:blog})
//         //     }
//         //     else{
//         //         res.send({data:"error"})
//         //     }
//         // }
//         // else {
//         //     res.status(404).send({ status: false, msg: "No data found" })
//         // }
//         // ==========================================================
//         let authorId = req.query.authorId
//         let tags = req.query.tags
//         let category = req.query.category
//         let subcategory = req.query.subcategory
//         let filter = await blogModel.find({ $and: [{ isDeleted: false }, { isPublished: true }] })
//         if (filter) {
//             let newBlog = []
//             for (let i = 0; i < filter.length; i++) {
//                 if ((filter[i].authorId == authorId) && (filter[i].tags == tags) && (filter[i].category == category) && (filter[i].subcategory == subcategory)) {
//                     newBlog.push(filter[i])

//                 }
//                 else if (((filter[i].authorId == authorId) && (filter[i].tags == tags) && (filter[i].category == category)) || ((filter[i].authorId == authorId) && (filter[i].tags == tags) && (filter[i].subcategory == subcategory)) || ((filter[i].authorId == authorId) && (filter[i].category == category) && (filter[i].subcategory == subcategory)) || ((filter[i].tags == tags) && (filter[i].category == category) && (filter[i].subcategory == subcategory))) {
//                     newBlog.push(filter[i])

//                 }
//                 else if (((filter[i].authorId == authorId) && (filter[i].tags == tags)) || ((filter[i].authorId == authorId) && (filter[i].category == category)) || ((filter[i].authorId == authorId) && (filter[i].subcategory == subcategory)) || ((filter[i].tags == tags) && (filter[i].category == category)) || ((filter[i].tags == tags) && (filter[i].subcategory == subcategory)) || ((filter[i].category == category) && (filter[i].subcategory == subcategory))) {
//                     newBlog.push(filter[i])

//                 }
//             }

//             res.status(201).send({ data: newBlog })
//         }
//         else {
//             res.status(404).send({ status: false, msg: "No data found" })
//         }

//     }
//     catch (err) {
//         res.status(500).send({ msg: err.message })
//     }
// }


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
        let data = req.query;
        let getBlog = await blogModel.find({ $or: [{ category: data.category }, { subcategory: data.subcategory }, { tags: data.tags }, { authorId: data.authorid }] })
        if (!getBlog) res.status(404).send({ status: false, msg: "No data" })
        console.log(getBlog);
        let isDeleted = getBlog[0].isDeleted
        let date = moment()

        if (!isDeleted) {
            let delelteBlog = await blogModel.findOneAndUpdate({ $or: [{ category: data.category }, { subcategory: data.subcategory }, { tags: data.tags }, { authorId: data.authorid }] }, { isDeleted: true, deletedAt: date.format() }, { new: true })
            res.send({ status: true, data: delelteBlog })
        } else {
            res.status(404).send({ status: false, msg: "blog is not exist" })
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports.delBlogByQuery = delBlogByQuery
module.exports.updateBlogs = updateBlogs
module.exports.delBlogByParams = delBlogByParams
module.exports.getBlogs = getBlogs
module.exports.createBlog = createBlog