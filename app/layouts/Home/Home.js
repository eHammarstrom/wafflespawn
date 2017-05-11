import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const {state} = this.props.navigation;

    console.log(state)

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <Text style={styles.textTitle}>
          Welcome home,
        </Text>

        <Text style={styles.textName}>
          {state.params.email}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 28
  },
  textName: {
    fontSize: 16
  }
});

export default Home;