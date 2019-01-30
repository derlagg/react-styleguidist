import "core-js/modules/web.dom.iterable";
import getComponent from '../getComponent';
describe('getComponent', function () {
  describe('if there is a default export in the module', function () {
    it('should return that', function () {
      var module = {
        default: 'useMe'
      };
      var actual = getComponent(module);
      expect(actual).toBe(module.default);
    });
  });
  describe('if it is a CommonJS module and exports a function', function () {
    it('should return the module', function () {
      var testCases = [function () {}, function () {}, function Class() {}];
      testCases.forEach(function (testCase) {
        var actual = getComponent(testCase);
        expect(actual).toBe(testCase);
      });
    });
  });
  describe('if there is only one named export in the module', function () {
    it('should return that', function () {
      var module = {
        oneNamedExport: 'isLonely'
      };
      var actual = getComponent(module);
      expect(actual).toBe(module.oneNamedExport);
    });
  });
  describe('if there is a named export whose name matches the name argument', function () {
    it('should return that', function () {
      var _module;

      var name = 'Component';
      var module = (_module = {}, _module[name] = 'isNamed', _module.OtherComponent = 'isAlsoNamed', _module);
      var actual = getComponent(module, name);
      expect(actual).toBe(module[name]);
    });
  });
  describe('if there is more than one named export and no matching name', function () {
    it('should fall back on returning the module as a whole', function () {
      var name = 'Component';
      var module = {
        RandomName: 'isNamed',
        confusingExport: 123
      };
      var actual = getComponent(module, name);
      expect(actual).toBe(module);
    });
  });
});