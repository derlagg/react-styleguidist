import React from 'react';
import { CodeRenderer } from './CodeRenderer';
describe('Code blocks', function () {
  it('should render code', function () {
    var code = '<button>OK</button>';
    var actual = shallow(React.createElement(CodeRenderer, {
      classes: {}
    }, code));
    expect(actual).toMatchSnapshot();
  });
});