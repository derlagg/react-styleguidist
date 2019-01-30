import deepfreeze from 'deepfreeze';
import filterComponentExamples from '../filterComponentExamples';
var component = deepfreeze({
  props: {
    examples: ['a', 'b', 'c', 'd']
  },
  other: 'info'
});
describe('filterComponentExamples', function () {
  it('should return a shallow copy of a component with example filtered by given index', function () {
    var result = filterComponentExamples(component, 2);
    expect(result).toEqual({
      props: {
        examples: ['c']
      },
      other: 'info'
    });
  });
});