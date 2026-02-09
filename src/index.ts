import { Reducer, Store, StoreSubscriber } from "./types/core";
import deepFreeze from "deep-freeze"
import type { StoreEnhancer } from "./types/helpers";

function createStore<S, Ext = {}>(reducer: Reducer<S>, intialState?: S, storeEnhancer?: StoreEnhancer<S, Ext>): Store<S & Ext> {
    let state = intialState
    const subscribers: StoreSubscriber[] = []
    const storeCreator = {
        dispatch(action) {
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
                subscribers.filter(sub => subscribtionRequests.every((subRequest) => subRequest !== sub))
            }
        },
    } as Store<S & Ext>
    return storeEnhancer ? storeEnhancer(createStore)(reducer, intialState) : storeCreator
}

export {createStore}
export type StoreCreator<S, Ext = {}> = typeof createStore<S, Ext>