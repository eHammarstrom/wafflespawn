import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

const globalStyle = require('./../../style');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { user: firebase.auth().currentUser };
  }

  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        style={globalStyle.icons.tabBarIcons}
        name='ios-home' />
    )
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <Text style={styles.textTitle}>
          Welcome home,
        </Text>

        <Text style={styles.textName}>
          {this.state.user.displayName}
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
    fontSize: 20,
    fontStyle: 'italic'
  }
});

export default Home;