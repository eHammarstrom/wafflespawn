import { values } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as utils from './../../../utilities';
import * as globalStyle from './../../../style';

class Book extends Component {
  constructor(props) {
    super(props);

    this.book = props.navigation.state.params.book;
    this.category = props.navigation.state.params.category;
    this.state = {};
  }

  render() {
    const {books} = this.props;
    let book = values(books[this.category])
      .filter(x => x.isbn === this.book.isbn)[0]; // hopefully unique isbn ;)

    console.log('book', book);

    return(
      <Text>Book: {this.book.isbn}, Category: {this.category}</Text>
    );
  }
};

styles = StyleSheet.create({

});

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.user.books
  };
}

Book = connect(mapStateToProps)(Book);

export default Book;