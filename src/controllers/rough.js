
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


// let getBlogs = async function (req, res) {
//     try {
//         let data = req.query
//         let blog = await blogModel.find({data)
//         if (blog) {
//             let newBlog = []
//             for (let i = 0; i < blog.length; i++) {
//                 if (blog[i].isDeleted == false && blog[i].isPublished == true) {
//                     newBlog.push(blog[i])
//                 }
//             }
//             res.status(200).send({ status: true,data: newBlog })
//         }
//         else {
//             res.status(404).send({ status: false, msg: "No data found" })
//         }
//     }
//     catch (error) {
//         res.status(500).send({ msg: error.message })
//     }
// }


// const authorise2 = async function (req, res, next) {
//     try {
       
//         let userToLoggedIn = req.decodedToken.authorid
//         let { tags, authorId, category, subcategory } = req.query
//         const filter={}
//         if (authorId) filter.authorId = authorId
//         if (category) filter.category = category
//         if (authorId) filter.authorId = authorId
//         if (subcategory) filter.subcategory = subcategory.split(",");
//         if (tags) filter.tags = tags.split(",");
//         let matchedData = await blogModel.find(filter)
//         let filterauthorid = matchedData[0].authorId.toString()
//         if ((filterauthorid != userToLoggedIn)) {
//             return res.status(403).send({ msg: "User Has No Access to the Collection due to tags" })
//         }
//         next() 
//     }
//     catch (error) {
//         res.status(500).send("SERVER ERROR", error.message)
//     }
// }

// const delBlogByQuery = async function (req, res) {
//     try {
//         let { category, authorId, tags, subcategory, isPublished } = req.query;
//         const filter = { isDeleted: false };
//         if (category) filter.category = category;
//         if (authorId) filter.authorId = authorId;
//         if (tags) filter.tags = tags.split(",");
//         if (subcategory) filter.subcategory = subcategory.split(",");
//         // if isPublished true then we dont needto add this filter because we nned to delete only if blog is unpublished
//         if (isPublished == false) filter.isPublished = isPublished;

//         let matchedData = await blogModel.find(filter);
//         if (matchedData.length === 0) return res.status(404).send({ status: false, message: "no such data with provided filter conditions" });
//         let updateDelete = await blogModel.updateMany(filter, { $set: { isDeleted: true, deletedAt: date.format() } }, { new: true })
//         return res.status(200).send({ status: true, data: updateDelete })
//     }
//     catch (err) {
//         return res.status(500).send({ data: err.mrssage })
//     }
// }
