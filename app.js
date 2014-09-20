angular.module('leroLeroApp', []);





angular.module('leroLeroApp')
  .factory('geradorDeFrases', function () {
  var frases,
      i;
      
  frases = [
    "Por outro lado, a consolidação das estruturas exige a precisão e a definição do sistema de formação de quadros que corresponde às necessidades.",
    "O incentivo ao avanço tecnológico, assim como o entendimento das metas propostas promove a alavancagem dos índices pretendidos.",
    "As experiências acumuladas demonstram que a valorização de fatores subjetivos aponta para a melhoria das direções preferenciais no sentido do progresso."
  ];
 
  return {
    get: function() {
      return frases;
    }
  };
});





angular.module('leroLeroApp')
  .controller('MainCtrl', function ($scope, geradorDeFrases) {

    var i = 0;
    
    $scope.frases = geradorDeFrases.get();

    $scope.gerarFrase = function () {
      $scope.frase =
        $scope.frases[i];
      if (i < $scope.frases.length - 1) {
        i++;
      } else {
        i = 0;
      }
    };
    
    $scope.gerarFrase();

  });
  
  
angular.module("leroLeroApp")
  .directive('tweetLink', function() {
    return {
      scope: {
        sentence: "="
      },
      link: function (scope, element) {
        scope.$watch('sentence', function() {
          element.attr('href',
            'http://twitter.com/home?status='+
            scope.sentence);  
        });
      }
    }  
  });
  
  
  
  
