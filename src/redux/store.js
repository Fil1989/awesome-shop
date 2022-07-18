import {
  configureStore,
combineReducers } from '@reduxjs/toolkit';
import {
  appCurrency,
  cart
} from './reducers';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({ appCurrency, cart });

const persistConfig = {
  key: 'amazing-shop', //localStorage.set('token',...)
  storage: storage,
};
const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;

export const persistor = persistStore(store);