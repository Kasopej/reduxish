import { createStore } from '../../index'
import { applyMiddleware } from '../../helpers'
import combinedReducer from '../reducers/combined-reducer'
import { CounterAction, counterReducer } from '../reducers/counter'
import { Todo, TodoAction, todosReducer } from '../reducers/todo-reducer'

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

    const store = createStore(
      combinedReducer,
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


    const spyMiddleware =
      (store: { getState: () => number }) =>
        (next: any) =>
          (action: CounterAction) => {
            const result = next(action)
            return result
          }

    const store = createStore(
      counterReducer,
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


  const statesSeen: Todo[][] = []

  const middleware =
    (store: { getState: () => Todo[] }) =>
    (next: any) =>
    (action: TodoAction) => {
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