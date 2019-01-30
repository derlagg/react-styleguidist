"use strict";

var _vm = _interopRequireDefault(require("vm"));

var _fs = require("fs");

var _glogg = _interopRequireDefault(require("glogg"));

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _config = _interopRequireDefault(require("../../scripts/schemas/config"));

var _propsLoader = _interopRequireDefault(require("../props-loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _glogg.default)('rsg');
const _styleguidist = {
  handlers: _config.default.handlers.default,
  getExampleFilename: _config.default.getExampleFilename.default,
  resolver: _config.default.resolver.default
};
it('should return valid, parsable JS', () => {
  const file = './test/components/Button/Button.js';

  const result = _propsLoader.default.call({
    request: file,
    _styleguidist
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
});
it('should extract doclets', () => {
  const file = './test/components/Placeholder/Placeholder.js';

  const result = _propsLoader.default.call({
    request: file,
    _styleguidist
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(result.includes('makeABarrelRoll')).toBe(false);
  expect(result).toMatch('getImageUrl');
  expect(result).toMatch(/'see': '\{@link link\}'/);
  expect(result).toMatch(/'link': 'link'/);
  expect(result).toMatch(/require\('!!.*?\/loaders\/examples-loader\.js!\.\/examples.md'\)/);
});
describe('property sorting', () => {
  it('should sort properties by default', () => {
    const file = './test/components/Price/Price.js';

    const result = _propsLoader.default.call({
      request: file,
      _styleguidist
    }, (0, _fs.readFileSync)(file, 'utf8'));

    expect(result).toBeTruthy();
    expect(() => new _vm.default.Script(result)).not.toThrow();
    expect(result.includes('makeABarrelRoll')).toBe(false);
    expect(result).toMatch(/props[\s\S]*?name': 'symbol'[\s\S]*?name': 'value'[\s\S]*?name': 'emphasize'[\s\S]*?name': 'unit'/m);
  });
  it('should be possible to disable sorting', () => {
    const file = './test/components/Price/Price.js';

    const result = _propsLoader.default.call({
      request: file,
      _styleguidist: Object.assign({}, _styleguidist, {
        sortProps: props => props
      })
    }, (0, _fs.readFileSync)(file, 'utf8'));

    expect(result).toBeTruthy();
    expect(() => new _vm.default.Script(result)).not.toThrow();
    expect(result.includes('makeABarrelRoll')).toBe(false);
    expect(result).toMatch(/props[\s\S]*?name': 'value'[\s\S]*?name': 'unit'[\s\S]*?name': 'emphasize'[\s\S]*?name': 'symbol'/m);
  });
  it('should be possible to write custom sort function', () => {
    const sortFn = props => {
      const requiredProps = (0, _sortBy.default)(props.filter(prop => prop.required), 'name').reverse();
      const optionalProps = (0, _sortBy.default)(props.filter(prop => !prop.required), 'name').reverse();
      return optionalProps.concat(requiredProps);
    };

    const file = './test/components/Price/Price.js';

    const result = _propsLoader.default.call({
      request: file,
      _styleguidist: Object.assign({}, _styleguidist, {
        sortProps: sortFn
      })
    }, (0, _fs.readFileSync)(file, 'utf8'));

    expect(result).toBeTruthy();
    expect(() => new _vm.default.Script(result)).not.toThrow();
    expect(result.includes('makeABarrelRoll')).toBe(false);
    expect(result).toMatch(/props[\s\S]*?name': 'unit'[\s\S]*?name': 'emphasize'[\s\S]*?name': 'value'[\s\S]*?name': 'symbol'/m);
  });
});
it('should work with JSDoc annnotated components', () => {
  const file = './test/components/Annotation/Annotation.js';

  const result = _propsLoader.default.call({
    request: file,
    _styleguidist
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow(); // eslint-disable-next-line no-eval

  expect(eval(result)).toEqual(expect.objectContaining({
    displayName: 'Annotation',
    description: 'Styled-component test\n',
    doclets: {
      component: true
    }
  }));
});
it('should not render ignored props', () => {
  const file = './test/components/Button/Button.js';

  const result = _propsLoader.default.call({
    request: file,
    _styleguidist
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(result.includes('ignoredProp')).toBe(false);
});
it('should attach examples from Markdown file', () => {
  const file = './test/components/Button/Button.js';

  const result = _propsLoader.default.call({
    request: file,
    _styleguidist
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(result).toMatch(/require\('!!.*?\/loaders\/examples-loader\.js\?displayName=Button&file=\.%2FButton\.js&shouldShowDefaultExample=false!test\/components\/Button\/Readme\.md'\)/);
});
it('should warn if no componets are exported', () => {
  const warn = jest.fn();
  logger.once('warn', warn);
  const file = __filename;

  const result = _propsLoader.default.call({
    request: file,
    _styleguidist
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(warn).toBeCalledWith(expect.stringMatching('doesn’t export a component'));
});
it('should warn if a file cannot be parsed', () => {
  const warn = jest.fn();
  logger.once('warn', warn);
  const file = './test/components/Button/Readme.md';

  const result = _propsLoader.default.call({
    request: file,
    _styleguidist
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(warn).toBeCalledWith(expect.stringMatching('Cannot parse'));
});
it('should add context dependencies to webpack from contextDependencies config option', () => {
  const contextDependencies = ['foo', 'bar'];
  const addContextDependency = jest.fn();
  const file = './test/components/Button/Button.js';

  const result = _propsLoader.default.call({
    request: file,
    _styleguidist: Object.assign({}, _styleguidist, {
      contextDependencies
    }),
    addContextDependency
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(addContextDependency).toHaveBeenCalledTimes(2);
  expect(addContextDependency).toBeCalledWith(contextDependencies[0]);
  expect(addContextDependency).toBeCalledWith(contextDependencies[1]);
});
it('should update the returned props object after enhancing from the updateDocs config option', () => {
  const updateDocs = jest.fn();
  const file = './test/components/Button/Button.js';

  const result = _propsLoader.default.call({
    request: file,
    _styleguidist: Object.assign({}, _styleguidist, {
      updateDocs
    })
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(updateDocs).toHaveBeenCalledWith(expect.objectContaining({
    displayName: 'Button'
  }), './test/components/Button/Button.js');
});