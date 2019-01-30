import React from 'react';
import Pre from './index';
describe('Markdown Pre', function () {
  it('should render a pre', function () {
    var actual = render(React.createElement(Pre, null, "This is pre-formatted text."));
    expect(actual).toMatchSnapshot();
  });
  it('should render highlighted code', function () {
    var code = '<button>OK</button>';
    var actual = render(React.createElement(Pre, {
      className: "lang-html"
    }, code));
    expect(actual).toMatchSnapshot();
  });
});