import { hasInHash, getHash, getHashAsArray, getParameterByName } from '../handleHash';
describe('handleHash', function () {
  var isolateHash = '#!/';
  var routeHash = '#/';
  it('hasInHash should return true if has #!/', function () {
    var result = hasInHash('#!/FooBar', isolateHash);
    expect(result).toBe(true);
  });
  it('hasInHash should return false if does not have #!/', function () {
    var result = hasInHash('#/FooBar', isolateHash);
    expect(result).toBe(false);
  });
  it('hasInHash should return true if has #/', function () {
    var result = hasInHash('#/FooBar', routeHash);
    expect(result).toBe(true);
  });
  it('hasInHash should return false if does not have #/', function () {
    var result = hasInHash('#!/FooBar', routeHash);
    expect(result).toBe(false);
  });
  it('getHash should return FooBar', function () {
    var result = getHash('#/FooBar', routeHash);
    expect(result).toBe('FooBar');
  });
  it('getHash should return FooBar without params', function () {
    var result = getHash('#/FooBar?id=Example/Perfect', routeHash);
    expect(result).toBe('FooBar');
  });
  it('getHash should return decode value', function () {
    var result = getHash('#!/Api%20%E7%BB%84%E4%BB%B6', isolateHash);
    expect(result).toBe('Api 组件');
  });
  it('getHashAsArray should return array', function () {
    var result = getHashAsArray('#!/FooBar/Component', isolateHash);
    expect(result).toEqual(['FooBar', 'Component']);
  });
  it('getHashAsArray should return array without params', function () {
    var result = getHashAsArray('#/FooBar/Component?id=Example/Perfect', routeHash);
    expect(result).toEqual(['FooBar', 'Component']);
  });
  it('getParameterByName should return Example when has id param', function () {
    var result = getParameterByName('#/FooBar/Component?id=Example', 'id');
    expect(result).toBe('Example');
  });
  it('getParameterByName should return null when do not has params', function () {
    var result = getParameterByName('#/FooBar/Component', 'id');
    expect(result).toEqual(null);
  });
  it('getParameterByName should return null when do not has id params', function () {
    var result = getParameterByName('#/FooBar/Component?foobar=3', 'id');
    expect(result).toEqual(null);
  });
});