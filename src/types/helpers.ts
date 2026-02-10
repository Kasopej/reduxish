import { StoreCreator } from "..";
import { Store } from "./core";

export type Middleware<DispatchExt = any> = (store: Store<any>) => (next: (action: any) => any) => DispatchExt
export type StoreEnhancer<S = unknown,Ext = {}> = (next: StoreCreator<S, unknown>) => StoreCreator<S, Ext>
export type InferDispatchExtensionsFromMiddlewareArray<A extends readonly any[], Acc = {}> = [...A] extends [infer First, ...infer Rest] ? InferDispatchExtensionsFromMiddlewareArray<[...Rest], Acc & (First extends Middleware<infer M> ? M extends never ? {} : M : {})> : Acc