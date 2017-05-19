import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as utils from './../../utilities';
import * as globalStyle from './../../style';

class Library extends Component {
  constructor(props) {
    super(props);
    utils.throwLoginIfNotAuthed(this.props.navigation);

    this.state = {};
  }

  static navigationOptions = {
    title: 'Library',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        style={globalStyle.icons.tabBarIcons}
        name='ios-book' />
    )
  };

  render() {
    return(
      <Text>This is the library tab</Text>
    );
  }
}

export default Library;