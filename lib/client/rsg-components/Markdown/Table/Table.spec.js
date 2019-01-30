import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from './index';
describe('Markdown Table', function () {
  it('should render a table', function () {
    var actual = render(React.createElement(Table, null, React.createElement(TableHead, null, React.createElement(TableRow, null, React.createElement(TableCell, {
      header: true
    }, "1st header"), React.createElement(TableCell, {
      header: true
    }, "2nd header"))), React.createElement(TableBody, null, React.createElement(TableRow, null, React.createElement(TableCell, null, "1st cell"), React.createElement(TableCell, null, "2nd cell")))));
    expect(actual).toMatchSnapshot();
  });
});