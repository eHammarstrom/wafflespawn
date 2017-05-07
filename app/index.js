import React, { Component } from 'react';
import * as firebase from 'firebase';

import LoggedOut from './layouts/LoggedOut';

const config = {
  apiKey: "AIzaSyCUguMgijYKBQsdg842ojuk1OLXGe2wTkI",
  authDomain: "wafflespawn-deead.firebaseapp.com",
  databaseURL: "https://wafflespawn-deead.firebaseio.com",
  projectId: "wafflespawn-deead",
  storageBucket: "wafflespawn-deead.appspot.com",
  messagingSenderId: "432153624336"
};

firebase.initializeApp(config);

class App extends Component {
  render() {
    /*
    if (isConnected && loggedIn)
        return LoggedIn;
    else if (isConnected)
        return LoggedOut;
    else
        return NoConnection;
    */

    return <LoggedOut />;
  }
}

export default App;