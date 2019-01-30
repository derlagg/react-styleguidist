import deepfreeze from 'deepfreeze';
import filterSectionsByName from '../filterSectionsByName';
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
describe('filterSectionsByName', function () {
  it('should recursively filter sections and components by name', function () {
    var result = filterSectionsByName(sections, 'button');
    expect(result).toMatchSnapshot();
  });
  it('should skip sections without matches inside', function () {
    var result = filterSectionsByName(sections, 'general');
    expect(result).toMatchSnapshot();
  });
  it('should return empty array if no components of sections match query', function () {
    var result = filterSectionsByName(sections, 'pizza');
    expect(result).toEqual([]);
  });
});