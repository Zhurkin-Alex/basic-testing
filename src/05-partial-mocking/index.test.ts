import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      return null;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenNthCalledWith(1, 'foo');
    expect(console.log).toHaveBeenNthCalledWith(2, 'bar');
    expect(console.log).toHaveBeenNthCalledWith(3, 'baz');
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
