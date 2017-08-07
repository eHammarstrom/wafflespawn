import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet
} from 'react-native';
import * as globalStyle from './../../../../style';
import Picker from 'react-native-wheel-picker';
const PickerItem = Picker.Item;

class ProgressBar extends Component {
  render() {
    const {
      showProgressPicker,
      currentPage,
      totalPages } = this.props;
    const progress = (currentPage / totalPages * 100).toString() + '%';

    return(
      <TouchableHighlight
        onPress={showProgressPicker}
        style={styles.container}
      >
        <View>
          <View style={StyleSheet.flatten([styles.progress, { width: progress }])} />
          <Text style={styles.progressText}>{progress}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const _height = 40;
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: _height,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.04)'
  },
  progress: {
    position: 'absolute',
    backgroundColor: 'rgba(0,255,0,0.4)',
    height: _height,
    width: '50%'
  },
  progressText: {
    alignSelf: 'center',
    color: globalStyle.palette.SecondaryText,
    fontSize: 22
  }
});

export default ProgressBar;
