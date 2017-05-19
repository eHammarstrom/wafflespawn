import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import Login from './screens/Login';

import Home from './screens/Home';
import Browse from './screens/Browse';
import Search from './screens/Search';
import Stats from './screens/Stats';
import Library from './screens/Library';

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

const MainApp = TabNavigator({
  Home: { screen: Home },
  Browse: { screen: Browse },
  Search: { screen: Search },
  Stats: { screen: Stats },
  Library: { screen: Library }
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

export default App;