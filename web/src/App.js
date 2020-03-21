import React from 'react';
import { persistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

// import your routes here
import Routes from './routes';
import history from './services/history';
// store has to be after reactotron config
import { store, persistor } from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <persistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
        </Router>
      </persistGate>
    </Provider>
  );
}

export default App;
