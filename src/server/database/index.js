const mongoose = require("mongoose")
mongoose.set("debug",true)
mongoose.Promise = Promise

mongoose.connect("mongodb://localhost/JS-OS",{
	keepAlive:true
})

module.exports.File = require("./file")
module.exports.Directory = require("./directory")
