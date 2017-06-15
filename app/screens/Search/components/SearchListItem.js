import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as globalStyle from './../../../style';

class SearchListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let _bookId = this.props.data.id;
    let _image = null;
    let _title = null;
    let _authors = null;
    let _rating = null;

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
        <Text
          numberOfLines={1}
          style={styles.title}>
          {_titleData}
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

    let _ratingData = {
      averageRating: this.props.data.volumeInfo.averageRating,
      ratingsCount: this.props.data.volumeInfo.ratingsCount
    };
    if (_ratingData.averageRating && _ratingData.ratingsCount) {
      let _points = _ratingData.averageRating;
      let _stars = [];

      while (_points >= 1) {
        _stars.push(
          <Icon name='ios-star' style={styles.star} />
        );

        _points -= 1;
      }

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
            onPress={() =>
              this.props.showPicker({
                image: _imageData,
                industryIdentifiers: this.props.data.volumeInfo.industryIdentifiers,
                title: _titleData
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