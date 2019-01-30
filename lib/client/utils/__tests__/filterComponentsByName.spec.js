import deepfreeze from 'deepfreeze';
import filterComponentsByName from '../filterComponentsByName';
var components = deepfreeze([{
  name: 'Button'
}, {
  name: 'Image'
}, {
  name: 'Input'
}, {
  name: 'Link'
}, {
  name: 'Textarea'
}]);
describe('filterComponentsByName', function () {
  it('should return initial list with empty query', function () {
    var result = filterComponentsByName(components, '');
    expect(result).toEqual(components);
  });
  it('should return filtered list, should ignore case', function () {
    var result = filterComponentsByName(components, 'button');
    expect(result).toEqual([{
      name: 'Button'
    }]);
  });
  it('should return empty list when nothing found', function () {
    var result = filterComponentsByName(components, 'pizza');
    expect(result).toEqual([]);
  });
  it('should return all components if all of them match query', function () {
    // It doesn’t happen when RegExp has global flag for some reason
    var components = [{
      name: 'Button'
    }, {
      name: 'CounterButton'
    }, {
      name: 'PushButton'
    }, {
      name: 'RandomButtom'
    }, {
      name: 'WrappedButton'
    }];
    var result = filterComponentsByName(components, 'bu');
    expect(result).toEqual(components);
  });
});