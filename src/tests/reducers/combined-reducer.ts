import { combineReducers } from "../../helpers";

const combinedReducer = combineReducers({
      a: (state: number = 0) => state + 1,
      b: (state: string = 'x') => state + 'y',
    })

export default combinedReducer