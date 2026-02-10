import type { Reducer, Store, StoreSubscriber, UnknownAction } from "./types/core";
import deepFreeze from "deep-freeze"
import type { StoreEnhancer } from "./types/helpers";

function createStore<S, Ext = {}, A extends UnknownAction = UnknownAction>(reducer: Reducer<S, A>, intialState?: S, storeEnhancer?: StoreEnhancer<S, Ext>): Store<S> & Ext {
    let state = intialState
    const subscribers: StoreSubscriber[] = []
    const storeCreator = {
        dispatch<B extends A>(action: B) {
           state = reducer(typeof state === 'object' ? deepFreeze(state) as S: state as S, action)
           subscribers.forEach(sub => sub())
           return action
        },
        getState() {
            return state as (S & Ext)
        },
        subscribe(...subscribtionRequests) {
            subscribers.push(...subscribtionRequests)
            return () => {
                subscribers.splice(subscribers.length - subscribtionRequests.length, subscribtionRequests.length)
            }
        },
    } as Store<S> & Ext
    return storeEnhancer ? storeEnhancer(createStore)(reducer as any, intialState) : storeCreator
}

export {createStore}
export type StoreCreator<S, Ext = {}> = typeof createStore<S, Ext>