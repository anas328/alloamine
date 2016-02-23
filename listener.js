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

// ROOT DEFINITIONS //

// HOME PAGE
express_app.get('/', function(req,res){
	console.log("Page d'accueil");
	res.sendFile(__dirname + "/public/index.html");
});

// RETRIEVES ALL THE DISTRICTS
express_app.post('/districts', function(req,res){
	db.district.find(function(err, docs) {
		console.log("Recuperation des quartiers");
		console.log(docs);
		res.json(docs);
	});
});

// RETRIEVES A DISTRICT BY ITS ID
express_app.post('/district', function(req,res){
	districtId = mongojs.ObjectId(req.body.districtId);
	db.district.find({_id:districtId}, function(err, doc) {
		console.log(("Recuperation le quartier [ " + req.body.districtId +" ]"));
		console.log(doc);
		res.json(doc);
	});
});

// SAVES A DISTRICT BY ITS ID
express_app.post('/savedistrict', function(req,res){
	id = mongojs.ObjectId(req.body.newdistrict._id);
	db.district.save({
		_id:id,
		name:req.body.newdistrict.name
	},
	function(err, docs) {
		console.log(("Enregistre le quartier [ " + req.body.newdistrict.name + " ]"));
		console.log(docs);
		res.json(docs);
	});
});

// REMOVE A DISTRICT BY ITS ID
express_app.post('/removedistrict', function(req,res){
	districtId = mongojs.ObjectId(req.body.districtId);
	db.district.remove({_id:districtId}, function(err, docs) {
		console.log("Supprime un quartier [ " + req.body.districtId + " ]");
		console.log(docs);
		res.json(docs);
	});
});

// RETRIEVES ALL THE CATEGORIES
express_app.post('/categories', function(req,res){
	db.category.find(function(err, docs) {
		console.log("Recuperation des categories");
		console.log(docs);
		res.json(docs);
	});
});

// RETRIEVES A CATEGORY BY ITS ID
express_app.post('/category', function(req,res){
	categoryId = mongojs.ObjectId(req.body.categoryId);
	db.category.findOne({_id:categoryId}, function(err, doc) {
		console.log(("Recuperation le categorie [ " + req.body.categoryId +" ]"));
		console.log(doc);
		res.json(doc);
	});
});

// SAVES A CATEGORY BY ITS ID
express_app.post('/savecategory', function(req,res){
	id = mongojs.ObjectId(req.body.newcategory._id);
	db.category.save({
		_id:id,
		name:req.body.newcategory.name,
		image:req.body.newcategory.image
	},
	function(err, docs) {
		console.log(("Enregistre le catégorie [ " + req.body.newcategory.name + " ]"));
		console.log(docs);
		res.json(docs);
	});
});

// REMOVE A CATEGORY BY ITS ID
express_app.post('/removecategory', function(req,res){
	categoryId = mongojs.ObjectId(req.body.categoryId);
	db.category.remove({_id:categoryId}, function(err, docs) {
		console.log("Supprime un catégorie [ " + req.body.categoryId + " ]");
		console.log(docs);
		res.json(docs);
	});
});


// RETRIEVES ALL THE PRODUCTS BY CATEGORY ID
express_app.post('/products', function(req,res){

	category = req.body.category;
	cat_id = mongojs.ObjectId(category._id)
	console.log(category);
	db.product.find({"id_cat":cat_id}, function(err, docs) {
		console.log(("Recuperation des produits de la categorie [ " + category.name + " ]"));
		console.log(docs);
		res.json(docs);
	});
});

// RETRIEVES A PRODUCT BY ITS ID
express_app.post('/product', function(req,res){
	productId = mongojs.ObjectId(req.body.productId);
	db.product.findOne({_id:productId}, function(err, doc) {
		console.log(("Recuperation du produit [ " + req.body.productId +" ]"));
		console.log(doc);
		res.json(doc);
	});
});

// SAVES A PRDUCT BY ITS ID
express_app.post('/saveproduct', function(req,res){

	id = mongojs.ObjectId(req.body.newproduct._id);
	db.product.save({
		_id:id,
		name:req.body.newproduct.name,
		id_cat:mongojs.ObjectId(req.body.newproduct.cat_id),
		image:req.body.newproduct.image,
		prix:req.body.newproduct.prix
	},
	function(err, docs) {
		console.log(("Enregistre le produit [ " + req.body.newproduct.name + " ]"));
		console.log(docs);
		res.json(docs);
	});
});

// REMOVE A PRODUCT BY ITS ID
express_app.post('/removeproduct', function(req,res){
	productId = mongojs.ObjectId(req.body.productId);
	db.product.remove({_id:productId}, function(err, docs) {
		console.log("Supprime un produit [ " + req.body.productId + " ]");
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