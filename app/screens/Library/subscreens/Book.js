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
import * as utils from './../../../utilities';
import * as globalStyle from './../../../style';
import Loading from './../../../components/Loading';
import EditModal from './Book/EditModal';
import ProgressPicker from './Book/ProgressPicker';
import ProgressBar from './Book/ProgressBar';
import HeaderButtonRight from './../../components/HeaderButtonRight';

const log = (msg) => console.log('Book Screen:', msg);

class Book extends Component {
  constructor(props) {
    super(props);

    this.volumeId = props.navigation.state.params.book.volumeId;
    this.category = props.navigation.state.params.category;

    this.state = { gBook: null };

    props.navigation.setParams(
      { headerButtonRightOnClick: this.showEditModal.bind(this) });
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.book.title,
    headerRight: <HeaderButtonRight navigation={navigation} iconName={'edit'} />
  });

  componentWillMount() { this.retrieveBook(); }

  retrieveBook() {
    const _baseUrl = 'https://www.googleapis.com/books/v1/volumes/';

    fetch(_baseUrl + this.volumeId)
      .then(res =>
        res.json().then(data => this.setState({ gBook: data })))
      .catch(error => console.error(error)); // TODO: Handle error, maybe alert
  }

  showEditModal() { this.editModal.open(); }
  showProgressPicker() { this.progressPicker.open(); }

  render() {
    if (!this.state.gBook) return <Loading />;
    const { books, navigation } = this.props;
    const book = this.props.books[this.category][this.volumeId];

    let _image = null;

    const {
      description,
      authors
    } = this.state.gBook.volumeInfo;

    if (book.image) {
      _image = (
        <Image
          style={styles.thumbnail}
          source={{ uri: book.image }} />
      );
    }

    return(
      <ScrollView style={{ flex: 1, backgroundColor: 'white', overflow: 'visible' }}>
        {_image}
        <ProgressBar
          showProgressPicker={this.showProgressPicker.bind(this)}
          totalPages={book.totalPages}
          currentPage={book.currentPage | 0} />
        <Text style={styles.authors}>{authors}</Text>
        <ProgressPicker
          ref={ref => this.progressPicker = ref}
          category={this.category}
          volumeId={this.volumeId}
          totalPages={book.totalPages}
          currentPage={book.currentPage}
        />
        <EditModal
          ref={ref => this.editModal = ref}
          totalPages={book.totalPages}
          currentPage={book.currentPage | 0} />
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
    borderRadius: 50,
    marginTop: 10
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
