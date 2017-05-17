import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Search',
  };

  render() {
    return(
      <Text>This is the search tab</Text>
    );
  }
}

export default Search;