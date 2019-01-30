import "core-js/modules/es6.function.name";
import deepfreeze from 'deepfreeze';
import filterComponentsInSectionsByExactName from '../filterComponentsInSectionsByExactName';
var sections = deepfreeze([{
  name: 'General',
  sections: [{
    name: 'Particles',
    components: [{
      name: 'Button'
    }, {
      name: 'Image'
    }]
  }]
}]);
describe('filterComponentsInSectionsByExactName', function () {
  it('should return components at any level with exact name', function () {
    var result = filterComponentsInSectionsByExactName(sections, 'Image', true);
    expect(result[0].components.map(function (x) {
      return x.name;
    })).toEqual(['Image']);
  });
});