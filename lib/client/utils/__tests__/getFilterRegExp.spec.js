import "core-js/modules/es6.regexp.constructor";
import getFilterRegExp from '../getFilterRegExp';
describe('getFilterRegExp', function () {
  it('should return a RegExp', function () {
    var result = getFilterRegExp('');
    expect(result instanceof RegExp).toBe(true);
  });
  it('RegExp should fuzzy match a string', function () {
    var result = getFilterRegExp('btn');
    expect('button').toMatch(result);
  });
  it('RegExp should not match when string is different', function () {
    var result = getFilterRegExp('buttons');
    expect('button').not.toMatch(result);
  });
  it('should not throw when query contains special characters', function () {
    var fn = function fn() {
      return getFilterRegExp('\\');
    };

    expect(fn).not.toThrow();
  });
  it('RegExp should ignore non-alphanumeric characters', function () {
    var result = getFilterRegExp('#$b()tn');
    expect('button').toMatch(result);
  });
});