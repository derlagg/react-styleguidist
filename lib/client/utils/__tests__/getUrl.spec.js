import "core-js/modules/es6.object.assign";
import getUrl from '../getUrl';
describe('getUrl', function () {
  var loc = {
    origin: 'http://example.com',
    pathname: '/styleguide/',
    hash: '#/Components'
  };
  var name = 'FooBar';
  var slug = 'foobar';
  it('should return a home URL', function () {
    var result = getUrl({}, loc);
    expect(result).toBe('/styleguide/');
  });
  it('should return an absolute home URL', function () {
    var result = getUrl({
      absolute: true
    }, loc);
    expect(result).toBe('http://example.com/styleguide/');
  });
  it('should return an anchor URL', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      anchor: true
    }, loc);
    expect(result).toBe('/styleguide/#foobar');
  });
  it('should return an absolute anchor URL', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      anchor: true,
      absolute: true
    }, loc);
    expect(result).toBe('http://example.com/styleguide/#foobar');
  });
  it('should return an isolated URL', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      isolated: true
    }, loc);
    expect(result).toBe('/styleguide/#!/FooBar');
  });
  it('should return an absolute isolated URL', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      isolated: true,
      absolute: true
    }, loc);
    expect(result).toBe('http://example.com/styleguide/#!/FooBar');
  });
  it('should return an isolated example URL', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      example: 3,
      isolated: true
    }, loc);
    expect(result).toBe('/styleguide/#!/FooBar/3');
  });
  it('should return an isolated example=0 URL', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      example: 0,
      isolated: true
    }, loc);
    expect(result).toBe('/styleguide/#!/FooBar/0');
  });
  it('should return an absolute isolated example URL', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      example: 3,
      isolated: true,
      absolute: true
    }, loc);
    expect(result).toBe('http://example.com/styleguide/#!/FooBar/3');
  });
  it('should return a nochrome URL', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      nochrome: true
    }, loc);
    expect(result).toBe('/styleguide/?nochrome#!/FooBar');
  });
  it('should return an absolute nochrome URL', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      nochrome: true,
      absolute: true
    }, loc);
    expect(result).toBe('http://example.com/styleguide/?nochrome#!/FooBar');
  });
  it('should return a route path', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      hashPath: ['Documentation']
    }, loc);
    expect(result).toBe('/styleguide/#/Documentation/FooBar');
  });
  it('should return a route path with a param id=foobar', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      hashPath: ['Documentation'],
      id: true
    }, loc);
    expect(result).toBe('/styleguide/#/Documentation?id=foobar');
  });
  it('should return a param id=foobar', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      takeHash: true,
      id: true
    }, loc);
    expect(result).toBe('/styleguide/#/Components?id=foobar');
  });
  it('should return to param id = foobar even if the hash has parameters', function () {
    var result = getUrl({
      name: name,
      slug: slug,
      takeHash: true,
      id: true
    }, Object.assign({}, loc, {
      hash: '#/Components?foo=foobar'
    }));
    expect(result).toBe('/styleguide/#/Components?id=foobar');
  });
});