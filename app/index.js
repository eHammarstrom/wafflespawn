import React, { Component } from 'react';

import LoggedOut from './layouts/LoggedOut';

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