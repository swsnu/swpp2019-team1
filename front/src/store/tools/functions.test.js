import { generateQuery } from './functions';

describe('functions', () => {
  it(`'generateQuery' should works correctly`, () => {
    let result = generateQuery('', null);
    expect(result).toBe('');
    result = generateQuery('', []);
    expect(result).toBe('');
    result = generateQuery('', [1]);
    expect(result).toBe('?category=1');
  });
});
