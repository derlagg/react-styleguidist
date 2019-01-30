"use strict";

var _glogg = _interopRequireDefault(require("glogg"));

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _glogg.default)('rsg');
afterEach(() => {
  logger.removeAllListeners();
});
test('should setup custom logger function', () => {
  const info = jest.fn();
  const message = 'pizza';
  (0, _logger.default)({
    info
  }, false);
  logger.info(message);
  expect(info).toBeCalledWith(message);
});
test('should setup debug logger in verbose mode', () => {
  const debug = jest.fn();
  const message = 'pizza';
  (0, _logger.default)({
    debug
  }, true);
  logger.debug(message);
  expect(debug).toBeCalledWith(message);
});
test('should not setup debug logger in non-verbose mode', () => {
  const debug = jest.fn();
  const message = 'pizza';
  (0, _logger.default)({
    debug
  }, false);
  logger.debug(message);
  expect(debug).toHaveBeenCalledTimes(0);
});
test('should accept default loggers', () => {
  const info = jest.fn();
  const message = 'pizza';
  (0, _logger.default)(undefined, false, {
    info
  });
  logger.info(message);
  expect(info).toBeCalledWith(message);
});