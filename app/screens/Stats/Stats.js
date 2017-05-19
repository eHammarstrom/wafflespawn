import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as utils from './../../utilities';
import * as globalStyle from './../../style';

class Stats extends Component {
  constructor(props) {
    super(props);
    utils.throwLoginIfNotAuthed(this.props.navigation);

    this.state = {};
  }

  static navigationOptions = {
    title: 'Stats',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        style={globalStyle.icons.tabBarIcons}
        name='ios-stats' />
    )
  };

  render() {
    return(
      <Text>This is the stats tab</Text>
    );
  }
}

export default Stats;