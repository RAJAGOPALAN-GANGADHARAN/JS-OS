var express = require('express')
var router = express.Router();
var db = require('../database')

//display all files
router.get('/showfile', function(req,res){
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

//deleting a file 
router.delete('/deleteFile', function(req,res){
    console.log(req.body)
    db.File.findOneAndDelete(req.body)
    .then(function(f){
        res.json(f)
    })
})
//deleting a directory




//updating a file
router.put('/updateFile', function(req,res){
    console.log(req.body)
    db.File.findOneAndUpdate(req.body)
    .then(function(f){
        res.json(f)
    })
})
module.exports = router





