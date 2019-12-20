const mongoose = require("mongoose")
const File = require("./file")

const directorySchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true,
        unique : true
    },
    file : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "File"
    }],
    directory : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Directory"
    }]    
})

const Directory = mongoose.model("Directory", directorySchema)
module.exports = Directory