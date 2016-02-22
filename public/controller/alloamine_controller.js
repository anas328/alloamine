angular.module('alloamine_module')
	.controller('alloamine_controller', ['$scope', '$http', function($scope,$http) {

	console.log("Controller is fine !");

	// --------- //
	// VARIABLES //
	// --------- //

	$scope.categories = [];
	$scope.newcategory = {
		_id:null,
		name:null
	};
	$scope.selectedcategory = {};

	// ------- //
	// METHODS //
	// ------- //

	// RETRIEVES ALL CATEGORIES
	var refresh = function() {
		$http.post('/categories').success(function(response) {
			console.log("I retrieve all categories !");
			$scope.categories = response;
			$scope.clear();
		});
	}
	refresh();

	// GET STARTED UPDATE PROCESS
	$scope.updateCategory = function(category) {
		console.log("updateCategory");
		console.log(category);
		$scope.newcategory._id = category._id;
		$scope.newcategory.name = category.name;
	}

	// GET STARTED UPDATE SELECTED CATEGORY
	$scope.updateSelectedCategory = function(categoryId) {

		var thereIsId = categoryId != null && categoryId != "";
		if(thereIsId) {
			$http.post('/category', {'categoryId':categoryId}).success(function(response){
				console.log("Category [ " + categoryId + " ]");
				$scope.selectedcategory = response;
				// refresh();
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

	// GET STARTED UPDATE PROCESS
	$scope.clear = function() {
		console.log("clear");
		$scope.newcategory._id = null;
		$scope.newcategory.name = null;

		$scope.selectedcategory = {};
	}
}]);