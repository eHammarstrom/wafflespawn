import { values } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  BackHandler,
  Image,
  View,
  ScrollView
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/Ionicons';
import * as utils from './../../../utilities';
import * as globalStyle from './../../../style';
import Loading from './../../../components/Loading';
import ProgressModal from './Book/ProgressModal';
import ProgressBar from './Book/ProgressBar';

class Book extends Component {
  constructor(props) {
    super(props);

    this.volumeId = props.navigation.state.params.book.volumeId;
    this.category = props.navigation.state.params.category;

    this.book = this.props.books[this.category][this.volumeId];

    this.state = { gBook: null };

    this.retrieveBook();
  }

  retrieveBook() {
    const { volumeId } = this.book;

    const _baseUrl = 'https://www.googleapis.com/books/v1/volumes/';

    fetch(_baseUrl + volumeId)
      .then(res =>
        res.json().then(data => this.setState({ gBook: data })))
      .catch(error => console.error(error)); // TODO: Handle error, maybe alert
  }

  showProgressModal() {
    this.progressModal.open();
  }

  render() {
    if (!this.state.gBook) return <Loading />;

    let _image = null;

    const {books} = this.props;
    let book = values(books[this.category])
      .filter(x => x.isbn === this.book.isbn)[0]; // hopefully unique isbn 😜

    console.log('book', book);

    const {
      title,
      image
    } = this.book;

    const {
      description,
      authors
    } = this.state.gBook.volumeInfo;

    if (image) {
      _image = (
        <Image
          style={styles.thumbnail}
          source={{ uri: image }} />
      );
    }

    return(
      <ScrollView style={{ flex: 1, backgroundColor: 'white', overflow: 'visible' }}>
        <Text style={styles.title}>{title}</Text>
        {_image}
        <Text style={styles.authors}>{authors}</Text>
        <ProgressModal
          ref={ref => this.progressModal = ref}
          totalPages={this.book.totalPages}
          currentPage={this.book.currentPage | 0} />
        <ProgressBar
          showProgressModal={this.showProgressModal.bind(this)}
          category={this.category}
          volumeId={this.volumeId}
          totalPages={this.book.totalPages}
          currentPage={this.book.currentPage | 0} />
        <HTMLView
          value={description}
          style={styles.description}
          stylesheet={null} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  thumbnail: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50
  },
  title: {
    fontSize: 26,
    fontStyle: 'italic',
    color: globalStyle.palette.DefaultText,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10
  },
  description: {
    alignSelf: 'center',
    padding: 40,
    paddingTop: 20
  },
  authors: {
    fontSize: 16,
    fontStyle: 'italic',
    alignSelf: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.user.books
  };
};

Book = connect(mapStateToProps)(Book);

export default Book;
