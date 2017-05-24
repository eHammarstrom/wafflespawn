import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text
} from 'react-native';
import Modal from 'react-native-modalbox';

import * as globalStyle from './../../../style';

class LibraryPicker extends Component {
  render() {
    console.log('picker rendering');

    let _image;

    if (this.props.data.image) {
      _image = <Image
        style={styles.thumbnail}
        source={{ uri: this.props.data.image.smallThumbnail }} />
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

        {_image}

        <TouchableHighlight
          style={styles.button}
          underlayColor={globalStyle.palette.Accent}
          onPress={() => console.log('To read')}>
          <Text style={styles.buttonText}>
            TO READ
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor={globalStyle.palette.Accent}
          onPress={() => console.log('Reading')}>
          <Text style={styles.buttonText}>
            READING
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor={globalStyle.palette.Accent}
          onPress={() => console.log('Finished')}>
          <Text style={styles.buttonText}>
            FINISHED
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
  thumbnail: {
    alignSelf: 'center',
    width: 100,
    height: 150,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 2
  },
  button: {
    justifyContent: 'center',
    height: 45,
    borderRadius: 0,
    borderTopWidth: 1,
    borderTopColor: globalStyle.palette.Divider,
    backgroundColor: globalStyle.palette.PrimaryDefault
  },
  buttonText: {
    alignSelf: 'center',
    color: globalStyle.palette.PrimaryText,
    fontSize: 16
  },
  buttonBottom: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  }
});

export default LibraryPicker;