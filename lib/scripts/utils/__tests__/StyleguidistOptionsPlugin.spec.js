"use strict";

var _StyleguidistOptionsPlugin = _interopRequireDefault(require("../StyleguidistOptionsPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  foo: 42
};
it('should attach Styleguidist config when webpack 4 is used', () => {
  const context = {};
  const compiler = {
    hooks: {
      compilation: {
        tap: (name, callback) => {
          callback({
            hooks: {
              normalModuleLoader: {
                tap: (name, compilationCallback) => {
                  compilationCallback(context, {
                    resource: 'pizza'
                  });
                }
              }
            }
          });
        }
      }
    }
  };
  const plugin = new _StyleguidistOptionsPlugin.default(options);
  plugin.apply(compiler);
  expect(context._styleguidist).toEqual(options);
});
it('should do nothing when resource is empty', () => {
  const context = {};
  const compiler = {
    hooks: {
      compilation: {
        tap: (name, callback) => {
          callback({
            hooks: {
              normalModuleLoader: {
                tap: (name, compilationCallback) => {
                  compilationCallback(context, {});
                }
              }
            }
          });
        }
      }
    }
  };
  const plugin = new _StyleguidistOptionsPlugin.default(options);
  plugin.apply(compiler);
  expect(context._styleguidist).toBeFalsy();
});