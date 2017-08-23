import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import * as utilities from '~/utilities';
import * as globalStyle from '~/style';
import * as actions from '~/actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { user: firebase.auth().currentUser };

    // subscribe to authstate & reset to loginscreen if auth lost
    utilities.throwLoginIfNotAuthed(this.props.navigation);
    // subscribe redux to user books after login (Home)
    utilities.subscribeToUserBooks(this.props.store);
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
          {(this.state.user) ? this.state.user.displayName : 'Anonymous'}
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
