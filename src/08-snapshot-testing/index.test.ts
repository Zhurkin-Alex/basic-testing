// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const result = generateLinkedList(elements);

    expect(result).toStrictEqual(expectedLinkedList);
  });
});

describe('generateLinkedList', () => {
  test('should generate linked list from values 2', () => {
    const elements = [1, 2, 3];

    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });
});
