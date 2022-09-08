
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
