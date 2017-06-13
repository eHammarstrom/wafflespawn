import { values } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  BackHandler,
  Button,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as utils from './../../../utilities';
import * as globalStyle from './../../../style';

class Books extends Component {
  constructor(props) {
    super(props);

    console.log('books', props);

    this.category = props.navigation.state.params.category;
    this.state = {};
  }

  navigate(book) {
    this.props.navigation
      .navigate('Book', { book, category: this.category });
  }

  render() {
    const {books} = this.props;
    let categoryBooks = values(books[this.category]);

    console.log('categoryBooks', categoryBooks);

    return(
      <View>
        <Text>Books, category: {this.category}</Text>
        <Button
          title={categoryBooks[0].isbn}
          onPress={() => this.navigate(categoryBooks[0])} />
      </View>
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

Books = connect(mapStateToProps)(Books);

export default Books;