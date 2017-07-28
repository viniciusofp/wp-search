'use strict';

// Define the `wpReader` module
angular.module('wpReader', ['ngSanitize','ngResource'])

.service('wp', function ($resource, $q) {
	var baseUrl = 'http://vaidape.com.br/wp-json/wp/v2/';


	var sites = [
		{
			name: 'Vaidapé',
			apiUrl: 'http://vaidape.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Ponte Jornalismo',
			apiUrl: 'https://ponte.org/wp-json/wp/v2/'
		},
		{
			name: 'Justificando',
			apiUrl: 'http://justificando.cartacapital.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Geledés',
			apiUrl: 'https://www.geledes.org.br/wp-json/wp/v2/'
		},
		{
			name: 'Jota',
			apiUrl: 'https://www.jota.info/wp-json/wp/v2/'
		},
	]

	var wp = []

	wp.busca = function (termo) {
		var results = []
		for (var i =  sites.length - 1; i >= 0; i--) {
			var posts = $resource( sites[i].apiUrl + "posts?search='" + termo + "&per_page=20").query()
			$q.all([
			    posts.$promise
			]).then( function (data) { 
				var psts = data[0];
				for (var i = psts.length - 1; i >= 0; i--) {
					psts[i].midia = psts[i].link.split('/').slice(2,3).join('/')


					function occurrences(string, subString, allowOverlapping) {

					    string += "";
					    subString += "";
					    if (subString.length <= 0) return (string.length + 1);

					    var n = 0,
					        pos = 0,
					        step = allowOverlapping ? 1 : subString.length;

					    while (true) {
					        pos = string.indexOf(subString, pos);
					        if (pos >= 0) {
					            ++n;
					            pos += step;
					        } else break;
					    }
					    return n;
					}

					psts[i].occ = occurrences(psts[i].content.rendered, ' ' + termo);
					console.log(psts[i].occ)
					if (psts[i].occ > 0) {
					 	results.push(psts[i])

					};
				};
				// Array.prototype.push.apply(wp, psts);
				  results.sort(function(a, b){
				    // var keyA = new Date(a.date),
				    //     keyB = new Date(b.date);
				    var keyA = a.occ;
				    var keyB = b.occ;
				    // Compare the 2 dates
				    if(keyA < keyB) return 1;
				    if(keyA > keyB) return -1;
				    return 0;
				});
			});	 
		};
		return results
	}




	return wp

})

.controller('FirstCtrl', ['$scope', 'wp', function($scope, wp) {
  $scope.posts = wp.busca($scope.buscatermo)
  $scope.buscartermo = function() {
  	$scope.posts = wp.busca($scope.buscatermo)
  	console.log('submit')
  }
$scope.$watch(function() { 
    console.log("digest called"); 
});


  console.log($scope.posts)
}]);
