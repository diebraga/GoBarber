import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

// function will persist the authentication
export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'root',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );

  return persistedReducer;
};
