import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as globalStyle from './../../style';

class SearchListItem extends Component {
  constructor(props) {
    super(props);
  }

  addBookPress(book) {
    console.log('i want to add:', book);
  }

  render() {
    let _image = null;
    let _title = null;
    let _authors = null;

    let _imageData = this.props.data.volumeInfo.imageLinks;
    if (_imageData) {
      _image = (
        <Image
          style={styles.thumbnail}
          source={{ uri: _imageData.smallThumbnail }} />
      );
    }

    let _titleData = this.props.data.volumeInfo.title;
    if (_titleData) {
      _title = (
        <Text style={styles.title}>
          {
            (_titleData.length > 24) ?
              this.props.data.volumeInfo.title.slice(0, 24) + '...'
              :
              this.props.data.volumeInfo.title
          }
        </Text>
      );
    }

    let _authorsData = this.props.data.volumeInfo.authors;
    if (_authorsData) {
      _authors = (
        <Text style={styles.author}>
          {
            (_authorsData.length > 2) ?
              _authorsData[0] + ' et al.'
              :
              _authorsData.join(', ')
          }
        </Text>
      );
    }

    return(
      <View style={styles.row}>
        <View style={styles.left}>
          {_image}
        </View>
        <View style={styles.middle}>
          {_title}
          {_authors}
        </View>
        <View style={styles.right}>
          <TouchableHighlight
            onPress={this.addBookPress}
            underlayColor={globalStyle.palette.Accent}
            style={styles.addButton}>
            <Icon
              name='ios-add'
              style={styles.addButtonIcon}
              color={globalStyle.palette.SecondaryText} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    height: 75
  },
  left: {
    width: 75
  },
  thumbnail: {
    height: 75,
    width: 75
  },
  middle: {
    flex: 2,
  },
  title: {
    margin: 2,
    paddingLeft: 2,
    fontSize: 14
  },
  author: {
    margin: 2,
    paddingLeft: 6,
    fontStyle: 'italic',
    fontSize: 12
  },
  description: { },
  right: {
    flex: 1,
    justifyContent: 'center'
  },
  addButton: {
    alignSelf: 'center',
    width: 36,
    height: 36,
    borderRadius: 18
  },
  addButtonIcon: {
    alignSelf: 'center',
    fontSize: 36,
  }
});

export default SearchListItem;