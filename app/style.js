import { StyleSheet } from 'react-native';

/* Palette generated by Material Palette - materialpalette.com/brown/deep-orange 
.dark-primary-color    { background: #5D4037; }
.default-primary-color { background: #795548; }
.light-primary-color   { background: #D7CCC8; }
.text-primary-color    { color: #FFFFFF; }
.accent-color          { background: #FF5722; }
.primary-text-color    { color: #212121; }
.secondary-text-color  { color: #757575; }
.divider-color         { border-color: #BDBDBD; } */

const palette = {
  PrimaryDark: '#5D4037',
  PrimaryDefault: '#795548',
  PrimaryLight: '#D7CCC8',
  PrimaryText: '#FFFFFF',
  Accent: '#FF5722',
  DefaultText: '#212121',
  SecondaryText: '#757575',
  Divider: '#BDBDBD'
}

const icons = StyleSheet.create({
  tabBarIcons: {
    fontSize: 26,
    color: palette.PrimaryText
  }
});

const text = StyleSheet.create({
  title: {

  },
  description: {

  }
});

module.exports = {
  icons: icons,
  text: text,
  palette: palette
}