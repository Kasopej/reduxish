import combinedReducer from '../reducers/combined-reducer'

describe('combineReducers', () => {
  it('combines multiple reducers with initial state correctly', () => {
    const result = combinedReducer({
      a: 0,
      b: 'x',
    }, { type: 'ANY' })

    expect(result).toEqual({
      a: 1,
      b: 'xy',
    })
  })

    it('combines multiple reducers correctly', () => {

    const result = combinedReducer(undefined, { type: 'ANY' })

    expect(result).toEqual({
      a: 1,
      b: 'xy',
    })
  })
})