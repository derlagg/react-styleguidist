import "core-js/modules/es6.function.name";
import "core-js/modules/es6.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';
export var styles = function styles(_ref) {
  var fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      color = _ref.color;
  return {
    name: {
      fontFamily: fontFamily.monospace,
      fontSize: fontSize.small,
      color: color.name
    },
    isDeprecated: {
      color: color.light,
      textDecoration: 'line-through'
    }
  };
};
export function NameRenderer(_ref2) {
  var _cx;

  var classes = _ref2.classes,
      children = _ref2.children,
      deprecated = _ref2.deprecated;
  var classNames = cx(classes.name, (_cx = {}, _cx[classes.isDeprecated] = deprecated, _cx));
  return React.createElement("code", {
    className: classNames
  }, children);
}
NameRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  deprecated: PropTypes.bool
};
export default Styled(styles)(NameRenderer);