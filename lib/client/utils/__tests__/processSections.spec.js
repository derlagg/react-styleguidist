import "core-js/modules/es6.function.name";
import deepfreeze from 'deepfreeze';
import processSections from '../processSections';
var sections = deepfreeze([{
  sections: [{
    name: 'Components',
    components: [{
      props: {
        displayName: 'Button'
      },
      module: 1
    }]
  }]
}]);
describe('processSections', function () {
  it('should recursively process all sections and components', function () {
    var result = processSections(sections);
    expect(result[0].sections[0].components[0].name).toBe('Button');
  });
  it('should set visibleName property on each section', function () {
    var result = processSections(sections);
    expect(result[0].sections[0].visibleName).toBe('Components');
  });
});