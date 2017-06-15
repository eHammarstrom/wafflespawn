import { values } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  BackHandler,
  View,
  TouchableHighlight,
  FlatList,
  Image
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
    const { books } = this.props;
    let _categoryBooks = values(books[this.category]);

    console.log(_categoryBooks);

    let _keyExtractor = (item, index) => item.isbn;

    return (
      <FlatList
        style={{ flex: 1, backgroundColor: 'white' }}
        data={_categoryBooks}
        keyExtractor={_keyExtractor}
        renderItem={({ item }) =>
          <BooksItem
            navigate={this.navigate.bind(this)}
            key={item.isbn}
            data={item} />}
      />
    );
  }
};

class BooksItem extends Component {
  render() {
    let _image = null;

    if (this.props.data.image) {
      _image = (
        <Image
          style={styles.thumbnail}
          source={{ uri: this.props.data.image }} />
      );
    }

    return (
      <TouchableHighlight
        underlayColor={globalStyle.palette.Accent}
        onLongPress={null}
        onPress={() => this.props.navigate(this.props.data)}>
        <View style={styles.row}>
          <View style={styles.left}>
            {_image}
          </View>
          <View>
            <Text>{this.props.data.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
});

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.user.books
  };
}

Books = connect(mapStateToProps)(Books);

export default Books;