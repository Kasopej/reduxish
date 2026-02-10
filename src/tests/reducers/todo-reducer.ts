export type Todo = {
    id: number
    text: string
    completed: boolean
  }

 export type TodoAction =
    | { type: 'todos/add'; payload: { id: number; text: string } }
    | { type: 'todos/toggle'; payload: { id: number } }
    | { type: 'todos/clearCompleted' }

 export const todosReducer = (
    state: Todo[] = [],
    action?: TodoAction,
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