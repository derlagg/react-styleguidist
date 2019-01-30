import findSection from '../findSection';
var sections = [{
  name: 'General',
  sections: [{
    name: 'Particles',
    components: [{
      name: 'Button'
    }, {
      name: 'Image'
    }]
  }]
}];
describe('findSection', function () {
  it('should return top level section', function () {
    var result = findSection(sections, 'General');
    expect(result).toEqual(sections[0]);
  });
  it('should return nested sections', function () {
    var result = findSection(sections, 'Particles');
    expect(result).toEqual(sections[0].sections[0]);
  });
  it('should return undefined when no sections found', function () {
    var result = findSection(sections, 'Pizza');
    expect(result).toBeFalsy();
  });
});