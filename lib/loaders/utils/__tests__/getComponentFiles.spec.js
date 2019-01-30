"use strict";

var _path = _interopRequireDefault(require("path"));

var _deabsdeep = _interopRequireDefault(require("deabsdeep"));

var _getComponentFiles = _interopRequireDefault(require("../getComponentFiles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configDir = _path.default.resolve(__dirname, '../../../../test');

const components = ['components/Annotation/Annotation.js', 'components/Button/Button.js'];
const processedComponents = components.map(c => `~/${c}`);
const glob = 'components/**/[A-Z]*.js';
const globArray = ['components/Annotation/[A-Z]*.js', 'components/Button/[A-Z]*.js'];

const deabs = x => (0, _deabsdeep.default)(x, {
  root: configDir
});

it('getComponentFiles() should return an empty array if components is null', () => {
  const result = (0, _getComponentFiles.default)();
  expect(result).toEqual([]);
});
it('getComponentFiles() should accept components as a function that returns file names', () => {
  const result = (0, _getComponentFiles.default)(() => components, configDir);
  expect(deabs(result)).toEqual(processedComponents);
});
it('getComponentFiles() should accept components as a function that returns absolute paths', () => {
  const absolutize = files => files.map(file => _path.default.join(configDir, file));

  const result = (0, _getComponentFiles.default)(() => absolutize(components), configDir);
  expect(deabs(result)).toEqual(processedComponents);
});
it('getComponentFiles() should accept components as a function that returns globs', () => {
  const result = (0, _getComponentFiles.default)(() => globArray, configDir);
  expect(deabs(result)).toEqual(['~/components/Annotation/Annotation.js', '~/components/Button/Button.js']);
});
it('getComponentFiles() should accept components as an array of file names', () => {
  const result = (0, _getComponentFiles.default)(components, configDir);
  expect(deabs(result)).toEqual(processedComponents);
});
it('getComponentFiles() should accept components as an array of absolute paths', () => {
  const absolutize = files => files.map(file => _path.default.join(configDir, file));

  const result = (0, _getComponentFiles.default)(absolutize(components), configDir);
  expect(deabs(result)).toEqual(processedComponents);
});
it('getComponentFiles() should accept components as an array of globs', () => {
  const result = (0, _getComponentFiles.default)(globArray, configDir);
  expect(deabs(result)).toEqual(['~/components/Annotation/Annotation.js', '~/components/Button/Button.js']);
});
it('getComponentFiles() should accept components as a glob', () => {
  const result = (0, _getComponentFiles.default)(glob, configDir);
  expect(deabs(result)).toEqual(['~/components/Annotation/Annotation.js', '~/components/Button/Button.js', '~/components/Placeholder/Placeholder.js', '~/components/Price/Price.js', '~/components/RandomButton/RandomButton.js']);
});
it('getComponentFiles() should ignore specified patterns for globs', () => {
  const result = (0, _getComponentFiles.default)(glob, configDir, ['**/*Button*']);
  expect(deabs(result)).toEqual(['~/components/Annotation/Annotation.js', '~/components/Placeholder/Placeholder.js', '~/components/Price/Price.js']);
});
it('getComponentFiles() should ignore specified patterns for globs in arrays', () => {
  const result = (0, _getComponentFiles.default)(globArray, configDir, ['**/*Button*']);
  expect(deabs(result)).toEqual(['~/components/Annotation/Annotation.js']);
});
it('getComponentFiles() should ignore specified patterns for globs from functions', () => {
  const result = (0, _getComponentFiles.default)(() => globArray, configDir, ['**/*Button*']);
  expect(deabs(result)).toEqual(['~/components/Annotation/Annotation.js']);
});
it('getComponentFiles() should throw if components is not a function, array or a string', () => {
  const fn = () => (0, _getComponentFiles.default)(42, configDir);

  expect(fn).toThrowError('should be string, function or array');
});