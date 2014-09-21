describe('Service: geradorDeFrases', function(){
  var geradorDeFrases,
      httpBackend;

  // Instancia o módulo com o serviço
  beforeEach(module('leroLeroApp'));

  // Instancia o serviço
  beforeEach(inject(
    function(_geradorDeFrases_, $httpBackend){
      geradorDeFrases = _geradorDeFrases_;
      httpBackend = $httpBackend;
    }
  ));

  afterEach(function (){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('fornece frases', function(){
    var frases;

    httpBackend.expectGET('frases.json').respond([
      "Frase 1", "Frase 2", "Frase 3"
    ]);

    geradorDeFrases.get().then(function(response) {
      frases = response;
    });

    httpBackend.flush();
    expect(frases).toEqual(jasmine.any(Array));
    expect(frases.length).toBe(3);

  });

});






describe('Controller: MainCtrl', function() {
  var scope,
      MainCtrl,
      geradorMock,
      q;

  geradorMock = {
    get: function() {
      var frases = q.defer();
      frases.resolve(["A","B","C"]);
      return frases.promise;
    }
  };

  beforeEach(module('leroLeroApp'));

  beforeEach(inject(
    function ($controller, $rootScope, $q) {
      q = $q;
      scope = $rootScope.$new();

      MainCtrl = $controller('MainCtrl', {
        $scope: scope,
                geradorDeFrases: geradorMock
      });

      scope.$apply();
    }
  ));

  it('começa com uma frase', function() {
    expect(scope.frase)
      .toEqual(jasmine.any(String));
  });

  it('gera nova a frase', function() {
   var primeiraFrase = scope.frase,
       segundaFrase;


   scope.gerarFrase();
   segundaFrase = scope.frase;

   expect(primeiraFrase).not.toEqual(segundaFrase);
  });

  it('gera infinitas frases', function() {
    var i = 3;
    do { scope.gerarFrase() } while (--i);

    expect(scope.frase).toBeDefined();
  });

});





describe("Directive: tweetLink",
  function(){
    var scope,
        element,
        twitterUrl = 'http://twitter.com/home?status=';

    beforeEach(module('leroLeroApp'));

    beforeEach(inject(
      function($compile, $rootScope){
        scope = $rootScope.$new();

        element = angular.element(
          "<a tweet-link " +
          "sentence='{{frase}}'>" +
          "tweet</a>");
        $compile(element)(scope);
        scope.$digest();
      }
    ));

    it('linka frase pro twitter', function() {
      scope.frase = "teste";
      scope.$apply();

      expect(element.attr('href'))
        .toEqual(twitterUrl + scope.frase);
    });

    it('oculta link se não couber num tweet', function (){
      scope.frase = "Por outro lado, a consolidação das estruturas exige a precisão e a definição do sistema de formação de quadros que corresponde às necessid...";
      scope.$apply();

      expect(element.css('display')).toBe('none');

      scope.frase = "Não obstante.";
      scope.$apply();

      expect(element.css('display')).toBe('inherit');
    });

    it('codifica frase para URL', function() {
      scope.frase = " #";
      scope.$apply();

      expect(element.attr('href'))
        .toEqual(twitterUrl + '%20%23');
    });

  });



describe('Filter: tweet', function() {
  var tweet;

  beforeEach(module('leroLeroApp'));

  beforeEach(inject(
    function(tweetFilter) {
      tweet = tweetFilter;
    }
  ));

  it('adiciona aspas e hashtag', function() {
    expect(tweet('Não obstante'))
      .toBe('"Não obstante" #lerolero');
  });

});
