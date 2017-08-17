import { omit, reduce } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as utils from '~/utilities';
import * as globalStyle from '~/style';
import Loading from '~/components/Loading';

class Categories extends Component {
  navigate(category) {
    this.props.navigation.navigate('Books', { category });
  }

  static navigationOptions = { title: 'Library' };

  render() {
    const { books } = this.props;

    if (!books)
      return <Loading />;

    let bookData = [];

    Object.keys(books)
      .reverse()
      .forEach(x => bookData.push({ key: x, data: books[x] }));

    return (
      <FlatList
        style={{ flex: 1, backgroundColor: 'white' }}
        data={bookData}
        renderItem={({ item }) =>
          <CategoryItem
            navigate={this.navigate.bind(this)}
            name={item.key}
            data={item.data} />}
      />
    );
  }
};

class CategoryItem extends Component {
  render() {
    let numBooks =
      reduce(omit(this.props.data, 'key'), n => n + 1, 0);

    return (
      <TouchableHighlight
        underlayColor={globalStyle.palette.Accent}
        onLongPress={null} // edit/remove category
        onPress={() => this.props.navigate(this.props.name)}>
        <View style={styles.row}>
          <Text style={styles.title}>{this.props.name.toUpperCase()}</Text>
          <Text style={styles.number}>{numBooks}</Text>
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
  title: {
    color: globalStyle.palette.DefaultText,
    fontSize: 20,
    marginLeft: 20,
    alignSelf: 'center',
    flex: 1
  },
  number: {
    color: globalStyle.palette.SecondaryText,
    fontSize: 36,
    marginRight: 50,
    alignSelf: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.user.books
  };
};

Categories = connect(mapStateToProps)(Categories);

export default Categories;
