import { combineReducers } from '../../helpers'

describe('combineReducers', () => {
  it('combines multiple reducers with initial state correctly', () => {
    const rootReducer = combineReducers({
      a: (state: number = 0) => state + 1,
      b: (state: string = 'x') => state + 'y',
    })

    const result = rootReducer({
      a: 0,
      b: 'x',
    }, { type: 'ANY' })

    expect(result).toEqual({
      a: 1,
      b: 'xy',
    })
  })

    it('combines multiple reducers correctly', () => {
    const rootReducer = combineReducers({
      a: (state: number = 0) => state + 1,
      b: (state: string = 'x') => state + 'y',
    })

    const result = rootReducer(undefined, { type: 'ANY' })

    expect(result).toEqual({
      a: 1,
      b: 'xy',
    })
  })
})