"use strict";

var _server = _interopRequireDefault(require("../server"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../create-server', () => () => {
  return {
    app: {
      listen: (port, host, cb) => cb(),
      close: cb => cb()
    },
    compiler: {}
  };
});
test('server should return an object containing a server instance', () => {
  const config = (0, _config.default)();
  const callback = jest.fn();
  const serverInfo = (0, _server.default)(config, callback);
  expect(callback).toBeCalled();
  expect(serverInfo.app).toBeTruthy();
  expect(serverInfo.compiler).toBeTruthy();
  expect(typeof serverInfo.app.listen).toBe('function');
  expect(typeof serverInfo.app.close).toBe('function');
});