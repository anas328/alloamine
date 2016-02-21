// API IMPORTS //
var express = require("express");
var bodyParser = require("body-parser");

// API INSTANTIATIONS //
var express_app		= express();

// PATH PROVIDES SERVER //
express_app.use('/public', express.static(__dirname + "/public"));
express_app.use('/node_modules',  express.static(__dirname + '/node_modules'));
express_app.use(bodyParser.json());


// VARIABLES - TMP //
var districts = [
	{ name:"Creteil-Université" },
	{ name:"Boulogne" },
	{ name:"République" }
];

// ROOT DEFINITIONS //

//get quartier function
express_app.get('/', function(req,res){
	console.log("Page d'accueil");
	res.sendFile(__dirname + "/public/index.html");
});

//get quartier function
express_app.get('/districts', function(req,res){
	console.log("Recuperation des quartiers");
	console.log(districts);
	res.json(districts);
});


// SERVER RUNNING //
var server = express_app.listen(7000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Express server listening to http://%s:%s", host, port);
});