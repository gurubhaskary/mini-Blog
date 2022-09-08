const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel")

const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "functionup-Plutonium_Mini_Blog");
        if (!decodedToken) {
            return res.status(403)({ status: false, msg: "token is invalid or NOT AUTHENTICATED" });
        }
        req.decodedToken = decodedToken
        next()
    }
    catch (error) {
        res.status(500).send("SERVER ERROR", error.message)
    }
}


const authorise = async function (req, res, next) {
    try {
        //If user Gives blogid
        let userToModify = req.params.blogId
        let userToLoggedIn = req.decodedToken.authorid
        let blog = await blogModel.find({ _id: userToModify })
        let authorid = blog[0].authorId.toString()
        if ((authorid != userToLoggedIn)) {
            return res.status(403).send({ msg: "User Has No Access to the Collection due to blogID" })
        }
        next()
    }
    catch (error) {
        res.status(500).send("SERVER ERROR", error.message)
    }
}

const authorise2 = async function (req, res, next) {
    try {
       
        let userToLoggedIn = req.decodedToken.authorid
        let { tags, authorId, category, subcategory } = req.query
        const filter={}
        if (authorId) filter.authorId = authorId
        if (category) filter.category = category
        if (authorId) filter.authorId = authorId
        if (subcategory) filter.subcategory = subcategory.split(",");
        if (tags) filter.tags = tags.split(",");
        let matchedData = await blogModel.find(filter)
        let filterauthorid = matchedData[0].authorId.toString()
        if ((filterauthorid != userToLoggedIn)) {
            return res.status(403).send({ msg: "User Has No Access to the Collection due to tags" })
        }
        next() 
    }
    catch (error) {
        res.status(500).send("SERVER ERROR", error.message)
    }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
module.exports.authorise2 = authorise2