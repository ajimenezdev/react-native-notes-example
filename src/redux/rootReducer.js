import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import categoriesReducer from "./categoriesReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  notes: notesReducer,
  categories: categoriesReducer,
  settings: settingsReducer
});

export default rootReducer;
