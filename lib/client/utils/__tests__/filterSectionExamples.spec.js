import deepfreeze from 'deepfreeze';
import filterSectionExamples from '../filterSectionExamples';
var section = deepfreeze({
  content: ['a', 'b', 'c', 'd'],
  other: 'info'
});
describe('filterSectionExamples', function () {
  it('should return a shallow copy of a section with example filtered by given index', function () {
    var result = filterSectionExamples(section, 2);
    expect(result).toEqual({
      content: ['c'],
      other: 'info'
    });
  });
});