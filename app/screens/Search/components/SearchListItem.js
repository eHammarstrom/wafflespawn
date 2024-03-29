import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as utilities from './../../../utilities';
import * as globalStyle from './../../../style';

class SearchListItem extends Component {
  render() {
    const { index, item } = this.props.data;

    let _bookId = item.id;
    let _image = null;
    let _title = null;
    let _authors = null;
    let _rating = null;

    let _imageData = item.volumeInfo.imageLinks;
    if (_imageData) { // if image exists, create image component
      _image = (
        <Image
          style={styles.thumbnail}
          source={{ uri: _imageData.smallThumbnail }} />
      );
    }

    let _titleData = item.volumeInfo.title;
    if (_titleData) { // if title exists, create title component
      _title = (
        <Text
          numberOfLines={1}
          style={styles.title}>
          {_titleData}
        </Text>
      );
    }

    let _authorsData = item.volumeInfo.authors;
    if (_authorsData) { // if authors exists, create author component
      _authors = (
        <Text style={styles.author}>
          { utilities.book.formatAuthors(_authorsData) }
        </Text>
      );
    }

    let _ratingData = {
      averageRating: item.volumeInfo.averageRating,
      ratingsCount: item.volumeInfo.ratingsCount
    };

    /**
     * if rating system below does not suffice, apply machine learning.
     */
    if (_ratingData.averageRating && _ratingData.ratingsCount) {
      let _points = _ratingData.averageRating;
      let _stars = [];

      // while we have whole ratings, push star components
      while (_points >= 1) {
        _stars.push(
          <Icon name='ios-star' style={styles.star} />
        );

        _points -= 1;
      }

      // if we have a half-ish rating, push a half-star component
      _points -= 1;
      if (_points >= -0.5 && _points < 0) {
        _stars.push(
          <Icon name='ios-star-half' style={styles.star} />
        );
      }

      _rating = (
        <View style={styles.stars}>
          {_stars.map(c => c)}
        </View>
      );
    }

    return(
      <View shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} style={styles.row}>
        <View style={styles.left}>
          {_image}
        </View>
        <View style={styles.middle}>
          {_title}
          {_authors}
          {_rating}
        </View>
        <View style={styles.right}>
          <TouchableHighlight
            onLongPress={null}
            onPress={() => // propagates back to Search.js to set showPicker state
              this.props.showPicker({
                image: _imageData,
                industryIdentifiers: item.volumeInfo.industryIdentifiers,
                title: _titleData,
                author: _authorsData,
                pages: item.volumeInfo.pageCount,
                volumeId: item.id
              })}
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
    height: 75,
    borderBottomWidth: 1,
    borderColor: globalStyle.palette.Divider
  },
  left: {
    width: 75,
    justifyContent: 'center'
  },
  thumbnail: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    borderRadius: 25
  },
  middle: {
    flex: 2
  },
  title: {
    margin: 2,
    marginTop: 8,
    paddingLeft: 2,
    fontSize: 16,
    color: globalStyle.palette.DefaultText
  },
  author: {
    margin: 2,
    paddingLeft: 2,
    fontStyle: 'italic',
    fontSize: 12
  },
  stars: {
    flexDirection: 'row'
  },
  star: {
    paddingLeft: 2,
    color: globalStyle.palette.Accent
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
