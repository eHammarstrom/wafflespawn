import React, { Component } from 'react';
import { View, Image } from 'react-native';

const logo = require('../../images/logo.png');

class LoggedOut extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'powderblue' }}>
          <Image
            source={logo}
            style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
        </View>
        <View style={{ flex: 3, backgroundColor: 'skyblue' }} />
      </View>
    );
  }
}

export default LoggedOut;