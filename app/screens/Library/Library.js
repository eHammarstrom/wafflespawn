import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View
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
    const {books} = this.props;

    let countKeys = (list) => Object.keys(list).length;

    return(
      <View>
        <Text>This is the library tab</Text>
        <Text>ToRead: {countKeys(books['to-read'])}</Text>
        <Text>reading: {countKeys(books['reading'])}</Text>
        <Text>finished: {countKeys(books['finished'])}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.user.books
  };
}

Library = connect(mapStateToProps)(Library);

export default Library;