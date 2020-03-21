import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// function will persist the authentication
export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'root',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
