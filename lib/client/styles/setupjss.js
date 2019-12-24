import "core-js/modules/es6.object.assign";
import { create } from 'jss';
import global from 'jss-global';
import isolate from 'jss-isolate';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import compose from 'jss-compose';
import nonInheritedProps from './nonInheritedProps';

var createGenerateClassName = function createGenerateClassName() {
  var counter = 0;
  return function (rule) {
    return "rsg--" + rule.key + "-" + counter++;
  };
};

var jss = create({
  createGenerateClassName: createGenerateClassName,
  plugins: [global(), isolate({
    reset: Object.assign({}, nonInheritedProps, {
      // “Global” styles for all components
      boxSizing: 'border-box',
      // Allow inheritance because it may be set on body and should be available for user components
      color: 'inherit',
      font: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit'
    })
  }), nested(), camelCase(), defaultUnit(), compose()]
});
export default jss;