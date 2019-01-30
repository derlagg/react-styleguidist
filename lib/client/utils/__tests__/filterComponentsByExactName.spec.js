import "core-js/modules/es6.function.name";
import deepfreeze from 'deepfreeze';
import filterComponentsByExactName from '../filterComponentsByExactName';
var components = deepfreeze([{
  name: 'Button'
}, {
  name: 'Image'
}]);
describe('filterComponentsByExactName', function () {
  it('should return components with exact name', function () {
    var result = filterComponentsByExactName(components, 'Image');
    expect(result.map(function (x) {
      return x.name;
    })).toEqual(['Image']);
  });
});