import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import hoist from 'hoist-non-react-statics';
import * as firebase from 'firebase';

import reducer from './reducers';

import Login from './screens/Login';

import Home from './screens/Home';
import Browse from './screens/Browse';
import Search from './screens/Search';
import Stats from './screens/Stats';
import LibraryNavigator from './screens/Library/LibraryNavigator';

import * as globalStyle from './style';

const config = {
  apiKey: "AIzaSyCUguMgijYKBQsdg842ojuk1OLXGe2wTkI",
  authDomain: "wafflespawn-deead.firebaseapp.com",
  databaseURL: "https://wafflespawn-deead.firebaseio.com",
  projectId: "wafflespawn-deead",
  storageBucket: "wafflespawn-deead.appspot.com",
  messagingSenderId: "432153624336"
};

firebase.initializeApp(config);

/**
 * DEBUG
 */
import devToolsEnhancer from 'remote-redux-devtools'; // dev debug
  // debugger can be accessed here: http://remotedev.io/local/

const store = createStore(
  reducer,
  devToolsEnhancer({
    name: 'React-Native App - Wafflespawn',
    realtime: true,
    suppressConnectErrors: false
  })
);

store.subscribe(() => console.log(store.getState())); // state logging
/**
 * END DEBUG
 */


const MainApp = TabNavigator({
  Home: {
    screen: hoist(props => <Home {...props} store={store} />, Home)
  },
  Browse: {
    screen: hoist(props => <Browse {...props} store={store} />, Browse)
  },
  Search: {
    screen: hoist(props => <Search {...props} store={store} />, Search)
  },
  Stats: {
    screen: hoist(props => <Stats {...props} store={store} />, Stats)
  },
  Library: {
    screen: LibraryNavigator(store)
  }
}, {
  initialRouteName: 'Home',
  swipeEnabled: false,
  tabBarOptions: {
    inactiveTintColor: globalStyle.palette.PrimaryText,
    pressColor: globalStyle.palette.Accent,
    showIcon: true,
    showLabel: true,
    indicatorStyle: {
      backgroundColor: globalStyle.palette.Accent
    },
    labelStyle: {
      fontSize: 9,
      margin: 0
    },
    style: {
      backgroundColor: globalStyle.palette.PrimaryDefault
    }
  },
  tabBarPosition: 'bottom',
  lazy: true
});

const App = StackNavigator({
  Login: { screen: Login },
  MainApp: { screen: MainApp }
});

const ProvidedApp = () => (
  <Provider store={store}>
    <App screenProps={store} />
  </Provider>
);

export default App;