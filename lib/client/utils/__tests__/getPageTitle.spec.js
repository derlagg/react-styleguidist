import getPageTitle from '../getPageTitle';
var baseTitle = 'Styleguide';
describe('getPageTitle', function () {
  it('should return style guide title for the all view', function () {
    var result = getPageTitle([], baseTitle, 'all');
    expect(result).toBe(baseTitle);
  });
  it('should return component name for component isolation mode', function () {
    var name = 'Component';
    var result = getPageTitle([{
      components: [{
        name: name
      }]
    }], baseTitle, 'component');
    expect(result).toMatch(name);
  });
  it('should return component name for example isolation mode', function () {
    var name = 'Component';
    var result = getPageTitle([{
      components: [{
        name: name
      }]
    }], baseTitle, 'example');
    expect(result).toMatch(name);
  });
  it('should return section name for example isolation mode of a example content', function () {
    var sectionName = 'Section';
    var result = getPageTitle([{
      name: sectionName,
      content: [],
      components: []
    }], baseTitle, 'example');
    expect(result).toMatch(sectionName);
  });
  it('should return section name for example isolation mode, if no components are passed', function () {
    var name = 'Section';
    var result = getPageTitle([{
      name: name
    }], baseTitle, 'example');
    expect(result).toMatch(name);
  });
  it('should return section name for section isolation mode', function () {
    var name = 'Section';
    var result = getPageTitle([{
      name: name
    }], baseTitle, 'section');
    expect(result).toMatch(name);
  });
  it('should return Error 404 for notFound isolation mode', function () {
    var name = 'Section';
    var result = getPageTitle([{
      name: name
    }], baseTitle, 'notFound');
    expect(result).toMatch('Page not found');
  });
});