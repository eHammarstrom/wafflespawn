import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as utils from './../../../utilities';
import * as globalStyle from './../../../style';

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return(
      <Text>Book</Text>
    );
  }
};

styles = StyleSheet.create({

});

export default Book;