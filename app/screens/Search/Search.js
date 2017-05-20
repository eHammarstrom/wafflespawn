import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ListView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from 'react-native-searchbar';
import SearchListItem from './SearchListItem';

import * as nav from './../../navigation';
import * as utils from './../../utilities';
import * as globalStyle from './../../style';

const styles = StyleSheet.create({
  headerSearchButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  headerSearchButtonIcon: {
    fontSize: 26,
    color: globalStyle.palette.PrimaryText
  },
  header: {
    flexDirection: 'row',
    backgroundColor: globalStyle.palette.PrimaryDefault,
  },
  headerTitle: {
    alignSelf: 'stretch',
    backgroundColor: globalStyle.palette.PrimaryDefault,
    marginLeft: 5,
    marginRight: 5
  }
});

class Search extends Component {
  constructor(props) {
    super(props);
    utils.throwLoginIfNotAuthed(this.props.navigation);

    this.state = { bookSearchList: [] }
  }

  componentWillMount() {
    this.props.navigation.dispatch(
      nav.setParams(
        {
          searchButton: this.searchButton,
          showSearch: false,
          showTabBar: true
        }, 'Search'));
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', () => {
      this.props.navigation.dispatch(
        nav.setParams({ showTabBar: true }, 'Search'));
    });

    Keyboard.addListener('keyboardDidShow', () => {
      this.props.navigation.dispatch(
        nav.setParams({ showTabBar: false }, 'Search'));
    });
  }

  searchButton(onClick) {
    return (
      <Icon.Button
        onPress={onClick}
        style={styles.headerSearchButton}
        iconStyle={styles.headerSearchButtonIcon}
        color={globalStyle.palette.PrimaryText}
        backgroundColor={globalStyle.palette.PrimaryLight}
        underlayColor={globalStyle.palette.Accent}
        name='ios-search'>
        Search
        </Icon.Button>
    )
  };

  static navigationOptions = ({ navigation }) => {
    let params = navigation.state.params;
    let _renderHeaderTitle = null;

    if (params && !params.showSearch) { // if not showing search, render search button
      _renderHeaderTitle = navigation.state.params.searchButton(
        () => navigation.dispatch(
          nav.setParams({ showSearch: true, showTabBar: false }, 'Search')));
    }

    let navOptions = {
      title: 'Search',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          style={globalStyle.icons.tabBarIcons}
          name='ios-search' />
      ),
      headerTitle: (
        <View style={styles.headerTitle}>
          {_renderHeaderTitle}
        </View>
      ),
      headerLeft: null,
      headerRight: null,
      headerStyle: styles.header
    };

    if (params && params.showSearch) // if we're showing search, remove header
      navOptions['header'] = null;

    if (params && !params.showTabBar) // hide tab bar
      navOptions['tabBarVisible'] = false;

    return navOptions;
  }

  booksSearch() {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    let _searchInput = this.searchInput;

    console.log('search query:', _searchInput);

    fetch(baseUrl + _searchInput)
      .then(res =>
        res.json().then(data => this.setState({ bookSearchList: data.items })))
      .catch(error => console.error(error));
  }

  setSearchInput(input) { this.searchInput = input }

  render() {
    let _nav = this.props.navigation;

    console.log(this.state.bookSearchList);

    let _initializeSearchBar = ( // initialize search bar
      <SearchBar
        backgroundColor={globalStyle.palette.PrimaryDefault}
        iconColor={globalStyle.palette.PrimaryLight}
        textColor={globalStyle.palette.PrimaryText}
        selectionColor={globalStyle.palette.Accent}
        placeholder='Title, Author, ISBN'

        onSubmitEditing={this.booksSearch.bind(this)}
        handleChangeText={this.setSearchInput.bind(this)}
        onBack={() => _nav.dispatch(
          nav.setParams({ showSearch: false, showTabBar: true }, 'Search'))}

        ref={ref => this.searchBar = ref}
        showOnLoad />
    );

    let _searchBar = null;

    if (_nav.state.params) { // if params is not null
      let _showSearch = _nav.state.params.showSearch; // and showSearch is true
      _searchBar = (_showSearch) ? _initializeSearchBar : null; // render searchBar
    }

    let _searchList = null;

    if (this.state.bookSearchList.length > 0) { // if we have a book search, render it
      _searchList = (
        <ListView
          dataSource={
            new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
              .cloneWithRows(this.state.bookSearchList)}
          renderRow={rowData => <SearchListItem data={rowData} />} />
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {_searchBar}
        {_searchList}
      </View>
    );
  }
}

export default Search;