import { addParamsToPath, removeParamsFromPath } from './queryParamsUtils';

describe('queryParamsUtils', () => {
  it('main functions', () => {
    expect(addParamsToPath('/practice', {})).to.eq('/practice');
    expect(addParamsToPath('/practice', { name: 'rahul', age: '20' })).to.eq(
      '/practice?name=rahul&age=20'
    );
    expect(removeParamsFromPath('/?name=rahul&age=20', ['name'])).to.eq(
      '/?age=20'
    );
    expect(removeParamsFromPath('/?name=rahul&age=20', ['name', 'age'])).to.eq(
      '/'
    );
  });
});
export {};
