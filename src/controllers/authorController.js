const { Router } = require("express")
const authorModel=require("../models/authorModel")


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

module.exports.createAuthor=createAuthor