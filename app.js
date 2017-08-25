'use strict';


// Define the `wpReader` module
angular.module('wpReader', ['ngSanitize','ngResource'])
.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}])
.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects or libraries.
  $sceProvider.enabled(false);
})
.service('wp', function ($resource, $q) {
	var wp = []
	wp.sites = [
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
			name: 'Blogueiras Negras',
			apiUrl: 'http://blogueirasnegras.org/wp-json/wp/v2/'
		},
		{
			name: 'AzMina',
			apiUrl: 'http://azmina.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Revista Veja',
			apiUrl: 'http://veja.abril.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Agência Pública',
			apiUrl: 'http://apublica.org/wp-json/wp/v2/'
		},
		{
			name: 'Envolverde',
			apiUrl: 'http://envolverde.cartacapital.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Cidade Para Pessoas',
			apiUrl: 'http://cidadesparapessoas.com/wp-json/wp/v2/'
		},
		{
			name: 'Desacato',
			apiUrl: 'http://desacato.info/wp-json/wp/v2/'
		},
		{
			name: 'Passa Palavra',
			apiUrl: 'http://passapalavra.info/wp-json/wp/v2/'
		},
		{
			name: 'Projeto Colabora',
			apiUrl: 'http://projetocolabora.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Periferia em Movimento',
			apiUrl: 'http://periferiaemmovimento.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Livre Jor',
			apiUrl: 'http://livre.jor.br/wp-json/wp/v2/'
		},
		{
			name: 'Terra Sem Males',
			apiUrl: 'http://www.terrasemmales.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Catraca Livre',
			apiUrl: 'https://catracalivre.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Revista Movimento',
			apiUrl: 'https://movimentorevista.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Revista Serrote',
			apiUrl: 'http://www.revistaserrote.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Catarinas',
			apiUrl: 'http://catarinas.info/wp-json/wp/v2/'
		},
		{
			name: 'Nonada',
			apiUrl: 'http://www.nonada.com.br/wp-json/wp/v2/'
		},
		// {
		// 	name: 'Outra Cidade',
		// 	apiUrl: 'http://outracidade.uol.com.br/wp-json/wp/v2/'
		// },
		// {
		// 	name: 'Move That Jukebox',
		// 	apiUrl: 'http://movethatjukebox.com/wp-json/wp/v2/'
		// },
		{
			name: 'Repórter Brasil',
			apiUrl: 'http://reporterbrasil.org.br/wp-json/wp/v2/'
		},
		{
			name: 'Candeia',
			apiUrl: 'http://www.candeia.jor.br/wp-json/wp/v2/'
		},
		{
			name: 'Amazônia Real',
			apiUrl: 'http://amazoniareal.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Info Amazônia',
			apiUrl: 'https://infoamazonia.org/pt/wp-json/wp/v2/'
		},
		// {
		// 	name: 'Risca Faca',
		// 	apiUrl: 'http://riscafaca.com.br/wp-json/wp/v2/'
		// },
		{
			name: 'Scream and Yell',
			apiUrl: 'http://screamyell.com.br/site/wp-json/wp/v2/'
		},
		{
			name: 'NÓS2',
			apiUrl: 'http://screamyell.com.br/site/wp-json/wp/v2/'
		},
		{
			name: 'Vértices Inconfidentes',
			apiUrl: 'http://verticesinconfidentes.com.br/wp-json/wp/v2/'
		},
		{
			name: 'B9',
			apiUrl: 'http://www.b9.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Fala Roça',
			apiUrl: 'http://www.falaroca.com/wp-json/wp/v2/'
		},
		// {
		// 	name: 'Futebol de Campo',
		// 	apiUrl: 'http://www.futeboldecampo.net/wp-json/wp/v2/'
		// },
		{
			name: 'Apartamento 702',
			apiUrl: 'https://apartamento702.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Megafonia',
			apiUrl: 'http://megafonia.info/wp-json/wp/v2/'
		},
		{
			name: 'Peneira Musical',
			apiUrl: 'http://peneiramusical.com.br/wp-json/wp/v2/'
		},
		{
			name: 'Papo Reto',
			apiUrl: 'https://paporeto.net.br/wp-json/wp/v2/'
		},
		{
			name: 'Jornal Já',
			apiUrl: 'http://www.jornalja.com.br/wp-json/wp/v2/'
		}
	]

	wp.ultimas = function(paginaAtual) {

		function shuffle(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
		}

		var results = [];
		var index = wp.sites.length - 1;
		for (var i = 0 ; i <= wp.sites.length - 1; i++) {

			var posts = $resource( wp.sites[i].apiUrl + "posts?per_page=:perpage", { perpage: 1, page: paginaAtual} ).query();

			$q.all([
			    posts.$promise
			]).then( function (data) { 
				var pst = data[0][0];
				var midia = wp.sites.filter(function( obj ) {
				  return obj.apiUrl == pst._links.self[0].href.split('v2/')[0] + 'v2/';
				});
				var xis = wp.sites.length - index
				pst.midia = midia[0].name;
				index = index - 1;
				pst.apiUrl = pst._links.self[0].href.split('v2/')[0] + 'v2/';

				// Resumo do post
				var html = pst.excerpt.rendered;
				var div = document.createElement("div");
				div.innerHTML = html;
				var resumo = div.innerText.substr(0, 140);
				pst.resumo = resumo.substr(0, Math.min(resumo.length, resumo.lastIndexOf(" "))) + " (...)"


				function countWords(s){
				    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
				    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
				    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
				    return s.split(' ').length; 
				}
				var wpm = 250;
				pst.readtime = countWords(pst.content.rendered) / wpm - (countWords(pst.content.rendered) / wpm) % 1 + 1
				console.log(pst.readtime)

				// Dias atrás
				var today = new Date();
				var date_to_reply = new Date(pst.date);
				var daysFromToday = Math.ceil((today.getTime() - date_to_reply.getTime()) / (1000 * 60 * 60 * 24));
				
				if (daysFromToday < 180) {
					Array.prototype.push.apply(results, data[0]);
				};

				// results.sort(function(a, b){
				//     var keyA = a.readtime,
				//         keyB = b.readtime;
				//     // Compare the 2 dates
				//     if(keyA > keyB) return 1;
				//     if(keyA < keyB) return -1;
				//     return 0;
				// });

				// results.sort(function(a, b) {
				//     var textA = a.title.rendered.toUpperCase().slice(5, -1);
				//     var textB = b.title.rendered.toUpperCase().slice(5, -1);
				//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				// });
			
			});	
		};
		setTimeout(function(){ results = shuffle(results); }, 1000);
		console.log(results)
		return results		
	}


	wp.singleSource = function(url, paginaAtual) {

		var results = [];
		var index = wp.sites.length - 1;
		var posts = $resource( url + "posts?per_page=:perpage", { perpage: 12, page: paginaAtual} ).query();

		$('#loading').fadeIn();
		$q.all([
		    posts.$promise
		]).then( function (data) { 

			var psts = data[0];
			for (var i = psts.length - 1; i >= 0; i--) {
				psts[i]
				var midia = wp.sites.filter(function( obj ) {
				  return obj.apiUrl == psts[i]._links.self[0].href.split('v2/')[0] + 'v2/';
				});
				var xis = wp.sites.length - index
				psts[i].midia = midia[0].name;
				index = index - 1;
				psts[i].apiUrl = psts[i]._links.self[0].href.split('v2/')[0] + 'v2/';

				// Resumo do post
				var html = psts[i].excerpt.rendered;
				var div = document.createElement("div");
				div.innerHTML = html;
				var resumo = div.innerText.substr(0, 300);
				psts[i].resumo = resumo.substr(0, Math.min(resumo.length, resumo.lastIndexOf(" "))) + " (...)"


				function countWords(s){
				    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
				    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
				    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
				    return s.split(' ').length; 
				}
				var wpm = 200;
				psts[i].readtime = countWords(psts[i].content.rendered) / wpm - (countWords(psts[i].content.rendered) / wpm) % 1 + 1
				console.log(psts[i].readtime)

				// Dias atrás
				var today = new Date();
				var date_to_reply = new Date(psts[i].date);
				var daysFromToday = Math.ceil((today.getTime() - date_to_reply.getTime()) / (1000 * 60 * 60 * 24));
				
				
				results.push(psts[i]);
				
			};
			

			results.sort(function(a, b){
			    var keyA = new Date(a.date),
			        keyB = new Date(b.date);
			    // Compare the 2 dates
			    if(keyA < keyB) return 1;
			    if(keyA > keyB) return -1;
			    return 0;
			});

		
		}).finally(function() {
		$('#loading').fadeOut();
	    console.log('ACABEI')
	  });	
		console.log(results)
		return results		
	}

	
	wp.busca = function (termo, paginaAtual) {
		
		var results = []
		for (var i =  wp.sites.length - 1; i >= 0; i--) {
			var posts = $resource( wp.sites[i].apiUrl + "posts?search=:buscatermo&per_page=:perpage&page=:page", { buscatermo: termo.toLowerCase(), perpage: 1, page: paginaAtual} ).query()
			$q.all([
			    posts.$promise
			]).then( function (data) { 
				var psts = data[0];
				var siteResults = [];
				for (var i = psts.length - 1; i >= 0; i--) {
					psts[i].midia = psts[i].link.split('/').slice(2,3).join('/')
					
					var html = psts[i].content.rendered;
					var div = document.createElement("div");
					div.innerHTML = html;
					var resumo = div.innerText.substr(0, 140);
					psts[i].resumo = resumo.substr(0, Math.min(resumo.length, resumo.lastIndexOf(" "))) + " (...)"

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

					// Ocorrências do termo
					var occContent = occurrences(psts[i].content.rendered.toLowerCase(), termo.toLowerCase(), true);
					var occExcerpt = occurrences(psts[i].resumo.toLowerCase(), termo.toLowerCase(), true);
					var occTitle = occurrences(psts[i].title.rendered.toLowerCase(), termo.toLowerCase(), true);
					psts[i].occ = occTitle + occContent;
					// Dias atrás
					var today = new Date();
					var date_to_reply = new Date(psts[i].date);
					var daysFromToday = Math.ceil((today.getTime() - date_to_reply.getTime()) / (1000 * 60 * 60 * 24));
					
					var ranking = 0;

					if (daysFromToday <= 1) {
						ranking = ranking + 7000
					} else if (daysFromToday <=7 ) {
						ranking = ranking + 3000
					} else if (daysFromToday <= 31) {
						ranking = ranking + 1000
					};

					if (occTitle > 0) {
						ranking = ranking + 5000
					};
					if (occExcerpt > 0) {
						ranking = ranking + 2000
					};
					if (occContent > 10) {
						ranking = ranking + 5000
					} else if (occContent > 4) {
						ranking = ranking + 3000
					} else if (occContent >= 1) {
						ranking = ranking + 1000
					};

					ranking = ranking - daysFromToday * 0.01
					psts[i].ranking = ranking
					siteResults.push(psts[i])

				};
				// results.push(siteResults)
				Array.prototype.push.apply(results, siteResults);
				results.sort(function(a, b){
				    // var keyA = new Date(a.date),
				    //     keyB = new Date(b.date);
				    var keyA = a.ranking;
				    var keyB = b.ranking;
				    // Compare the 2 dates
				    if(keyA < keyB) return 1;
				    if(keyA > keyB) return -1;
				    return 0;
				});
			}).finally(function() {
		  });

		  	 
		};
		return results
	}
	return wp

})

.controller('FirstCtrl', ['$scope', '$q', 'wp', function($scope, $q, wp) {
  $scope.buscatermo = ''

  $scope.paginaAtual = 1
  $scope.sites = wp.sites
  $scope.buscaPosts = []
  $scope.ultimosPosts = wp.ultimas($scope.paginaAtual);

  $scope.ultimosPostsProx = wp.ultimas($scope.paginaAtual + 1)


  
  $scope.buscartermo = function() {
  	$scope.termobuscado = $scope.buscatermo;
  	$scope.paginaAtual = 1
  	$scope.buscaPosts = wp.busca($scope.buscatermo, $scope.paginaAtual)
  	$('#searchResults').css('left', '0');
  }
  $scope.closeBuscaResults = function() {
  	$('#searchResults').css('left', '100%');
  }

  $scope.proxPag = function() {
  	$scope.ultimosPosts = $scope.ultimosPostsProx;
  	$scope.paginaAtual++
  	$scope.ultimosPostsProx = wp.ultimas($scope.paginaAtual + 1)
  	$scope.ultimosPostsPrev = wp.ultimas($scope.paginaAtual -1);
  }
  $scope.prevPag = function() {
  	$scope.ultimosPosts = $scope.ultimosPostsPrev;
  	if ($scope.paginaAtual > 0) {$scope.paginaAtual--};
  	$scope.ultimosPostsProx = wp.ultimas($scope.paginaAtual + 1)
  	$scope.ultimosPostsPrev = wp.ultimas($scope.paginaAtual -1);
  }

  $scope.singleSource = function(url, sourceName) {
  	$scope.singleSourcePosts = wp.singleSource(url, $scope.paginaAtual);
  	$scope.sourceName = sourceName;
  	$('#singleSource').css('left', '0');
  	
  }
  $scope.closeSingleSource = function() {
  	$('#singleSource').css('left', '100%');
  }



}]);
