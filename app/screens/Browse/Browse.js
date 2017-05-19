import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as utils from './../../utilities';
import * as globalStyle from './../../style';

class Browse extends Component {
  constructor(props) {
    super(props);
    utils.throwLoginIfNotAuthed(this.props.navigation);

    this.state = {};
  }

  static navigationOptions = {
    title: 'Browse',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        style={globalStyle.icons.tabBarIcons}
        name='ios-albums' />
    )
  };

  render() {
    return(
      <Text>This is the browse tab</Text>
    );
  }
}

export default Browse;