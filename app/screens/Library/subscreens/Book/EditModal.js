import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  Picker,
  Keyboard
} from 'react-native';
import { map } from 'lodash';
import Modal from 'react-native-modalbox';
import LabeledTextInput from '~/components/LabeledTextInput';
import * as database from '~/database';
import * as globalStyle from '~/style';

class EditModal extends Component {
  constructor(props) {
    super(props);

    const book = this.retrieveBook();

    this.state = {
      showButtons: true,
      pickerCategory: this.category,
      txtTitle: book.title,
      txtAuthors: book.author,
      numCurrentPage: book.currentPage.toString(),
      numTotalPages: book.totalPages.toString()
    };
  }

  retrieveBook() {
    const { books, category, volumeId } = this.props;
    const book = books[category][volumeId];
    return book;
  }

  componentDidMount() {
    this.props.refCallback(this.modal); // Redux connect messes with regular references
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
      () => this.setState({ showButtons: false }));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
      () => this.setState({ showButtons: true }));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  open() { this.modal.open() }
  close() { this.modal.close() }

  acceptChanges() {
    // 1. Apply book changes
    // 2. If category was changed, move book to category

    this.close();
  }

  render() {
    const book = this.retrieveBook();

    return(
      <Modal
        ref={ref => this.modal = ref}
        style={styles.window}
        entry={'top'}
        position={'top'}
        swipeToClose={false}
        coverScreen={true}>

        <ScrollView style={styles.formContainer}>
          <Picker
            selectedValue={this.state.pickerCategory}
            onValueChange={(value, index) => this.setState({ pickerCategory: value })}>
            { map(database.bookLists, x => <Picker.Item label={x} value={x} />) }
          </Picker>

          <LabeledTextInput
            label={'Title'}
            onChangeText={(txtTitle) => this.setState({ txtTitle })}
            value={this.state.txtTitle} />

          { // Generate fields for multiple authors
            map(this.state.txtAuthors, (value, index) => {
              return <LabeledTextInput
                label={'Author'}
                onChangeText={(t) => {
                  let authors = this.state.txtAuthors;
                  authors[index] = t;
                  this.setState({ txtAuthors: authors });
                }}
                key={value}
                value={value} />
            })
          }

          <LabeledTextInput
            label={'Current page'}
            keyboardType={'numeric'}
            onChangeText={(numCurrentPage) => this.setState({ numCurrentPage })}
            value={this.state.numCurrentPage} />

          <LabeledTextInput
            label={'Total pages'}
            keyboardType={'numeric'}
            onChangeText={(numTotalPages) => this.setState({ numTotalPages })}
            value={this.state.numTotalPages} />

        </ScrollView>

        {
          (this.state.showButtons) ?
            <View style={styles.btnContainer}>
              <Button
                title='Close'
                color={globalStyle.palette.PrimaryDefault}
                onPress={this.close.bind(this)} />
              <Button
                title='Accept'
                color={globalStyle.palette.PrimaryDefault}
                onPress={this.acceptChanges.bind(this)} />
            </View> : null
        }
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    justifyContent: 'flex-start',
    flex: 1
  },
  formContainer: {
    flex: 1,
    padding: 10
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    padding: 10
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.user.books
  };
};

EditModal = connect(mapStateToProps)(EditModal);

export default EditModal;

