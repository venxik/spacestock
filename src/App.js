import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './screens/Routes';
import RootReducers from './redux/';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(RootReducers, applyMiddleware(thunk));

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
