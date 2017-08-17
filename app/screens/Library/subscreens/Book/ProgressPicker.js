import React, { Component } from 'react';
import { range } from 'lodash';
import {
  StyleSheet,
  Button,
  View
} from 'react-native';
import Modal from 'react-native-modalbox';
import Picker from 'react-native-wheel-picker';
import * as database from '~/database';
import * as globalStyle from '~/style';
const PickerItem = Picker.Item;

const log = (msg) => console.log('ProgressPicker:', msg);

class ProgressPicker extends Component {
  constructor(props) {
    super(props);

    this.itemList = range(1, this.props.totalPages + 1);

    this.state = {
      selectedItem: (this.props.currentPage - 1)
    };
  }

  open() { this.modal.open(); }
  close() { this.modal.close(); }

  setNewCurrentPage() {
    const { category, volumeId } = this.props;
    let newCurrentPage = this.state.selectedItem + 1;

    log(`setting new currentPage=${newCurrentPage}`);

    database.editBookProperty(
      category,
      volumeId,
      { currentPage: newCurrentPage }
    );

    this.close();
  }

  render() {
    return (
      <Modal
        ref={ref => this.modal = ref}
        style={styles.window}
        onOpened={() => log('opened')}
        swipeToClose={false}
        coverScreen={true}
      >
        <Picker
          style={styles.picker}
          selectedValue={this.state.selectedItem}
          itemStyle={{ color: globalStyle.palette.PrimaryDefault, fontSize: 23 }}
          onValueChange={(i) => this.setState({ selectedItem: i })}
        >
          {this.itemList.map((v, i) => (
            <PickerItem label={v.toString()} value={i} key={i} />
          ))}
        </Picker>
        <View
          style={styles.btnContainer}
        >
          <Button
            title='Close'
            color={globalStyle.palette.PrimaryDefault}
            onPress={this.close.bind(this)}
          />
          <Button
            title='Accept'
            color={globalStyle.palette.PrimaryDefault}
            onPress={this.setNewCurrentPage.bind(this)}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    justifyContent: 'center',
    borderRadius: 0 ,
    width: 200,
    height: 240
  },
  picker: {
    width: 150,
    height: 180,
    alignSelf: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    padding: 10
  },
});

export default ProgressPicker;
