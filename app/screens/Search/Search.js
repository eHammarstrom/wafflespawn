import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from 'react-native-searchbar';

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

  resultHandler(results) {

  }

  render() {
    let _nav = this.props.navigation;

    let _searchBar = (
      <SearchBar
        backgroundColor={globalStyle.palette.PrimaryDefault}
        iconColor={globalStyle.palette.PrimaryLight}
        textColor={globalStyle.palette.PrimaryText}
        selectionColor={globalStyle.palette.Accent}
        placeholder='Title, Author, ISBN'

        ref={ref => this.searchBar = ref}
        onBack={() => _nav.dispatch(
          nav.setParams({ showSearch: false, showTabBar: true }, 'Search'))}
        data={[1, 2, 3]}
        handleResults={this.resultHandler}
        showOnLoad />
    );

    let _render = null;

    if (_nav.state.params) {
      let _showSearch = _nav.state.params.showSearch;

      _render = (_showSearch) ? _searchBar : null;
    }

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {_render}
      </View>
    );
  }
}

export default Search;