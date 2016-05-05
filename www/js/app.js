var urlServer = 'https://ulpgc-tasi-2016.herokuapp.com';
var app = angular.module('app', ['ionic', 'ionic.service','ngSanitize', 'ngTouch'])
	.controller('HomeController', function ($scope, $sce, $swipe, $http) {
		$scope.splash = true;
		$scope.noticias = null;
		$scope.leftButtonShow = function () {
			if ($scope.noticias) return $scope.actual < $scope.noticias.length - 1;
			return false;
		};

		setTimeout(function () {
			$scope.splash = false;
			$scope.$apply();
		}, 3500); // ESTO ES PARA QUITAR EL SPLASH

		$http.get(urlServer + '/notices').then(function (data) {
			$scope.noticias = data.data;
			$scope.actual = $scope.noticias.length - 1;
			for (var i = 0; i < $scope.noticias.length; i++) {
				$scope.noticias[i].cuerpo = $sce.trustAsHtml($scope.noticias[i].cuerpo);
			}
			$scope.noticias[$scope.actual].clase = 'actual ';

		}, function (err) {
			if (err) console.log((err));
		});
		var irseI = ' zoomOutLeft';
		var irseD = ' zoomOutRight';
		var entraD = ' zoomInRight';
		var entraI = ' zoomInLeft';

		$scope.left = function () {
			$scope.noticias[$scope.actual].clase = irseD;
			$scope.actual++;
			$scope.noticias[$scope.actual].clase = entraI;
		}
		$scope.right = function () {
			$scope.noticias[$scope.actual].clase = irseI;
			$scope.actual--;
			$scope.noticias[$scope.actual].clase = entraD;
		}

	})
	.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
		var push = new Ionic.Push({
		  "debug": true
		});

		push.register(function(token) {
		  alert("Device token:",token.token);
		});
	  });
	});
