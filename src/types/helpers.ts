import { StoreCreator } from "..";
import { Action, Dispatch, Store } from "./core";

export type UnkownDispatch = (action: any) => any
export type Middleware<DispatchExt = {}> = (store: Store<unknown>) => (next: UnkownDispatch) => DispatchExt

// export type StoreEnhancer<S = unknown, A extends Readonly<Array<Middleware>> = Readonly<Array<Middleware>>> = (middlewares: A) => EnhancedStoreCreator<S, {
//     dispatch: InferDispatchExtensionsFromMiddlewareArray<A>
// }>

export type StoreEnhancer<S = unknown,Ext = {}> = (next: StoreCreator<S, unknown>) => StoreCreator<S, Ext>

type IsAny<T, True, False = never> = (T extends never ? True : False);
declare class Tuple<Items extends ReadonlyArray<unknown> = []> extends Array<Items[number]> {
    constructor(length: number);
    constructor(...items: Items);
    static get [Symbol.species](): any;
    concat<AdditionalItems extends ReadonlyArray<unknown>>(items: Tuple<AdditionalItems>): Tuple<[...Items, ...AdditionalItems]>;
    concat<AdditionalItems extends ReadonlyArray<unknown>>(items: AdditionalItems): Tuple<[...Items, ...AdditionalItems]>;
    concat<AdditionalItems extends ReadonlyArray<unknown>>(...items: AdditionalItems): Tuple<[...Items, ...AdditionalItems]>;
    prepend<AdditionalItems extends ReadonlyArray<unknown>>(items: Tuple<AdditionalItems>): Tuple<[...AdditionalItems, ...Items]>;
    prepend<AdditionalItems extends ReadonlyArray<unknown>>(items: AdditionalItems): Tuple<[...AdditionalItems, ...Items]>;
    prepend<AdditionalItems extends ReadonlyArray<unknown>>(...items: AdditionalItems): Tuple<[...AdditionalItems, ...Items]>;
}


type ExtractDispatchFromMiddlewareTuple<MiddlewareTuple extends readonly any[], Acc extends {}> = MiddlewareTuple extends [infer Head, ...infer Tail] ? ExtractDispatchFromMiddlewareTuple<Tail, Acc & (Head extends Middleware<infer D> ? IsAny<D, {}, D> : {})> : Acc;
export type ExtractDispatchExtensions<M> = M extends Tuple<infer MiddlewareTuple> ? ExtractDispatchFromMiddlewareTuple<MiddlewareTuple, {}> : M extends ReadonlyArray<Middleware> ? ExtractDispatchFromMiddlewareTuple<[...M], {}> : never;

export type InferDispatchExtensionsFromMiddlewareArray<A extends readonly any[], Acc = {}> = A extends [infer First, ...infer Rest] ? InferDispatchExtensionsFromMiddlewareArray<Rest, Acc & (First extends Middleware<infer M> ? M : {})> : Acc