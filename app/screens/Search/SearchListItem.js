import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import * as globalStyle from './../../style';

class SearchListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let _image = null;

    if (this.props.data.volumeInfo.imageLinks)
      _image = <Image
        style={{ height: 50, width: 50 }}
        source={{ uri: this.props.data.volumeInfo.imageLinks.smallThumbnail }} />

    return(
      <View>
        {_image}
        <Text style={{ color: 'black' }}>
          {this.props.data.volumeInfo.title}
        </Text>
      </View>
    );
  }
}

export default SearchListItem;