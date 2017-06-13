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
import * as utils from './../../../utilities';
import * as globalStyle from './../../../style';
import Loading from './../../../components/Loading';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {books} = this.props;

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
          <CategoryItem name={item.key} data={item.data} />}
      />
    );
  }
};

class CategoryItem extends Component {
  constructor(props) {
    super(props);

    console.log('categoryItem', this.props);
  }

  render() {
    let numBooks =
      reduce(omit(this.props.data, 'key'), n => n + 1, 0);

    return (
      <TouchableHighlight
        onLongPress={null} // edit/remove category
        >
        <View style={styles.row}>
          <Text>{this.props.name}: {numBooks}</Text>
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
});

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.user.books
  };
}

Categories = connect(mapStateToProps)(Categories);

export default Categories;