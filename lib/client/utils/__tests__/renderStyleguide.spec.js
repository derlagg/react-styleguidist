import renderStyleguide from '../renderStyleguide';
var styleguide = {
  config: {
    title: 'My Style Guide',
    pagePerSection: false
  },
  sections: [{
    components: [{
      props: {
        displayName: 'Button'
      },
      module: 'ButtonModule'
    }, {
      props: {
        displayName: 'Image'
      },
      module: 'ImageModule'
    }]
  }],
  welcomeScreen: false,
  patterns: ['button', 'input']
};
var codeRevision = 1;
var location = {
  hash: ''
};
var doc = {
  title: function title() {}
};
var history = {
  replaceState: function replaceState() {}
};
afterEach(function () {
  delete global.Button;
  delete global.Image;
});
describe('renderStyleguide', function () {
  it('should render StyleGuide component', function () {
    var result = shallow(renderStyleguide(styleguide, codeRevision, location, doc, history));
    expect(result).toMatchSnapshot();
  });
  it('should change document title', function () {
    var title = jest.fn();
    var location = {
      hash: ''
    };
    Object.defineProperty(location, 'title', {
      set: title
    });
    renderStyleguide(styleguide, codeRevision, location, location, history);
    expect(title).toBeCalledWith('My Style Guide');
  });
  it('should change document title in isolated mode', function () {
    var title = jest.fn();
    var location = {
      hash: '#!/Button'
    };
    Object.defineProperty(location, 'title', {
      set: title
    });
    renderStyleguide(styleguide, codeRevision, location, location, history);
    expect(title).toBeCalledWith('Button — My Style Guide');
  });
  it('should remove #/ from the address bar', function () {
    var location = {
      hash: '#/',
      pathname: '/pizza',
      search: '?foo=bar'
    };
    var history = {
      replaceState: jest.fn()
    };
    renderStyleguide(styleguide, codeRevision, location, location, history);
    expect(history.replaceState).toBeCalledWith('', 'My Style Guide', '/pizza?foo=bar');
  });
});