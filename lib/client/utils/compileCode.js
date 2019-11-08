import "regenerator-runtime/runtime";
import "core-js/modules/es6.promise";
import "core-js/modules/es6.regexp.match";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var compile = function compile(code) {
  return transform(code);
};

var startsWithJsx = function startsWithJsx(code) {
  return !!code.trim().match(/^</);
};

var wrapCodeInFragment = function wrapCodeInFragment(code) {
  return "<React.Fragment>" + code + "</React.Fragment>;";
};
/*
 * 1. Wrap code in React Fragment if it starts with JSX element
 * 2. Transform import statements into require() calls
 * 3. Compile code using Buble
 */


export default function compileCode(code, compilerConfig, onError) {
  try {
    var wrappedCode = startsWithJsx(code) ? wrapCodeInFragment(code) : code;
    return compile.bind(null, wrappedCode);
  } catch (err) {
    if (onError) {
      onError(err);
    }
  }

  return Promise.resolve();
}

function transform(source) {
  var body = JSON.stringify({
    source: source
  });
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  return fetch('http://hub.ce.arrival.co/web-transpiler/make', {
    method: 'POST',
    body: body,
    headers: headers,
    mode: 'cors'
  }).then(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(response) {
      var json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!response.ok) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return response.json();

            case 3:
              json = _context.sent;
              return _context.abrupt("return", json.result.outputText);

            case 5:
              return _context.abrupt("return", Promise.reject(response));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}
