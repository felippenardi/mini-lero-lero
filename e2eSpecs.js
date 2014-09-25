beforeEach(function() {
  browser.get('http://localhost:8000/');
});

describe('gera frase', function() {
  it('should add one and two', function() {
    var frase1,
    frase2;

  element(by.binding('frase.atual')).getText()
    .then(function(frase) {
      frase1 = frase;
    });
  element(by.id('gerar-frase')).click();
  element(by.binding('frase.atual')).getText()
    .then(function(frase) {
      frase2 = frase;
      expect(frase1).not.toBe(frase2);
    });
  });
});

describe('mostra butão do twitter', function() {
  it('mostra botão do twitter', function() {
    element(by.className('tweet-button')).getCssValue('display')
      .then(function(display){
        expect(display).toBe('none');
      });
    element(by.id('gerar-frase')).click();
    element(by.className('tweet-button')).getCssValue('display')
      .then(function(display){
        expect(display).not.toBe('none');
      });
  });
});
