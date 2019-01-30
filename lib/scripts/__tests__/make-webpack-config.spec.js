"use strict";

var _webpack = _interopRequireWildcard(require("webpack"));

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _makeWebpackConfig = _interopRequireDefault(require("../make-webpack-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

jest.mock('copy-webpack-plugin', () => {
  const RealCopyWebpackPluginModule = require.requireActual('copy-webpack-plugin');

  return jest.fn(RealCopyWebpackPluginModule);
});
const styleguideConfig = {
  styleguideDir: __dirname,
  require: [],
  title: 'Style Guide'
};

const getClasses = (plugins, name) => plugins.filter(x => x.constructor.name === name);

const getClassNames = plugins => plugins.map(x => x.constructor.name);

const process$env$nodeEnv = process.env.NODE_ENV;
beforeEach(() => {
  _copyWebpackPlugin.default.mockClear();
});
afterEach(() => {
  process.env.NODE_ENV = process$env$nodeEnv;
});
it('should return a development config', () => {
  const env = 'development';
  const config = (0, _makeWebpackConfig.default)(styleguideConfig, env);
  const errors = (0, _webpack.validate)(config);
  expect(errors).toHaveLength(0);
  const plugins = getClassNames(config.plugins);
  expect(plugins).toContain('HotModuleReplacementPlugin');
  expect(config).toMatchObject({
    mode: env
  });
  expect(config).not.toHaveProperty('optimization');
});
it('should return a production config', () => {
  const env = 'production';
  const config = (0, _makeWebpackConfig.default)(styleguideConfig, env);
  const errors = (0, _webpack.validate)(config);
  expect(errors).toHaveLength(0);
  const plugins = getClassNames(config.plugins);
  expect(plugins).toContain('CleanWebpackPlugin');
  expect(plugins).not.toContain('HotModuleReplacementPlugin');
  expect(config).toMatchObject({
    output: {
      filename: expect.stringContaining('[chunkhash'),
      chunkFilename: expect.stringContaining('[chunkhash')
    }
  });
  expect(config).toMatchObject({
    mode: env
  });
  expect(getClasses(config.optimization.minimizer, 'TerserPlugin')).toHaveLength(1);
});
it('should set aliases', () => {
  const result = (0, _makeWebpackConfig.default)(styleguideConfig, 'development');
  expect(result.resolve.alias).toMatchSnapshot();
});
it('should set aliases from moduleAliases option', () => {
  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    moduleAliases: {
      foo: 'bar'
    }
  }), 'development');
  expect(result.resolve.alias).toMatchSnapshot();
});
it('should set aliases from styleguideComponents option', () => {
  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    styleguideComponents: {
      foo: 'bar'
    }
  }), 'development');
  expect(result.resolve.alias).toMatchSnapshot();
});
it('should prepend requires as webpack entries', () => {
  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    require: ['a/b.js', 'c/d.css']
  }), 'development');
  expect(result.entry).toMatchSnapshot();
});
it('should enable verbose mode in CleanWebpackPlugin', () => {
  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    verbose: true
  }), 'production');
  expect(getClasses(result.plugins, 'CleanWebpackPlugin')).toMatchSnapshot();
});
it('should set from with assetsDir in CopyWebpackPlugin', () => {
  (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    assetsDir: '/assets/'
  }), 'production');
  expect(_copyWebpackPlugin.default).toHaveBeenCalledWith([{
    from: '/assets/'
  }]); //([
});
it('should add CopyWebpackPlugin to plugins in production', () => {
  (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig), 'production');
  expect(_copyWebpackPlugin.default).toHaveBeenCalledWith([]);
});
it('should merge user webpack config', () => {
  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    webpackConfig: {
      resolve: {
        alias: {
          foo: 'bar'
        }
      }
    }
  }), 'development');
  expect(result.resolve.alias).toMatchSnapshot();
});
it('should not owerwrite user DefinePlugin', () => {
  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    webpackConfig: {
      plugins: [new _webpack.default.DefinePlugin({
        'process.env.PIZZA': JSON.stringify('salami')
      })]
    }
  }), 'development'); // Doesn’t really test that values won’t be overwritten, just that
  // DefinePlugin is applied twice. To write a real test we’d have to run
  // webpack

  expect(getClasses(result.plugins, 'DefinePlugin')).toMatchSnapshot();
});
it('should update webpack config', () => {
  const extensions = ['.web.js', '.js'];
  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    dangerouslyUpdateWebpackConfig: c => {
      c.resolve.extensions = extensions;
      return c;
    }
  }), 'development');
  expect(result.resolve.extensions).toEqual(extensions);
});
it('should pass template context to HTML plugin', () => {
  const template = {
    pizza: 'salami'
  };
  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    template
  }), 'development');
  expect(getClasses(result.plugins, 'MiniHtmlWebpackPlugin')[0]).toMatchObject({
    options: {
      context: template,
      template: expect.any(Function)
    }
  });
});
it('should pass template function to HTML plugin', () => {
  const template = () => '<html />';

  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    template
  }), 'development');
  expect(getClasses(result.plugins, 'MiniHtmlWebpackPlugin')[0]).toMatchObject({
    options: {
      context: expect.any(Object),
      template
    }
  });
});
it('should update NODE_ENV', () => {
  process.env.NODE_ENV = '';
  (0, _makeWebpackConfig.default)(styleguideConfig, 'production');
  expect(process.env.NODE_ENV).toBe('production');
});
it('should not overwrite NODE_ENV', () => {
  (0, _makeWebpackConfig.default)(styleguideConfig, 'production');
  expect(process.env.NODE_ENV).toBe(process$env$nodeEnv);
});
it('should pass specified mountPointId to HTML plugin', () => {
  const result = (0, _makeWebpackConfig.default)(Object.assign({}, styleguideConfig, {
    mountPointId: 'foo-bar'
  }), 'development');
  expect(getClasses(result.plugins, 'MiniHtmlWebpackPlugin')[0].options.context.container).toEqual('foo-bar');
});