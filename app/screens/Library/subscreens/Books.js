import { values, capitalize, lowerCase, sortBy, reverse } from 'lodash';
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
import HeaderButtonRight from './../../components/HeaderButtonRight';
import FilterModal from './Books/FilterModal';
import * as utilities from './../../../utilities';
import * as globalStyle from './../../../style';

class Books extends Component {
  constructor(props) {
    super(props);
    this.category = props.navigation.state.params.category;

    props.navigation.setParams(
      { headerButtonRightOnClick: this.showFilterModal.bind(this) });

    this.state =  {
      filterModalOpen: false,
      filterProperty: 'Title',
      filterOrder: 'Descending'
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: capitalize(lowerCase(navigation.state.params.category)),
    headerRight: <HeaderButtonRight navigation={navigation} iconName={'filter-list'} />
  });

  showFilterModal() {
    if (this.state.filterModalOpen)
      this.filterModal.close();
    else
      this.filterModal.open();
  }

  navigate(book) {
    this.props.navigation
      .navigate('Book', { book, category: this.category });
  }

  filterBy(property, order, list) {
    console.log('Books list', list);
    switch (property) {
      case 'Title':
        list = sortBy(list, 'title');
        break;
      case 'Author':
        let indexedAuthor = list.map((x, i) => {
          let splitAuthor = x.author[0].split(' ');
          let authorSurname = splitAuthor[splitAuthor.length - 1];

          return {
            index: i,
            author: authorSurname
          };
        });

        indexedAuthor = sortBy(indexedAuthor, 'author');

        list = indexedAuthor.map(x => list[x.index]);
        break;
      case 'Progress':
        list = sortBy(list, 'progress');
        break;
    }

    if (order === 'Ascending')
      list = reverse(list);

    return list;
  }

  render() {
    const { books } = this.props;
    const { filterProperty, filterOrder } = this.state;

    let _categoryBooks = values(books[this.category]);
    _categoryBooks = this.filterBy(filterProperty, filterOrder, _categoryBooks);

    let _keyExtractor = (item, index) => item.isbn;

    return (
      <View style={{ flex: 1 }}>
        <FilterModal
          setModalState={
            ((b) => this.setState({ filterModalOpen: b })).bind(this)
          }
          setFilterState={
            ((filterProperty, filterOrder) => this.setState({
              filterProperty,
              filterOrder
            })).bind(this)
          }
          ref={ref => this.filterModal = ref} />
        <FlatList
          style={{ flex: 1, backgroundColor: 'white' }}
          data={_categoryBooks}
          keyExtractor={_keyExtractor}
          renderItem={({ item }) => (
            <BooksItem
              navigate={this.navigate.bind(this)}
              key={item.isbn}
              category={this.category}
              data={item} />)}
          />
      </View>
    );
  }
};

class BooksItem extends Component {
  render() {
    const {
      image,
      title,
      author,
      totalPages,
      progress
    } = this.props.data;

    let _image = null;
    let _progress = progress.toString() + '%';

    if (image) {
      _image = (
        <Image
          style={styles.thumbnail}
          source={{ uri: image }} />
      );
    }

    return (
      <TouchableHighlight
        underlayColor={globalStyle.palette.Accent}
        onLongPress={null}
        onPress={() => this.props.navigate(this.props.data)}>
        <View style={styles.row}>
          <View style={StyleSheet.flatten([styles.progress, _progress])} />
          <View style={styles.left}>
            {_image}
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{utilities.book.formatAuthors(author)}</Text>
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
  progress: {
    position: 'absolute',
    backgroundColor: 'rgba(0,255,0,0.2)',
    height: '100%',
    width: 0
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
  title: {
    margin: 2,
    marginTop: 8,
    paddingLeft: 2,
    fontSize: 16,
    color: globalStyle.palette.DefaultText
  },
  author: {
    margin: 2,
    paddingLeft: 2,
    fontStyle: 'italic',
    fontSize: 12
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.user.books
  };
};

Books = connect(mapStateToProps)(Books);

export default Books;
