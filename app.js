angular.module('leroLeroApp', []);





angular.module('leroLeroApp')
  .factory('geradorDeFrases', function ($http) {
  var promise;

  var promise = $http.get('frases.json')
    .then(function (response) {
      return response.data;
    });

  return {
    get: function() {
      return promise;
    }
  };
});





angular.module('leroLeroApp')
  .controller('MainCtrl', function ($scope, geradorDeFrases) {

    var i = 0,
        frases;

    geradorDeFrases.get().then(function(response){
      frases = response;
      $scope.frase.gerar();
    });

    $scope.frase = {};

    $scope.frase.gerar = function () {
      $scope.frase.atual =
        frases[i];
      if (i < frases.length - 1) {
        i++;
      } else {
        i = 0;
      }
    };
  });



angular.module("leroLeroApp")
  .directive('tweetLink', function() {
    return {
      scope: {
        sentence: "@"
      },
      link: function (scope, element) {
        scope.$watch('sentence', function() {
          if (scope.sentence.length > 140) {
            element.css('display','none');
          } else {
            element.css('display','inherit');
            element.attr('href',
              'http://twitter.com/home?status='+
              encodeURIComponent(scope.sentence));
          }
        });
      }
    }
  });

angular.module("leroLeroApp")
  .filter('tweet', function() {
    return function(input) {
      return '"' + input + '" #lerolero';
    };
  });
