import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'
import Modal from 'react-native-modalbox';
import * as globalStyle from '~/style';

class FilterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProperty: 'Title',
      selectedOrder: 'Descending'
    };
  }

  open() { this.modal.open(); }
  close() { this.modal.close(); }

  render() {
    const filterProperty = [
      'Author',
      'Title',
      'Progress'
    ];

    const filterOrder = [
      'Ascending',
      'Descending'
    ];

    const { selectedProperty, selectedOrder } = this.state;

    const setFilterStateAndUpdateParent = (p) => {
      this.setState(p);
      this.props.setFilterState(selectedProperty, selectedOrder);
    };

    return(
      <Modal
        onClosed={() => {
          this.props.setModalState(false);
        }}
        onOpened={() => {
          this.props.setModalState(true);
        }}
        position={'top'}
        entry={'top'}
        ref={ref => this.modal = ref}
        style={styles.window}
      >
        <SegmentedControls
          tint={globalStyle.palette.Accent}
          selectedTint={globalStyle.palette.PrimaryText}
          backgroundColor={globalStyle.palette.PrimaryDefault}
          containerStyle={[styles.segmentControl, styles.segmentTopControl]}
          options={filterProperty}
          onSelection={
            ((o) => setFilterStateAndUpdateParent({ selectedProperty: o })).bind(this)
          }
          selectedOption={ this.state.selectedProperty }
        />

        <SegmentedControls
          tint={globalStyle.palette.Accent}
          selectedTint={globalStyle.palette.PrimaryText}
          backgroundColor={globalStyle.palette.PrimaryDefault}
          containerStyle={[styles.segmentControl, styles.segmentBottomControl]}
          options={filterOrder}
          onSelection={
            ((o) => setFilterStateAndUpdateParent({ selectedOrder: o })).bind(this)
          }
          selectedOption={ this.state.selectedOrder }
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    backgroundColor: globalStyle.palette.PrimaryDefault,
    height: 'auto',
    width: 'auto',
    borderRadius: 0
  },
  segmentControl: {
    marginLeft: 25,
    marginRight: 25
  },
  segmentTopControl: {
    marginTop: 20,
    marginBottom: 20
  },
  segmentBottomControl: {
    marginBottom: 20
  }
});

export default FilterModal;

