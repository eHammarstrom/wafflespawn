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
  addPress(listType) {
    let _industryId = this.props.data.industryIdentifiers;
    let _isbn;
    let _image = this.retrieveImageUrl(this.props.data.image);
    let _title = this.props.data.title;

    if (_industryId[0]) {
      _isbn = this.props.data.industryIdentifiers[0].identifier;
    } else {
      throw Error('No isbn found on book.');
    }

    database.addBookToList(_isbn, _title, _image, listType);
  }

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

  render() {
    let _image = null;
    let _source = this.retrieveImageUrl(this.props.data.image);

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

        <TouchableHighlight
          style={styles.button}
          underlayColor={globalStyle.palette.Accent}
          onLongPress={null}
          onPress={() => this.addPress(database.bookLists.toRead)}>
          <Text style={styles.buttonText}>
            Add to To Read
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor={globalStyle.palette.Accent}
          onLongPress={null}
          onPress={() => this.addPress(database.bookLists.reading)}>
          <Text style={styles.buttonText}>
            Add to Reading
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor={globalStyle.palette.Accent}
          onLongPress={null}
          onPress={() => this.addPress(database.bookLists.finished)}>
          <Text style={styles.buttonText}>
            Add to Finished
          </Text>
        </TouchableHighlight>

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