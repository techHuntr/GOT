import { combineReducers } from "@reduxjs/toolkit";
import startupReducer from "./reducers/startup";

const rootReducer = combineReducers({
  startUp: startupReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
