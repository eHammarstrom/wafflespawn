import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ListView,
  Platform
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from 'react-native-searchbar';
import SearchListItem from './components/SearchListItem';
import LibraryPicker from './components/LibraryPicker';

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

    this.state = {
      bookSearchList: [],
      showPicker: false,
      pickerData: null
    };
  }

  componentWillMount() { }

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', () => {
      this.props.navigation.dispatch(
        nav.setParams({ showTabBar: true }, 'Search'));
    });

    Keyboard.addListener('keyboardDidShow', () => {
      this.props.navigation.dispatch(
        nav.setParams({ showTabBar: false }, 'Search'));
    });

    this.props.navigation.dispatch(
      nav.setParams(
        {
          searchButton: this.searchButton,
          showSearch: false,
          showTabBar: true
        }, 'Search'));
  }

  showPicker(image, industryIdentifiers) { // industryIdentifiers = isbn-13 and isbn-10
    this.setState({
      showPicker: true,
      pickerData: {
        image,
        industryIdentifiers
      }
    });
  }

  hidePicker() { this.setState({ showPicker: false, pickerData: null }) }

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
    let _params = navigation.state.params;
    let _renderHeaderTitle = null;

    if (_params && !_params.showSearch) { // if not showing search, render search button
      _renderHeaderTitle = _params.searchButton(
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

    if (_params && _params.showSearch) // if we're showing search, remove header
      navOptions['header'] = null;

    if (_params && !_params.showTabBar) // hide tab bar
      navOptions['tabBarVisible'] = false;

    return navOptions;
  }

  booksSearch() {
    const _baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    let _searchInput = this.searchInput; // lock search param

    fetch(_baseUrl + _searchInput)
      .then(res =>
        res.json().then(data => this.setState({ bookSearchList: data.items })))
      .catch(error => console.error(error)); // TODO: Handle search error, maybe alert
  }

  setSearchInput(input) { this.searchInput = input }

  onBackSearchButton() {
    this.searchBar.hide();

    this.once = false;

    this.props.navigation.dispatch(
      nav.setParams({ showSearch: false, showTabBar: true }, 'Search'));
  }

  render() {
    let _nav = this.props.navigation;
    let _heightFix = false;

    if (_nav.state.params && _nav.state.params.showSearch)
      _heightFix = true;

    /* introduces impurity to the render function ... works for now */
    if (this.searchBar) {
      if (_nav.state.params && _nav.state.params.showSearch && !this.once) {
        this.once = true;
        this.searchBar.show();
      }
    }

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SearchBar
            backgroundColor={globalStyle.palette.PrimaryDefault}
            iconColor={globalStyle.palette.PrimaryLight}
            textColor={globalStyle.palette.PrimaryText}
            selectionColor={globalStyle.palette.Accent}
            placeholder='Title, Author, ISBN'
            animate={false}

            onSubmitEditing={this.booksSearch.bind(this)}
            handleChangeText={this.setSearchInput.bind(this)}
            onBack={this.onBackSearchButton.bind(this)}
            ref={ref => this.searchBar = ref} />
        
        {(_heightFix) ? <View style={{ height: (Platform.OS === 'ios') ? 52 : 62}} /> : null}

        {(this.state.showPicker) ?
          <LibraryPicker
            hidePicker={this.hidePicker.bind(this)}
            data={this.state.pickerData} /> : null}

        <ListView
          enableEmptySections={true}
          dataSource={
            new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
              .cloneWithRows(this.state.bookSearchList)}
          renderRow={rowData =>
            <SearchListItem
              hidePicker={this.hidePicker.bind(this)}
              showPicker={this.showPicker.bind(this)}
              data={rowData} />} />
      </View>
    );
  }
}

export default Search;