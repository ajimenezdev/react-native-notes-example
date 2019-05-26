import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
  notes: notesReducer,
  categories: categoriesReducer
});

export default rootReducer;
