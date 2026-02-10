import { counterReducer } from '../reducers/counter'

describe('counterReducer', () => {
  it('returns initial state when state is undefined', () => {
    expect(counterReducer(undefined, { type: 'inc' })).toBe(1)
  })

  it('increments', () => {
    expect(counterReducer(1, { type: 'inc' })).toBe(2)
  })

  it('decrements', () => {
    expect(counterReducer(2, { type: 'dec' })).toBe(1)
  })

  it('adds payload', () => {
    expect(counterReducer(2, { type: 'add', payload: 5 })).toBe(7)
  })

  it('ignores unknown actions', () => {
    expect(
      counterReducer(10, { type: 'UNKNOWN' } as any),
    ).toBe(10)
  })
})