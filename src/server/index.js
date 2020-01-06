const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const PORT = 3020
const filesystemRoutes = require("./routes/filesystem")

app.use(cors())
app.use(bodyParser.json())

app.use("/fs/",filesystemRoutes)

app.use(function(req,res,next){
	let err = new Error("not found")
	err.status = 404
	next(err)
})

app.listen(PORT, function(){
	console.log(`server started at port ${PORT}`)
})
