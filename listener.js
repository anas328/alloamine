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
	{ _id:"1", name:"Creteil-Université" },
	{ _id:"2", name:"Boulogne" },
	{ _id:"3", name:"République" }
];

var categories = [
	{ _id:"1", name:"PIZZAS", image : "photo.jpg" },
	{ _id:"2", name:"PATES", image : "photo.jpg"  },
	{ _id:"3", name:"DESSERTS", image : "photo.jpg"  }
];

var products = [
	{ _id:"10", name:"pizza_marguarita", id_cat:"1", image:"photo.jpg",prix:"100"},
	{ _id:"11", name:"spaghetti_bolonaise",id_cat:"2", image:"photo.jpg",prix:"100"},
	{ _id:"12", name:"glace",id_cat:"3", image:"photo.jpg",prix:"100"}
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

//get produits function
express_app.get('/categories', function(req,res){
	console.log("Recuperation des categories");
	console.log(categories);
	res.json(categories);
});


//get produits function
express_app.get('/products', function(req,res){
	console.log("Recuperation des produits");
	console.log(products);
	res.json(products);
});


// SERVER RUNNING //
var server = express_app.listen(7000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Express server listening to http://%s:%s", host, port);
});