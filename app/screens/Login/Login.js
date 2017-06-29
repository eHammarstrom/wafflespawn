import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleSignIn from 'react-native-google-sign-in';
import * as firebase from 'firebase';

import Loading from './../../components/Loading';

import * as config from './../../config';
import * as database from './../../database';
import * as navigation from './../../navigation';

const logo = require('../../images/logo.png');

const STORAGE_USERDATA = 'user-data';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);

        this.props.navigation.dispatch(
          navigation.initiateToMainApp());
      } else {
        this.setState({ isLoading: false });
      }
    });
  }

  static navigationOptions = {
    title: 'Welcome to Wafflespawn',
    tabBarVisible: false
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>

            <Icon
              style={styles.icon}
              size={200}
              color='rgba(0,0,0,0.3)'
              name='book-open-page-variant' />

          </View>

          <View style={{
            flex: 3, flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center'
          }}>

            <Icon.Button style={styles.btnLogin}
              name='google' backgroundColor='#dd4a48' onPress={googleAuth.bind(this)} color='white'>
              <Text style={styles.btnText}>Sign in with Google</Text>
            </Icon.Button>

            <View style={styles.viewPadding} />

            <Icon.Button style={styles.btnLogin}
              name='facebook' backgroundColor='#3a5899' onPress={facebookAuth}>
              <Text style={styles.btnText}>Sign in with Facebook</Text>
            </Icon.Button>

          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center'
  },
  btnLogin: {
    width: 300,
    height: 50,
    borderRadius: 2
  },
  btnText: {
    color: 'white',
    fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  viewPadding: {
    height: 20
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  }
});

async function googleAuth() {
  await GoogleSignIn.configure(config.GoogleAuth);

  // https://firebase.google.com/docs/auth/web/google-signin
  const gUser = await GoogleSignIn.signInPromise();

  try {
    let user = await database.registerUser(gUser.idToken, gUser.accessToken);

    this.props.navigation.dispatch(
      navigation.initiateToMainApp());
  } catch (e) {
    console.error('googleAuthBtn: ' + e.toString());
    alert('Authentication failed,\nplease try again.');
    throw e;
  }
}

async function facebookAuth() {
  // https://firebase.google.com/docs/auth/web/facebook-login
}

export default Login;
