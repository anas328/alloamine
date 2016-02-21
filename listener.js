// API IMPORTS //
var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");

// API INSTANTIATIONS //
var express_app		= express();
var db = mongojs('ALLO_AMINE', ['district','category','product']);

// PATH PROVIDES SERVER //
express_app.use('/public', express.static(__dirname + "/public"));
express_app.use('/node_modules',  express.static(__dirname + '/node_modules'));
express_app.use(bodyParser.json());

// var categories = [
// 	{ _id:"1", name:"PIZZAS", image : "photo.jpg" },
// 	{ _id:"2", name:"PATES", image : "photo.jpg"  },
// 	{ _id:"3", name:"DESSERTS", image : "photo.jpg"  }
// ];

// var products = [
// 	{ _id:"10", name:"pizza_marguarita", id_cat:"1", image:"photo.jpg",prix:"100"},
// 	{ _id:"11", name:"spaghetti_bolonaise",id_cat:"2", image:"photo.jpg",prix:"100"},
// 	{ _id:"12", name:"glace",id_cat:"3", image:"photo.jpg",prix:"100"}
// ];

// ROOT DEFINITIONS //

//get quartier function
express_app.get('/', function(req,res){
	console.log("Page d'accueil");
	res.sendFile(__dirname + "/public/index.html");
});

//get quartier function
express_app.get('/districts', function(req,res){
	db.district.find(function(err, docs) {
		console.log("Recuperation des quartiers");
		console.log(docs);
		res.json(docs);
	});
});

//get produits function
express_app.get('/categories', function(req,res){
	db.category.find(function(err, docs) {
		console.log("Recuperation des categories");
		console.log(docs);
		res.json(docs);
	});
});


//get produits function
express_app.post('/products', function(req,res){
	// category = req.body.category;
	
	category = { _id:mongojs.ObjectId("56c9ec79d8dc9751d945611b"), name:"PIZZAS", image : "photo.jpg" };
	db.product.find({"id_cat":category._id}, function(err, docs) {
		// console.log("Recuperation des produits de la categorie %s", category._id);
		console.log(docs);
		res.json(docs);
	});
});

// SERVER RUNNING //
var server = express_app.listen(7000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Express server listening to http://%s:%s", host, port);
});