import deepfreeze from 'deepfreeze';
import getRouteData from '../getRouteData';
import { DisplayModes } from '../../consts';
var sections = deepfreeze([{
  sections: [{
    name: 'Components',
    components: [{
      name: 'Button',
      props: {
        displayName: 'Button',
        examples: ['example 0', 'example 1']
      },
      module: 1
    }, {
      name: 'Image',
      props: {
        displayName: 'Image'
      },
      module: 2
    }],
    sections: [],
    exampleMode: 'collapse',
    usageMode: 'collapse',
    sectionDepth: 0
  }, {
    name: 'Section',
    content: ['example 0', 'example 1'],
    components: [],
    sections: [],
    exampleMode: 'collapse',
    usageMode: 'collapse',
    sectionDepth: 0
  }, {
    name: 'Buttons',
    components: [{
      name: 'Label',
      module: 1
    }, {
      name: 'RandomButton',
      module: 2
    }],
    sections: [],
    exampleMode: 'collapse',
    usageMode: 'collapse',
    sectionDepth: 2
  }]
}]);
describe('getRouteData', function () {
  it('should return "all" mode by default', function () {
    var result = getRouteData([], '');
    expect(result.displayMode).toBe(DisplayModes.all);
  });
  it('should return one component', function () {
    var result = getRouteData(sections, '#!/Button');
    expect(result).toMatchSnapshot();
  });
  it('should return one section', function () {
    var result = getRouteData(sections, '#!/Section');
    expect(result).toMatchSnapshot();
  });
  it('should return one example from a component', function () {
    var result = getRouteData(sections, '#!/Button/1');
    expect(result).toMatchSnapshot();
  });
  it('should return one example from a section', function () {
    var result = getRouteData(sections, '#!/Section/1');
    expect(result).toMatchSnapshot();
  });
  it('should return first section if pagePerSection and hash is empty', function () {
    var result = getRouteData(sections[0].sections, '', true);
    expect(result).toMatchSnapshot();
  });
  it('should return one section if pagePerSection and hash is #/Section', function () {
    var result = getRouteData(sections, '#/Section', true);
    expect(result).toMatchSnapshot();
  });
  it('should return one section without components if pagePerSection and hash is #/Buttons', function () {
    var result = getRouteData(sections, '#/Buttons', true);
    expect(result).toMatchSnapshot();
  });
  it('should return one component if pagePerSection and hash is #/Buttons/Label', function () {
    var result = getRouteData(sections, '#/Buttons/Label', true);
    expect(result).toMatchSnapshot();
  });
  it('should return not found if pagePerSection and hash is #/Buttons/Label/Not', function () {
    var result = getRouteData(sections, '#/Buttons/Label/Not', true);
    expect(result).toMatchSnapshot();
  });
});