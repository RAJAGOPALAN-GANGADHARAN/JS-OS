var express = require('express')
var router = express.Router();
var db = require('../database')

//display all files
router.get('/show', function(req,res){
    let file = db.File.find()
    file.then(function(f){
        res.json(f)
    })
    
})
//display all directory
router.get('/showdir',function(req,res){
    let dir = db.Directory.find()
    dir.then(function(f){
        res.json(f)
    })
})

//creating a file 
router.post('/createFile', function(req,res){
    db.File.create(req.body)
    .then(function(newFile){
        res.json(newFile)
    })
})

//creating a directory
router.post('/createDir',function(req,res){
    db.Directory.create(req.body)
    .then(function(newDir){
        res.json(newDir)
    })
})
module.exports = router