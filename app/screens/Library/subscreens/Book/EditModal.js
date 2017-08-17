import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modalbox';
import * as globalStyle from '~/style';

const log = (msg) => console.log('EditModal:', msg);

class EditModal extends Component {
  open() { this.modal.open(); }

  render() {
    const { currentPage, totalPages } = this.props;

    return(
      <Modal
        ref={ref => this.modal = ref}
        style={styles.window}
        onOpened={() => log('opened')}
        coverScreen={true}
      >
        <Text>Hello world!</Text>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    justifyContent: 'flex-start',
    borderRadius: 0
  }
});

export default EditModal;

