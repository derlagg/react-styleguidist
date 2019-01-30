"use strict";

var _path = _interopRequireDefault(require("path"));

var _getProps = _interopRequireDefault(require("../getProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('should return an object for props', () => {
  const result = (0, _getProps.default)({
    displayName: 'Button',
    description: 'The only true button.',
    methods: [],
    props: {
      children: {
        type: {},
        required: true,
        description: 'Button label.'
      },
      color: {
        type: {},
        required: false,
        description: ''
      }
    }
  });
  expect(result).toMatchSnapshot();
});
it('should return an object for props without description', () => {
  const result = (0, _getProps.default)({
    displayName: 'Button',
    props: {
      children: {
        type: {},
        required: true,
        description: 'Button label.'
      }
    }
  });
  expect(result).toMatchSnapshot();
});
it('should remove non-public methods', () => {
  const result = (0, _getProps.default)({
    displayName: 'Button',
    methods: [{
      docblock: `Public method.
@public`
    }, {
      docblock: `Private method.
@private`
    }, {
      docblock: 'Private method by default.'
    }]
  }, __filename);
  expect(result).toMatchSnapshot();
});
it('should get method info from docblock and merge it', () => {
  const result = (0, _getProps.default)({
    displayName: 'Button',
    methods: [{
      docblock: `
Baz method with foo param

@public
@returns {string} test
`
    }]
  }, __filename);
  expect(result.methods).toMatchSnapshot();
});
it('should accept @return as a synonym of @returns', () => {
  const result = (0, _getProps.default)({
    displayName: 'Button',
    methods: [{
      docblock: `
Baz method with foo param

@public
@return {string} test
`
    }]
  }, __filename);
  expect(result.methods).toMatchSnapshot();
});
it('should get method params info from docblock and merge it with passed method info', () => {
  const result = (0, _getProps.default)({
    displayName: 'Button',
    methods: [{
      docblock: `
Foo method with baz param

@public
@param {string} [baz=bar]
@arg {string} foo param described with @arg tag
@argument {string} test param described with @argument tag
@returns {string} test
`,
      params: [{
        name: 'baz'
      }, {
        name: 'foo'
      }, {
        name: 'test'
      }]
    }]
  }, __filename);
  expect(result.methods).toMatchSnapshot();
});
it('should return an object for props with doclets', () => {
  const result = (0, _getProps.default)({
    displayName: 'Button',
    description: `
The only true button.

@foo Foo
@bar Bar
`
  }, __filename);
  expect(result).toMatchSnapshot();
});
it('should return require statement for @example doclet', () => {
  const result = (0, _getProps.default)({
    displayName: 'Button',
    description: `
The only true button.

@example ../../../test/components/Placeholder/examples.md
`
  }, __filename);
  expect(result).toMatchSnapshot();
});
it('should return require statement for @example doclet only when the file exists', () => {
  const result = (0, _getProps.default)({
    displayName: 'Button',
    description: `
The only true button.

@example example.md
`
  }, __filename);
  expect(result).toMatchSnapshot();
});
it('should highlight code in description (fenced code block)', () => {
  const result = (0, _getProps.default)({
    description: `
The only true button.

\`\`\`js
alert('Hello world');
\`\`\`
`
  });
  expect(result).toMatchSnapshot();
});
it("should not crash when using doctrine to parse a default prop that isn't in the props list", () => {
  const result = (0, _getProps.default)({
    description: 'The only true button.',
    methods: [],
    props: {
      crash: {
        description: undefined
      }
    }
  });
  expect(result).toMatchSnapshot();
});
it('should guess a displayName for components that react-docgen was not able to recognize', () => {
  const result = (0, _getProps.default)({
    methods: [],
    props: {}
  }, _path.default.join('an', 'absolute', 'path', 'to', 'YourComponent.js'));
  expect(result).toHaveProperty('displayName', 'YourComponent');
});
describe('with @visibleName tag present in the description', () => {
  const result = (0, _getProps.default)({
    description: 'bar\n@visibleName foo'
  });
  it('should set visibleName property on the docs object', () => {
    expect(result).toHaveProperty('visibleName', 'foo');
  });
  it('should delete visibleName from doclets on the docs object', () => {
    expect(result.doclets).not.toHaveProperty('visibleName');
  });
  it('should delete visibleName from tags on the docs object', () => {
    expect(result.tags).not.toHaveProperty('visibleName');
  });
});