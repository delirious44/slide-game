var express = require("express");
var path = require("path");

var slideModel = require("./myModules/slide-model");

var app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
});

app.get("/gameModel", function(req, res){
	res.json(slideModel);
});

app.listen(3000, function(){
	console.log("Application listening at port 3000");
});