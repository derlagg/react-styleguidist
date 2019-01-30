"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();

const configDir = _path.default.resolve(__dirname, '../../../test/apps/defaults');

beforeEach(() => {
  process.chdir(configDir);
});
afterAll(() => {
  process.chdir(cwd);
});
it('should read a config file', () => {
  const result = (0, _config.default)('../basic/styleguide.config.js');
  expect(result).toMatchObject({
    title: 'React Style Guide Example'
  });
});
it('should accept absolute path', () => {
  const result = (0, _config.default)(_path.default.join(__dirname, '../../../test/apps/basic/styleguide.config.js'));
  expect(result).toMatchObject({
    title: 'React Style Guide Example'
  });
});
it('should throw when passed config file not found', () => {
  const fn = () => (0, _config.default)('pizza');

  expect(fn).toThrow();
});
it('should find config file automatically', () => {
  process.chdir('../basic');
  const result = (0, _config.default)();
  expect(result).toMatchObject({
    title: 'React Style Guide Example'
  });
});
it('should accept config as an object', () => {
  const result = (0, _config.default)({
    title: 'Style guide'
  });
  expect(result).toMatchObject({
    title: 'Style guide'
  });
});
it('should throw if config has errors', () => {
  expect.assertions(1);

  try {
    (0, _config.default)({
      components: 42
    });
  } catch (err) {
    expect(err.extra).toMatch('should be string, function, or array');
  }
});
it('should change the config using the update callback', () => {
  const result = (0, _config.default)({
    title: 'Style guide'
  }, config => {
    config.title = 'Pizza';
    return config;
  });
  expect(result).toMatchObject({
    title: 'Pizza'
  });
});
it('should have default getExampleFilename implementation', () => {
  const result = (0, _config.default)();
  expect(typeof result.getExampleFilename).toEqual('function');
});
it('default getExampleFilename should return Readme.md path if it exists', () => {
  process.chdir('../..');
  const result = (0, _config.default)();
  expect(result.getExampleFilename(_path.default.resolve('components/Button/Button.js'))).toEqual(_path.default.resolve('components/Button/Readme.md'));
});
it('default getExampleFilename should return Component.md path if it exists', () => {
  process.chdir('../..');
  const result = (0, _config.default)();
  expect(result.getExampleFilename(_path.default.resolve('components/Placeholder/Placeholder.js'))).toEqual(_path.default.resolve('components/Placeholder/Placeholder.md'));
});
it('default getExampleFilename should return Component.md path if it exists with index.js', () => {
  process.chdir('../..');
  const result = (0, _config.default)();
  result.components = './components/**/*.js';
  expect(result.getExampleFilename(_path.default.resolve('components/Label/index.js'))).toEqual(_path.default.resolve('components/Label/Label.md'));
});
it('default getExampleFilename should return false if no examples file found', () => {
  process.chdir('../..');
  const result = (0, _config.default)();
  expect(result.getExampleFilename(_path.default.resolve('components/RandomButton/RandomButton.js'))).toBeFalsy();
});
it('should have default getComponentPathLine implementation', () => {
  const result = (0, _config.default)();
  expect(typeof result.getComponentPathLine).toEqual('function');
  expect(result.getComponentPathLine('components/Button.js')).toEqual('components/Button.js');
});
it('should have default title based on package.json name', () => {
  const result = (0, _config.default)();
  expect(result.title).toEqual('Pizza Style Guide');
});
it('configDir option should be a directory of a passed config', () => {
  const result = (0, _config.default)(_path.default.join(configDir, 'styleguide.config.js'));
  expect(result).toMatchObject({
    configDir
  });
});
it('configDir option should be a current directory if the config was passed as an object', () => {
  const result = (0, _config.default)();
  expect(result).toMatchObject({
    configDir: process.cwd()
  });
});
it('should absolutize assetsDir if it exists', () => {
  const assetsDir = 'src/components';
  const result = (0, _config.default)({
    assetsDir
  });
  expect(result.assetsDir).toEqual(_path.default.join(configDir, assetsDir));
});
it('should throw if assetsDir does not exist', () => {
  const fn = () => (0, _config.default)({
    assetsDir: 'pizza'
  });

  expect(fn).toThrow();
});
it('should use embedded default example template if defaultExample=true', () => {
  const result = (0, _config.default)({
    defaultExample: true
  });
  expect(typeof result.defaultExample).toEqual('string');
  expect(_fs.default.existsSync(result.defaultExample)).toBeTruthy();
});
it('should absolutize defaultExample if it is a string', () => {
  const result = (0, _config.default)({
    defaultExample: 'src/components/Button.md'
  });
  expect(result.defaultExample[0]).toEqual('/');
});
it('should throw if defaultExample does not exist', () => {
  expect.assertions(1);

  try {
    (0, _config.default)({
      defaultExample: 'pizza'
    });
  } catch (err) {
    expect(err.extra).toMatch('does not exist');
  }
});
it('should use components option as the first sections if there’s no sections option', () => {
  const components = 'components/*/*.js';
  const result = (0, _config.default)({
    components
  });
  expect(result.sections).toHaveLength(1);
  expect(result.sections[0].components).toEqual(components);
});
it('should use default components option both components and sections options weren’t specified', () => {
  const result = (0, _config.default)();
  expect(result.sections).toHaveLength(1);
  expect(result.sections[0].components).toMatch('**');
});
it('should ignore components option there’s sections options', () => {
  const components = 'components/*/*.js';
  const result = (0, _config.default)({
    components: 'components/Button/*.js',
    sections: [{
      components
    }]
  });
  expect(result.sections).toHaveLength(1);
  expect(result.sections[0].components).toEqual(components);
});
it('should return webpackConfig option as is', () => {
  const webpackConfig = {
    foo: 42
  };
  const result = (0, _config.default)({
    webpackConfig
  });
  expect(result.webpackConfig).toEqual(webpackConfig);
});
it('should return webpackConfig with user webpack config', () => {
  process.chdir('../basic');
  const result = (0, _config.default)();
  expect(result.webpackConfig).toEqual(expect.objectContaining({
    module: {
      rules: expect.any(Array)
    }
  }));
});
it('should allow no webpack config', () => {
  process.chdir('../no-webpack');

  const fn = () => (0, _config.default)();

  expect(fn).not.toThrow();
});
it('should throw when old template as a string option passed', () => {
  expect.assertions(1);

  try {
    (0, _config.default)({
      template: 'pizza'
    });
  } catch (err) {
    expect(err.extra).toMatch('format has been changed');
  }
});
it('should throw when editorConfig option passed', () => {
  expect.assertions(1);

  try {
    (0, _config.default)({
      editorConfig: {
        theme: 'foo'
      }
    });
  } catch (err) {
    expect(err.extra).toMatch('config option was removed');
  }
});
it('mountPointId should have default value', () => {
  const result = (0, _config.default)();
  expect(result.mountPointId).toEqual('rsg-root');
});
it('mountPointId should have default value', () => {
  const result = (0, _config.default)();
  expect(result.mountPointId).toEqual('rsg-root');
});