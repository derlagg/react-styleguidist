"use strict";

var _vm = _interopRequireDefault(require("vm"));

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

var _styleguideLoader = _interopRequireDefault(require("../styleguide-loader"));

var _config = _interopRequireDefault(require("../../scripts/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable quotes */
const file = _path.default.resolve(__dirname, '../../../test/components/Button/Button.js');

const configDir = _path.default.resolve(__dirname, '../../../test');

it('should return valid, parsable JS', () => {
  const result = _styleguideLoader.default.pitch.call({
    request: file,
    _styleguidist: {
      sections: [{
        components: 'components/**/*.js'
      }],
      configDir,
      getExampleFilename: () => 'Readme.md',
      getComponentPathLine: filepath => filepath
    },
    addContextDependency: () => {}
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
});
it('should return correct component paths: default glob pattern', () => {
  const result = _styleguideLoader.default.pitch.call({
    request: file,
    _styleguidist: Object.assign({}, (0, _config.default)(_path.default.resolve(__dirname, '../../../test/apps/defaults/styleguide.config.js'))),
    addContextDependency: () => {}
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(result).toMatch(`'filepath': 'src/components/Button.js'`);
  expect(result).toMatch(`'filepath': 'src/components/Placeholder.js'`);
});
it('should return correct component paths: glob', () => {
  const result = _styleguideLoader.default.pitch.call({
    request: file,
    _styleguidist: {
      sections: [{
        components: 'components/**/*.js'
      }],
      configDir,
      getExampleFilename: () => 'Readme.md',
      getComponentPathLine: filepath => filepath
    },
    addContextDependency: () => {}
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
  expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
  expect(result).toMatch(`'filepath': 'components/RandomButton/RandomButton.js'`);
});
it('should return correct component paths: function returning absolute paths', () => {
  const result = _styleguideLoader.default.pitch.call({
    request: file,
    _styleguidist: {
      sections: [{
        components: () => [`${configDir}/components/Button/Button.js`, `${configDir}/components/Placeholder/Placeholder.js`]
      }],
      configDir,
      getExampleFilename: () => 'Readme.md',
      getComponentPathLine: filepath => filepath
    },
    addContextDependency: () => {}
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
  expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
  expect(result).not.toMatch(`'filepath': 'components/RandomButton/RandomButton.js'`);
});
it('should return correct component paths: function returning relative paths', () => {
  const result = _styleguideLoader.default.pitch.call({
    request: file,
    _styleguidist: {
      sections: [{
        components: () => ['components/Button/Button.js', 'components/Placeholder/Placeholder.js']
      }],
      configDir,
      getExampleFilename: () => 'Readme.md',
      getComponentPathLine: filepath => filepath
    },
    addContextDependency: () => {}
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
  expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
  expect(result).not.toMatch(`'filepath': 'components/RandomButton/RandomButton.js'`);
});
it('should return correct component paths: array of of relative paths', () => {
  const result = _styleguideLoader.default.pitch.call({
    request: file,
    _styleguidist: {
      sections: [{
        components: ['components/Button/Button.js', 'components/Placeholder/Placeholder.js']
      }],
      configDir,
      getExampleFilename: () => 'Readme.md',
      getComponentPathLine: filepath => filepath
    },
    addContextDependency: () => {}
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
  expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
});
it('should filter out components without examples if skipComponentsWithoutExample=true', () => {
  const result = _styleguideLoader.default.pitch.call({
    request: file,
    _styleguidist: {
      sections: [{
        components: () => ['components/Button/Button.js', 'components/RandomButton/RandomButton.js']
      }],
      configDir,
      skipComponentsWithoutExample: true,
      getExampleFilename: componentPath => _path.default.join(_path.default.dirname(componentPath), 'Readme.md'),
      getComponentPathLine: filepath => filepath
    },
    addContextDependency: () => {}
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(result).toBeTruthy();
  expect(() => new _vm.default.Script(result)).not.toThrow();
  expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
  expect(result).not.toMatch(`'filepath': 'components/RandomButton/RandomButton.js'`);
});
it('should add context dependencies to webpack from contextDependencies config option', () => {
  const contextDependencies = ['foo', 'bar'];
  const addContextDependency = jest.fn();

  _styleguideLoader.default.pitch.call({
    request: file,
    _styleguidist: {
      sections: [{
        components: 'components/**/*.js'
      }],
      configDir,
      getExampleFilename: () => 'Readme.md',
      getComponentPathLine: filepath => filepath,
      contextDependencies
    },
    addContextDependency
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(addContextDependency).toHaveBeenCalledTimes(2);
  expect(addContextDependency).toBeCalledWith(contextDependencies[0]);
  expect(addContextDependency).toBeCalledWith(contextDependencies[1]);
});
it('should add common parent folder of all components to context dependencies', () => {
  const addContextDependency = jest.fn();

  _styleguideLoader.default.pitch.call({
    request: file,
    _styleguidist: {
      sections: [{
        components: 'components/**/*.js'
      }],
      configDir,
      getExampleFilename: () => 'Readme.md',
      getComponentPathLine: filepath => filepath
    },
    addContextDependency
  }, (0, _fs.readFileSync)(file, 'utf8'));

  expect(addContextDependency).toHaveBeenCalledTimes(1);
  expect(addContextDependency).toBeCalledWith(expect.stringMatching(/test\/components\/$/));
});