import {
  ValueToDeleteQueryKey,
  addParamsToPath,
  removeParamsFromPath,
  updateParamsForPath,
  updateParamsForQuery,
} from './queryParamsUtils';

describe('queryParamsUtils', () => {
  it('addParamsToPath', () => {
    expect(addParamsToPath('/practice', {})).to.eq('/practice');
    expect(addParamsToPath('/practice', { name: 'rahul', age: '20' })).to.eq(
      '/practice?name=rahul&age=20'
    );
  });
  it('removeParamsFromPath', () => {
    expect(removeParamsFromPath('/?name=rahul&age=20', ['name'])).to.eq(
      '/?age=20'
    );
    expect(removeParamsFromPath('/?name=rahul&age=20', ['name', 'age'])).to.eq(
      '/'
    );
  });
  it('updateParamsForQuery', () => {
    expect(updateParamsForQuery('', { name: 'rahul' })).to.eq('name=rahul');
    // question mark ? doesn't makes the difference
    expect(updateParamsForQuery('?', { name: 'rahul' })).to.eq('name=rahul');
    expect(updateParamsForQuery('name=rahul', { page: '2' })).to.eq(
      'name=rahul&page=2'
    );
    expect(updateParamsForQuery('?name=rahul&page=3', { page: '2' })).to.eq(
      'name=rahul&page=2'
    );
    expect(
      updateParamsForQuery('?name=rahul&page=3', {
        page: ValueToDeleteQueryKey,
      })
    ).to.eq('name=rahul');
    expect(
      updateParamsForQuery('?name=rahul&page=3', {
        name: ValueToDeleteQueryKey,
        page: ValueToDeleteQueryKey,
      })
    ).to.eq('');
  });

  it('updateParamsForPath', () => {
    expect(
      updateParamsForPath('/practice?name=rahul&page=3', {
        name: 'mehak',
        page: ValueToDeleteQueryKey,
      })
    ).to.eq('/practice?name=mehak');

    expect(
      updateParamsForPath('/practice?name=rahul&page=3', {
        name: ValueToDeleteQueryKey,
        page: ValueToDeleteQueryKey,
      })
    ).to.eq('/practice');
  });
});
export {};
