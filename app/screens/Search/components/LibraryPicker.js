import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Ionicons';

import * as database from './../../../database';
import * as globalStyle from './../../../style';

class LibraryPicker extends Component {
  /**
   * Extracts book data and requests to add book to DB
   */
  addPress(listType) {
    const { data } = this.props;

    let _industryId = data.industryIdentifiers;
    let _isbn;
    let _image = this.retrieveImageUrl(data.image);
    let _title = data.title;
    let _totalPages = data.pages;

    if (_industryId[0]) {
      _isbn = data.industryIdentifiers[0].identifier;
    } else {
      throw Error('No isbn found on book.');
    }

    database.addBookToList({
      volumeId: data.volumeId,
      isbn: _isbn,
      title: _title,
      imageUrl: _image,
      totalPages: _totalPages
    }, listType);
  }

  /**
   *
   * Extracts an image, if any, with highest quality from book object
   */
  retrieveImageUrl(imageData) {
    let _source = null;

    if (imageData) {
      if (imageData.large)
        _source = imageData.large;
      else if (imageData.thumbnail)
        _source = imageData.thumbnail;
      else if (imageData.smallThumbnail)
        _source = imageData.smallThumbnail;
    }

    return _source;
  }

  createCategoryOption(category) {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={globalStyle.palette.Accent}
        onLongPress={null}
        onPress={() => this.addPress(category)}>
        <Text style={styles.buttonText}>
          {category}
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    const { data } = this.props;

    let _image = null;
    let _source = this.retrieveImageUrl(data.image);

    if (_source) {
      _image = <Image
        style={styles.thumbnail}
        source={{ uri: _source }} />;
    }

    return (
      <Modal
        ref={ref => this.picker = ref}
        style={styles.pickerWindow}
        onClosed={() => this.props.hidePicker()}
        onOpened={() => console.log('openedModal')}
        isDisabled={false}
        isOpen={true}
        position={'center'}>

        <View style={styles.header}>
          {_image}
        </View>

        {/* Spawns option buttons for every category */}
        {Object.entries(database.bookLists).map((x) => this.createCategoryOption(x[1]))}

      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  pickerWindow: {
    justifyContent: 'flex-start',
    height: 'auto',
    width: 250,
    borderRadius: 0
  },
  header: {
    justifyContent: 'center',
    height: 130,
    backgroundColor: globalStyle.palette.PrimaryDefault
  },
  thumbnail: {
    alignSelf: 'center',
    height: 115,
    width: 75,
    borderRadius: 1,
  },
  headerTitle: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: globalStyle.palette.PrimaryText
  },
  button: {
    justifyContent: 'center',
    height: 45,
    borderRadius: 0,
    borderTopWidth: 1,
    borderTopColor: globalStyle.palette.Divider,
    backgroundColor: globalStyle.palette.PrimaryText
  },
  buttonText: {
    alignSelf: 'center',
    color: globalStyle.palette.SecondaryText,
    fontSize: 16
  },
  buttonBottom: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  }
});

export default LibraryPicker;
