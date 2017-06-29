import React from 'react';
import { StackNavigator } from 'react-navigation';
import hoist from 'hoist-non-react-statics';
import Icon from 'react-native-vector-icons/Ionicons';

import * as globalStyle from './../../style';

import Categories from './subscreens/Categories';
import Books from './subscreens/Books';
import Book from './subscreens/Book';

const LibraryNavigator = (store) => {
  let nav = StackNavigator({
    Categories: {
      screen: hoist(props => <Categories {...props} store={store} />, Categories)
    },
    Books: {
      path: 'books/:category',
      screen: hoist(props => <Books {...props} store={store} />, Books)
    },
    Book: {
      path: 'books/:category/:isbn',
      screen: hoist(props => <Book {...props} store={store} />, Book)
    }
  }, { headerMode: 'none' });

  nav.navigationOptions = {
    title: 'Library',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        style={globalStyle.icons.tabBarIcons}
        name='ios-book' />)
  };

  return nav;
};

export default LibraryNavigator;
