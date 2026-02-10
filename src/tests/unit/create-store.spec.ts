import { createStore } from '../../index'
import { applyMiddleware, combineReducers } from '../../helpers'

describe('applyMiddleware', () => {
  it('composes middleware in the correct order', () => {
    const calls: string[] = []

    const mw1 = () => (next: any) => (action: any) => {
      calls.push('mw1 before')
      const result = next(action)
      calls.push('mw1 after')
      return result
    }

    const mw2 = () => (next: any) => (action: any) => {
      calls.push('mw2 before')
      const result = next(action)
      calls.push('mw2 after')
      return result
    }

    const rootReducer = combineReducers({
      a: (state: number = 0) => state + 1,
      b: (state: string = 'x') => state + 'y',
    })

    const store = createStore(
      rootReducer,
      undefined,
      applyMiddleware([mw1, mw2]),
    )

    store.dispatch({ type: 'TEST' })

    expect(calls).toEqual([
      'mw1 before',
      'mw2 before',
      'mw2 after',
      'mw1 after',
    ])
  })

  it('returns the updated state via getState after dispatch', () => {
    type Action =
      | { type: 'inc' }
      | { type: 'add'; payload: number }

    const reducer = (state = 0, action?: Action) => {
      state = state ?? 0
      switch (action?.type) {
        case 'inc':
          return state + 1
        case 'add':
          return state + action.payload
        default:
          return state
      }
    }

    const spyMiddleware =
      (store: { getState: () => number }) =>
        (next: any) =>
          (action: Action) => {
            const result = next(action)
            return result
          }

    const store = createStore(
      reducer,
      0,
      applyMiddleware([spyMiddleware]),
    )
    const statesSeen: number[] = []
    const unsubscribe = store.subscribe(() => {
      statesSeen.push(store.getState())
    })

    expect(store.getState()).toBe(0)
    store.dispatch({ type: 'inc' })
    expect(statesSeen).toEqual([1])
    unsubscribe()
    expect(store.getState()).toBe(1)

    store.dispatch({ type: 'add', payload: 5 })
    expect(statesSeen).toEqual([1])
  })

  it('handles array state (todos) with middleware and subscribers correctly', () => {
  type Todo = {
    id: number
    text: string
    completed: boolean
  }

  type Action =
    | { type: 'todos/add'; payload: { id: number; text: string } }
    | { type: 'todos/toggle'; payload: { id: number } }
    | { type: 'todos/clearCompleted' }

  const todosReducer = (
    state: Todo[] = [],
    action?: Action,
  ): Todo[] => {
    if (!action) return state

    switch (action.type) {
      case 'todos/add':
        return [
          ...state,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false,
          },
        ]

      case 'todos/toggle':
        return state.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        )

      case 'todos/clearCompleted':
        return state.filter(todo => !todo.completed)

      default:
        return state
    }
  }

  const statesSeen: Todo[][] = []

  const middleware =
    (store: { getState: () => Todo[] }) =>
    (next: any) =>
    (action: Action) => {
      const prevState = store.getState()
      const result = next(action)
      const nextState = store.getState()
      expect(nextState).not.toBe(prevState)
      return result
    }

  const store = createStore(
    todosReducer,
    [],
    applyMiddleware([middleware]),
  )

  const unsubscribe = store.subscribe(() => {
    statesSeen.push(store.getState())
  })

  store.dispatch({
    type: 'todos/add',
    payload: { id: 1, text: 'Write tests' },
  })

  store.dispatch({
    type: 'todos/add',
    payload: { id: 2, text: 'Ship library' },
  })

  store.dispatch({
    type: 'todos/toggle',
    payload: { id: 1 },
  })

  store.dispatch({ type: 'todos/clearCompleted' })

  expect(statesSeen).toHaveLength(4)

  expect(store.getState()).toEqual([
    {
      id: 2,
      text: 'Ship library',
      completed: false,
    },
  ])

  unsubscribe()

  store.dispatch({
    type: 'todos/add',
    payload: { id: 3, text: 'This should not notify' },
  })

  expect(statesSeen).toHaveLength(4)
})

})