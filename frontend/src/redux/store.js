import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice, bookingSliceReducer } from './slices/user'; // Assuming this is the correct path

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Add the slices you want to persist
};

const rootReducer = {
  auth: authSlice.reducer,
  booking: bookingSliceReducer.reducer,
  // Add other reducers as needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
