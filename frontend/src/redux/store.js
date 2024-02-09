import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice, bookingSliceReducer } from './slices/user'; // Assuming this is the correct path

const persistConfig = {
  key: 'root',
  storage,
version :1,
};

const reducer = combineReducers({
  auth: authSlice.reducer,
  booking: bookingSliceReducer.reducer,
})


const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
