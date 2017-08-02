import React from 'react';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as globalStyle from './../../style';

/**
 * @param {*String name of icon retrieved from icon lib} iconName
 * @param {*Object navigation from ReactNavigation} navigation
 * note: parameter headerButtonRightOnClick used as onPress
 */
const HeaderButtonRight = ({ navigation, iconName }) => (
  <TouchableHighlight
    onPress={navigation.state.params.headerButtonRightOnClick}
    underlayColor={null}
  >
    <Icon
      style={globalStyle.icons.headerIcons} name={iconName} />
  </TouchableHighlight>
); 

export default HeaderButtonRight;
