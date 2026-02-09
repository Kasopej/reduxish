import { Reducer, Store } from "./types/core"
import { StoreEnhancer, Middleware, InferDispatchExtensionsFromMiddlewareArray } from "./types/helpers"

/**
 * Combine multiple reducers into a single root reducer.
 *
 * @template S - The type of the global state
 * @param reducerMap - A map of reducers, where each key corresponds to a key in the global state and each value is the corresponding reducer.
 * @returns A single root reducer that will manage the global state.
 */
export function combineReducers<S extends Record<string, unknown>>(
    reducerMap: {
            [K in keyof S]: Reducer<S[K]>
        }
): Reducer<S> {
    return (state = {}, action) => (Object.entries(reducerMap)).reduce((partialState, [key, reducer]) => {
        partialState[key] = reducer(state[key], action)
        return partialState
    }, {} as Record<string, unknown>) as S
}

export function applyMiddleware<S, A extends ReadonlyArray<Middleware>>(middlewares: A): StoreEnhancer<S, {
    dispatch: InferDispatchExtensionsFromMiddlewareArray<A>
}> {
    return (storeCreator) => (reducer, intialState) => {
        const store = storeCreator(reducer, intialState) as Store<S> & {
    dispatch: InferDispatchExtensionsFromMiddlewareArray<A>
}
        middlewares.concat().reverse().forEach(middleware => {
            store.dispatch = middleware(store)(store.dispatch)
        })
        return store as Store<S> & {
    dispatch: InferDispatchExtensionsFromMiddlewareArray<A>
}
    }
}