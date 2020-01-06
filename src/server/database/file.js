const mongoose = require("mongoose")
const Directory = require("./directory")

const fileSchema = new mongoose.Schema({
	Name : {
		type : String,
		required : true,
		unique : true
	},
	Type : {
		type : String
	},
	Content : {
		type : String
	},
	directory : {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Directory"
	}
})

const File = mongoose.model("File", fileSchema)
module.exports = File
