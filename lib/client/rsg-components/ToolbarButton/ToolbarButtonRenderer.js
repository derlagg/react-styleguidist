import "core-js/modules/es6.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';
export var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color;
  return {
    button: {
      padding: 2,
      // Increase clickable area a bit
      color: color.light,
      background: 'transparent',
      transition: 'color 750ms ease-out',
      cursor: 'pointer',
      '&:hover, &:focus': {
        isolate: false,
        color: color.linkHover,
        transition: 'color 150ms ease-in'
      },
      '&:focus': {
        isolate: false,
        outline: [[1, 'dotted', color.linkHover]]
      },
      '& + &': {
        isolate: false,
        marginLeft: space[1]
      },
      // Style react-icons icon passed as children
      '& svg': {
        width: space[3],
        height: space[3],
        color: 'currentColor',
        cursor: 'inherit'
      }
    },
    isSmall: {
      '& svg': {
        width: 14,
        height: 14
      }
    }
  };
};
export function ToolbarButtonRenderer(_ref2) {
  var _cx;

  var classes = _ref2.classes,
      className = _ref2.className,
      onClick = _ref2.onClick,
      href = _ref2.href,
      title = _ref2.title,
      small = _ref2.small,
      children = _ref2.children;
  var classNames = cx(classes.button, className, (_cx = {}, _cx[classes.isSmall] = small, _cx));

  if (href !== undefined) {
    return React.createElement("a", {
      href: href,
      title: title,
      className: classNames,
      "aria-label": title
    }, children);
  }

  return React.createElement("button", {
    type: "button",
    onClick: onClick,
    title: title,
    className: classNames,
    "aria-label": title
  }, children);
}
ToolbarButtonRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  small: PropTypes.bool,
  children: PropTypes.node
};
export default Styled(styles)(ToolbarButtonRenderer);