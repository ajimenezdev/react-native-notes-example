import { createStore } from "redux";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "./rootReducer";
import { V0CategoryMigration } from "./migrations";

const migrations = {
  0: state => V0CategoryMigration(state)
};

const persistConfig = {
  key: "root",
  version: 0,
  storage,
  migrate: createMigrate(migrations)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
