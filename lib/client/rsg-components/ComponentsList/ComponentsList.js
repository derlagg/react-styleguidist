import "core-js/modules/es6.function.name";
import "core-js/modules/es6.object.assign";
import React from 'react';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import PropTypes from 'prop-types';
import getUrl from '../../utils/getUrl';

function ComponentsList(_ref) {
  var classes = _ref.classes,
      items = _ref.items,
      _ref$useRouterLinks = _ref.useRouterLinks,
      useRouterLinks = _ref$useRouterLinks === void 0 ? false : _ref$useRouterLinks,
      useHashId = _ref.useHashId,
      hashPath = _ref.hashPath;
  var mappedItems = items.map(function (item) {
    return Object.assign({}, item, {
      href: item.href ? item.href : getUrl({
        name: item.name,
        slug: item.slug,
        anchor: !useRouterLinks,
        hashPath: useRouterLinks ? hashPath : false,
        id: useRouterLinks ? useHashId : false
      })
    });
  });
  return React.createElement(ComponentsListRenderer, {
    classes: classes,
    items: mappedItems
  });
}

ComponentsList.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object,
  hashPath: PropTypes.array,
  useRouterLinks: PropTypes.bool,
  useHashId: PropTypes.bool
};
export default ComponentsList;