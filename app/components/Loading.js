import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

class Loading extends Component {
  render() {
    return(
      <View style={styles.loadView}>
        <ActivityIndicator
          style={styles.loadingIndicator}
          color='blue' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  loadingIndicator: {}
});

export default Loading;