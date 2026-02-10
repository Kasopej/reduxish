export type Action = {
    type: string
}

export type UnknownAction = Record<string, unknown> & Action

export interface Dispatch<A extends UnknownAction = UnknownAction> {
    (action: A): A
}

export type StoreSubscriber = Function

export interface Store<S> {
    dispatch<A extends UnknownAction = UnknownAction>(action: A): ReturnType<Dispatch<A>>
    getState: () => S
    subscribe: (...subscribtionRequests: StoreSubscriber[]) => () => void
}


export interface Reducer<S, A extends UnknownAction = UnknownAction> {
    (state: S | undefined, action?: A): S
}