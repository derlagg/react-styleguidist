import "core-js/modules/es6.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';
import { hasInHash, getHash } from '../../utils/handleHash';

var styles = function styles(_ref) {
  var _isChild;

  var color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      space = _ref.space,
      mq = _ref.mq;
  return {
    list: {
      margin: 0,
      paddingLeft: space[2]
    },
    item: {
      color: color.base,
      display: 'block',
      margin: [[space[1], 0, space[1], 0]],
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      listStyle: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    isChild: (_isChild = {}, _isChild[mq.small] = {
      display: 'inline-block',
      margin: [[0, space[1], 0, 0]]
    }, _isChild),
    heading: {
      color: color.base,
      marginTop: space[1],
      fontFamily: fontFamily.base,
      fontWeight: 'bold'
    },
    isSelected: {
      fontWeight: 'bold'
    }
  };
};

export function ComponentsListRenderer(_ref2) {
  var classes = _ref2.classes,
      items = _ref2.items;
  items = items.filter(function (item) {
    return item.visibleName;
  });

  if (!items.length) {
    return null;
  }

  var windowHash = window.location.pathname + getHash(window.location.hash);
  return React.createElement("ul", {
    className: classes.list
  }, items.map(function (_ref3) {
    var heading = _ref3.heading,
        visibleName = _ref3.visibleName,
        href = _ref3.href,
        content = _ref3.content,
        external = _ref3.external;
    var isItemSelected = hasInHash(windowHash, href);
    return React.createElement("li", {
      className: cx(classes.item, (!content || !content.props.items.length) && classes.isChild, isItemSelected && classes.isSelected),
      key: href
    }, React.createElement(Link, {
      className: cx(heading && classes.heading),
      href: href,
      target: external ? '_blank' : undefined
    }, visibleName), content);
  }));
}
ComponentsListRenderer.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};
export default Styled(styles)(ComponentsListRenderer);