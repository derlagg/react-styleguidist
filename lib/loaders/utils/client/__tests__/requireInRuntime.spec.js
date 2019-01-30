import requireInRuntime from '../requireInRuntime';
var map = {
  a: function a() {
    return 'a';
  }
};
test('return a module from the map', function () {
  var result = requireInRuntime(map, 'a');
  expect(result).toBeDefined();
  expect(result()).toBe('a');
});
test('throw if module is not in the map', function () {
  var fn = function fn() {
    return requireInRuntime(map, 'pizza');
  };

  expect(fn).toThrowError('require() statements can be added');
});