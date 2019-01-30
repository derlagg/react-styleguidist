import "core-js/modules/es6.array.find";
import "core-js/modules/es6.function.name";
import React from 'react';
import Slot from './Slot';
/* eslint-disable react/prop-types */

var Button = function Button(_ref) {
  var name = _ref.name,
      onClick = _ref.onClick,
      children = _ref.children;
  return React.createElement("button", {
    name: name,
    onClick: onClick
  }, children);
};

var Button2 = function Button2(props) {
  return React.createElement(Button, props, "2");
};

var fillsWithIds = [{
  id: 'one',
  render: Button
}, {
  id: 'two',
  render: Button2
}];
it('should renderer slots and pass props', function () {
  var actual = shallow(React.createElement(Slot, {
    name: "slot",
    props: {
      id: 'Pizza'
    }
  }), {
    context: {
      slots: {
        slot: [Button, Button2]
      }
    }
  });
  expect(actual).toMatchSnapshot();
});
it('should renderer slots in id/render format', function () {
  var actual = shallow(React.createElement(Slot, {
    name: "slot",
    props: {
      id: 'Pizza'
    }
  }), {
    context: {
      slots: {
        slot: fillsWithIds
      }
    }
  });
  expect(actual).toMatchSnapshot();
});
it('should pass active flag to active slot', function () {
  var actual = shallow(React.createElement(Slot, {
    name: "slot",
    active: "two"
  }), {
    context: {
      slots: {
        slot: fillsWithIds
      }
    }
  });
  expect(actual).toMatchSnapshot();
});
it('should renderer only active slot if onlyActive=true', function () {
  var actual = shallow(React.createElement(Slot, {
    name: "slot",
    active: "two",
    onlyActive: true
  }), {
    context: {
      slots: {
        slot: fillsWithIds
      }
    }
  });
  expect(actual).toMatchSnapshot();
});
it('should pass slot ID to onClick handler', function () {
  var onClick = jest.fn();
  var actual = mount(React.createElement(Slot, {
    name: "slot",
    props: {
      onClick: onClick
    }
  }), {
    context: {
      slots: {
        slot: fillsWithIds
      }
    }
  });
  actual.find('button[name="two"]').simulate('click');
  expect(onClick).toBeCalledWith('two', expect.any(Object));
});
it('should return null if all slots render null', function () {
  var actual = render(React.createElement(Slot, {
    name: "slot",
    props: {
      id: 'Pizza'
    }
  }), {
    context: {
      slots: {
        slot: [function () {
          return null;
        }]
      }
    }
  });
  expect(actual.node).toBeFalsy();
});