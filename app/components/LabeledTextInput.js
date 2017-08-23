import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';
import { omit } from 'lodash';
import * as globalStyle from '~/style';

const LabeledTextInput = (props) => {
  props = omit(props, ['style']); // deny propagation of style, use {viewStyle, labelStyle or inputStyle} instead

  return (
    <View style={[{ height: (props.height | 60), marginBottom: 10}, props.viewStyle]}>
      <Text style={[styles.fieldLabel, props.labelStyle]}>{props.label}</Text>
      <TextInput
        {...props}
        style={[styles.fieldInput, props.inputStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldLabel: {
    color: globalStyle.palette.SecondaryText
  },
  fieldInput: {
    fontSize: 18,
    color: globalStyle.palette.DefaultText,
    flex: 1
  }
});

export default LabeledTextInput;
