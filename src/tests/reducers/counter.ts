export type CounterAction =
  | { type: 'inc' }
  | { type: 'dec' }
  | { type: 'add'; payload: number }

export function counterReducer(
  state = 0,
  action: CounterAction,
): number {
  switch (action.type) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    case 'add':
      return state + action.payload
    default:
      return state
  }
}