angular.module('alloamine_module')
	.controller('alloamine_controller', ['$scope', '$http', function($scope,$http) {

	console.log("Controller is fine !");

	// --------- //
	// VARIABLES //
	// --------- //

	$scope.categories = [];
	$scope.products = [];
	$scope.districts = [];
	$scope.newcategory = {
		_id:null,
		name:null,
		image:null
	};
	$scope.newproduct = {
		_id:null,
		cat_id:null,
		name:null,
		image:null,
		prix:null
	};
	$scope.newdistrict = {
		_id:null,
		name:null
	};
	$scope.selectedcategory = {};
	$scope.selectedproduct = {};

	// ------- //
	// METHODS //
	// ------- //

	// RETRIEVES ALL CATEGORIES
	var refresh = function() {
		$http.post('/categories').success(function(response) {
			console.log("I retrieve all categories !");
			$scope.categories = response;
			$scope.clearCategory();
		});
	}

	// RETRIEVES ALL CATEGORIES
	var refreshDistricts = function() {
		$http.post('/districts').success(function(response) {
			console.log("I retrieve all districts !");
			$scope.districts = response;
			$scope.clearDistrict();
		});
	}
	refresh();
	refreshDistricts();

	// GET STARTED UPDATE PROCESS
	$scope.updateCategory = function(category) {
		console.log("updateCategory");
		console.log(category);
		$scope.newcategory._id = category._id;
		$scope.newcategory.name = category.name;
		$scope.newcategory.image = category.image;
	}

	// GET STARTED UPDATE PROCESS
	$scope.updateProduct = function(product) {
		console.log("updateProduct");
		console.log(product);
		$scope.newproduct._id = product._id;
		$scope.newproduct.cat_id = product.cat_id;
		$scope.newproduct.name = product.name;
		$scope.newproduct.image = product.image;
		$scope.newproduct.prix = product.prix;
	}

	// GET STARTED UPDATE PROCESS
	$scope.updateDistrict = function(district) {
		console.log("updateDistrict");
		console.log(district);
		$scope.newdistrict._id = district._id;
		$scope.newdistrict.name = district.name;
	}

	// GET STARTED UPDATE SELECTED CATEGORY
	$scope.updateSelectedCategory = function(categoryId) {

		var thereIsId = categoryId != null && categoryId != "";
		if(thereIsId) {
			$http.post('/category', {'categoryId':categoryId}).success(function(response){
				console.log("Category [ " + categoryId + " ]");
				$scope.selectedcategory = response;
				$scope.refreshProducts();
			});
		}
	}

	// GET STARTED UPDATE SELECTED DISTRICT
	$scope.updateSelectedDistrict = function(districtId) {

		var thereIsId = districtId != null && districtId != "";
		if(thereIsId) {
			$http.post('/district', {'districtId':districtId}).success(function(response){
				console.log("District [ " + districtId + " ]");
				$scope.newdistrict = response;
				refreshDistricts();
				// refresh();
			});
		}
	}

	// GET STARTED UPDATE SELECTED PRODUCT
	$scope.updateSelectedProduct = function(productId) {

		var thereIsId = productId != null && productId != "";
		if(thereIsId) {
			$http.post('/product', {'productId':productId}).success(function(response){
				console.log("Product [ " + productId + " ]");
				$scope.selectedproduct = response;
				// $scope.refreshProducts();
				// refresh();
			});
		}
	}

	// GET ALL PRODUCTS OF SELECTED CATEGORIES
	$scope.refreshProducts = function() {

		var thereIsSelectedCategory = $scope.selectedcategory != null;
		if(thereIsSelectedCategory) {
			$http.post('/products', {'category':$scope.selectedcategory}).success(function(response){
				console.log("Produits de la category [ " + $scope.selectedcategory.name + " ]");
				console.log(response);
				$scope.products = response;
				// CLEAR_PRODUCT
				$scope.selectedproduct = {};
				$scope.newproduct = {};
			});
		}
	}

	// ADDS A CATEGORY
	$scope.saveCategory = function() {
		console.log("I add a category - %s - %s !", $scope.newcategory.id, $scope.newcategory.name);
		// CHECKED THAT ALL DATA TO THE THING IS THERE
		var thereisName = $scope.newcategory.name != null;
		var isGood = thereisName;
		if(isGood) {
			var thereIsId = $scope.newcategory._id != null;
			$http.post('/savecategory', {'newcategory':$scope.newcategory}).success(function(response){
				console.log(thereIsId ? "UPDATE" : "ADD");
				console.log($scope.newcategory);
				refresh();
			});
		}
	}

	// ADDS A PRODUCT
	$scope.saveProduct = function() {
		console.log("I add a product - %s - %s !", $scope.newproduct.id, $scope.newproduct.name);
		// CHECKED THAT ALL DATA TO THE THING IS THERE
		var thereisName = $scope.newproduct.name != null;
		var thereisPrix = $scope.newproduct.prix != null;
		var isGood = thereisName && thereisPrix;
		if(isGood) {
			var thereIsId = $scope.newproduct._id != null;
			$scope.newproduct.cat_id = $scope.selectedcategory._id;
			$http.post('/saveproduct', {'newproduct':$scope.newproduct}).success(function(response){
				console.log(thereIsId ? "UPDATE" : "ADD");
				console.log($scope.newproduct);
				$scope.refreshProducts();
				$scope.clearProduct();
			});
		}
	}

	// ADDS A PRODUCT
	$scope.saveDistrict = function() {
		console.log("I add a districts - %s - %s !", $scope.newdistrict.id, $scope.newdistrict.name);
		// CHECKED THAT ALL DATA TO THE THING IS THERE
		var thereisName = $scope.newdistrict.name != null;
		var isGood = thereisName;
		if(isGood) {
			var thereIsId = $scope.newdistrict._id != null;
			$http.post('/savedistrict', {'newdistrict':$scope.newdistrict}).success(function(response){
				console.log(thereIsId ? "UPDATE" : "ADD");
				console.log($scope.newdistrict);
				refreshDistricts();
			});
		}
	}

	// REMOVES A CATEGORIE
	$scope.removeCategory = function(categoryId) {
		var thereIsId = categoryId != null && categoryId != "";
		if(thereIsId) {
			$http.post('/removecategory', {'categoryId':categoryId}).success(function(response){
				console.log("Category [ " + categoryId + " ] has been removed");
				refresh();
			});
		}
	}

	// REMOVES A DISTRICT
	$scope.removeDistrict = function(districtId) {
		var thereIsId = districtId != null && districtId != "";
		if(thereIsId) {
			$http.post('/removedistrict', {'districtId':districtId}).success(function(response){
				console.log("District [ " + districtId + " ] has been removed");
				refreshDistricts();
			});
		}
	}

	// REMOVES A PRODUCT
	$scope.removeProduct = function(productId) {
		var thereIsId = productId != null && productId != "";
		if(thereIsId) {
			$http.post('/removeProduct', {'productId':productId}).success(function(response){
				console.log("Product [ " + productId + " ] has been removed");
				refresh();
			});
		}
	}

	// GET STARTED UPDATE PROCESS
	$scope.clearCategory = function() {
		console.log("clear product");
		$scope.newcategory._id = null;
		$scope.newcategory.name = null;
		$scope.selectedcategory = {};
		$scope.products = [];
		$scope.clearProduct();
	}

	// GET STARTED UPDATE PROCESS
	$scope.clearProduct = function() {
		console.log("clear product");
		$scope.newproduct._id = null;
		$scope.newproduct.cat_id = null;
		$scope.newproduct.name = null;
		$scope.newproduct.image = null;
		$scope.newproduct.prix = null;
		$scope.selectedproduct = {};
	}

	// GET STARTED UPDATE PROCESS
	$scope.clearDistrict = function() {
		console.log("clear district");
		$scope.newdistrict._id = null;
		$scope.newdistrict.name = null;
	}
}]);