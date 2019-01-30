import evalInContext from '../evalInContext';
describe('evalInContext', function () {
  test('return a function', function () {
    var result = evalInContext("alert('header')", function (a) {
      return a;
    }, "alert('code')");
    expect(typeof result).toBe('function');
  });
  test('create a separate scope for the body', function () {
    var fn = function fn() {
      return evalInContext("const react = require('react')", function (a) {
        return a;
      }, "const react = require('react')\nconst x = 42\n");
    };

    expect(fn).not.toThrow();
  });
});