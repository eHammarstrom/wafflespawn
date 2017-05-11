import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import LoggedOut from './layouts/LoggedOut';
import Home from './layouts/Home';

const config = {
  apiKey: "AIzaSyCUguMgijYKBQsdg842ojuk1OLXGe2wTkI",
  authDomain: "wafflespawn-deead.firebaseapp.com",
  databaseURL: "https://wafflespawn-deead.firebaseio.com",
  projectId: "wafflespawn-deead",
  storageBucket: "wafflespawn-deead.appspot.com",
  messagingSenderId: "432153624336"
};

firebase.initializeApp(config);

const App = StackNavigator({
  LoggedOut: { screen: LoggedOut },
  Home: { screen: Home }
});

export default App;