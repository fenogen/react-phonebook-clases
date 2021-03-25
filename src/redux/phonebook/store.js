import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { persistStore, persistReducer, } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'

// import logger from 'redux-logger';
// ----------------------> Применяем что бы не было ошибки в консоле
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { collectionReducer, filterReducer, loadingReducer } from './reducers';

// ----------------------- Подключение PERSIST (см.доки redux-persist):
// const persistConfig = {
//   key: 'contacts',
//   storage,
//   blacklist: ['filterValue']   //----> Сделали что бы filterValue не записывалось в LocalStorage
// }

// ----------------------> Применяем прослойку что бы не было ошибки в консоле (см.доки redux-persist)
const middlewareNew = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const rootReducer = combineReducers({
  contacts: collectionReducer,
  filterValue: filterReducer,
  loading: loadingReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewareNew,
});

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: middlewareNew,
// })

// const storeWithPersister = persistStore(store);
// export { store, storeWithPersister };

export { store };