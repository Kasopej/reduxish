import { Action, Dispatch } from "../../types/core";
import { Middleware } from "../../types/helpers";

const loggerMiddleware: Middleware<Dispatch> = (store) => (next) => {
  return (action) => {
    const actionObject = action;
    console.log("before action", actionObject.type, store.getState());
    const state = next(actionObject);
    console.log("after action", actionObject.type, store.getState());
    return state;
  };
};

type ThunkAction<ReturnType, State, ExtraThunkArg, BasicAction extends Action> = (dispatch: ThunkDispatch<State, ExtraThunkArg, BasicAction>, getState: () => State, extraArgument: ExtraThunkArg) => ReturnType;
interface ThunkDispatch<State, ExtraThunkArg, BasicAction extends Action> {
    /** Accepts a thunk function, runs it, and returns whatever the thunk itself returns */
    <ReturnType>(thunkAction: ThunkAction<ReturnType, State, ExtraThunkArg, BasicAction>): ReturnType;
    /** Accepts a standard action object, and returns that action object */
    <Action extends BasicAction>(action: Action): Action;
    /** A union of the other two overloads for TS inference purposes */
    <ReturnType, Action extends BasicAction>(action: Action | ThunkAction<ReturnType, State, ExtraThunkArg, BasicAction>): Action | ReturnType;
}
const resolveMiddleware: Middleware<ThunkAction<any, any, undefined, Action>> = (store) => (next) => {
  return (action) => {
    if (action instanceof Promise) {
      return action.then(next);
    }
    return next(action);
  };
};