"use strict";

var _path = _interopRequireDefault(require("path"));

var _getSections = _interopRequireWildcard(require("../getSections"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configDir = _path.default.resolve(__dirname, '../../../../test');

const config = {
  configDir,
  exampleMode: 'collapse',
  usageMode: 'collapse',
  getExampleFilename: a => a,
  getComponentPathLine: a => a
};
const sections = [{
  name: 'Readme',
  content: 'components/Button/Readme.md'
}, {
  name: 'Components',
  components: 'components/**/[A-Z]*.js'
}, {
  name: 'Ignore',
  components: 'components/**/*.js',
  ignore: '**/components/Annotation/*'
}];
const sectionsWithDepth = [{
  name: 'Documentation',
  sections: [{
    name: 'Files',
    sections: [{
      name: 'First File'
    }]
  }],
  sectionDepth: 2
}, {
  name: 'Components',
  sections: [{
    name: 'Buttons'
  }],
  sectionDepth: 0
}];
const sectionsWithBadDepth = [{
  name: 'Documentation',
  sections: [{
    name: 'Files',
    sections: [{
      name: 'First File'
    }],
    sectionDepth: 2
  }]
}];

function filterSectionDepth(section) {
  if (section.sections && section.sections.length) {
    return {
      sectionDepth: section.sectionDepth,
      sections: section.sections.map(filterSectionDepth)
    };
  }

  return {
    sectionDepth: section.sectionDepth
  };
}

it('processSection() should return an object for section with content', () => {
  const result = (0, _getSections.processSection)(sections[0], config);
  expect(result).toMatchSnapshot();
});
it('processSection() should throw when content file not found', () => {
  const fn = () => (0, _getSections.processSection)({
    content: 'pizza'
  }, config);

  expect(fn).toThrowError('Section content file not found');
});
it('processSection() should return an object for section with components', () => {
  const result = (0, _getSections.processSection)(sections[1], config);
  expect(result).toMatchSnapshot();
});
it('processSection() should return an object for section without ignored components', () => {
  const result = (0, _getSections.processSection)(sections[2], config);
  expect(result).toMatchSnapshot();
});
it('getSections() should return an array', () => {
  const result = (0, _getSections.default)(sections, config);
  expect(result).toMatchSnapshot();
});
it('getSections() should return an array of sectionsWithDepth with sectionDepth decreasing', () => {
  const result = (0, _getSections.default)(sectionsWithDepth, config);
  expect(result.map(filterSectionDepth)).toEqual([{
    sectionDepth: 2,
    sections: [{
      sectionDepth: 1,
      sections: [{
        sectionDepth: 0
      }]
    }]
  }, {
    sectionDepth: 0,
    sections: [{
      sectionDepth: 0
    }]
  }]);
});
it('getSections() should return an array of sectionsWithBadDepth taking the sectionDepth of the first depth of the sections', () => {
  const result = (0, _getSections.default)(sectionsWithBadDepth, config);
  expect(result.map(filterSectionDepth)).toEqual([{
    sectionDepth: 0,
    sections: [{
      sectionDepth: 0,
      sections: [{
        sectionDepth: 0
      }]
    }]
  }]);
});