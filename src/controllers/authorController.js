const authorModel=require("../models/authorModel")
const jwt = require("jsonwebtoken");

const createAuthor=async function(req,res){
    try{
    let author=req.body
    let data=await authorModel.create(author)
    res.status(201).send({data:data})
   
    }
    catch(error){
        res.status(500).send({msg:error.message})
    }
}

// ==================================================================

//Login User Create Jwt
//Download npm i jsonwebtoken
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpZCI6IjYzMTVlZmVkMTFkMzVjYjJiODZjMzg4MyIsImJhdGNoIjoiUGx1dG9uaXVtIiwib3JnYW5pc2F0aW9uIjoiRlVuY3Rpb25VcCIsIlByb2plY3QiOiJNaW5pX0Jsb2ciLCJpYXQiOjE2NjI1NDkxMjd9.eb9ULFTvuATCnM5SbOc81QzGjg-WNredbMSrNok8DR4
//{
//     "emailId" : "chetan@gmail.com",
//     "password" : "chetam@123"
// }

const loginUser = async function (req, res) {
    try {
      let emailId = req.body.emailId;
      let password = req.body.password;
      let author = await authorModel.findOne({ emailId: emailId, password: password });
      if (!author)
        return res.status(404).send({
          status: false,
          msg: "username or the password is not corerct",
        });
  
      let token = jwt.sign(
        {
          authorid: author._id.toString(),
          batch: "Plutonium",
          organisation: "FUnctionUp",
          Project:"Mini_Blog"
        },
        "functionup-Plutonium_Mini_Blog"
      );
      res.setHeader("x-api-key", token);
      res.status(201).send({ status: true, data: token });
    }
    catch (error) {
  
      res.status(500).send("SERVER ERROR", error.message)
    }
  };

module.exports.loginUser=loginUser
module.exports.createAuthor=createAuthor