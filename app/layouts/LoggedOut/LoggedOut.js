import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  AsyncStorage,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleSignIn from 'react-native-google-sign-in';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

const logo = require('../../images/logo.png');

const STORAGE_EMAIL = 'userEmail';

class LoggedOut extends Component {
  static navigationOptions = {
    title: 'Welcome to Wafflespawn'
  };

  render() {
    let resetToHome = (res) => {
      return NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home', params: {email: res}})
        ]
      });
    };

    AsyncStorage.getItem(STORAGE_EMAIL).then(res => {
      if (res)
        this.props.navigation.dispatch(resetToHome(res));
    });

    console.log(this.props.navigation);

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
            name='google' backgroundColor='#dd4a48' onPress={googleAuth} color='white'>
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
    fontFamily:  (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
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
  await GoogleSignIn.configure({
    clientID: 'yourClientID', // iOS

    // iOS, Android
    // https://developers.google.com/identity/protocols/googlescopes
    scopes: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ],

    // iOS, Android
    // Whether to request email and basic profile.
    // [Default: true]
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a06bf16b507496b126d25ea909d366ba4
    shouldFetchBasicProfile: true,

    // iOS
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a486c8df263ca799bea18ebe5430dbdf7
    language: 'en-US',

    // iOS
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd
    loginHint: 'wafflespawn application',

    // iOS, Android
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#ae214ed831bb93a06d8d9c3692d5b35f9
    // serverClientID: '927919696293-16mltlac8fo9a1mn8r20decdncum5377.apps.googleusercontent.com', // works but wrong 'project-id'
    serverClientID: '432153624336-bo2b7cm9nj9cq41d38qmetq76dc3glfi.apps.googleusercontent.com',
    webClientId: '432153624336-bo2b7cm9nj9cq41d38qmetq76dc3glfi.apps.googleusercontent.com',

    // Don't use Android OAuth-ID!
    // http://stackoverflow.com/questions/33583326/new-google-sign-in-android
    // And this
    // http://stackoverflow.com/questions/33583326/new-google-sign-in-android/41413713#41413713
    // And this
    // https://github.com/devfd/react-native-google-signin/issues/22#issuecomment-269894801

    // Android
    // Whether to request server auth code. Make sure to provide `serverClientID`.
    // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
    offlineAccess: false, // we want to add token to firebase

    // Android
    // Whether to force code for refresh token.
    // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
    forceCodeForRefreshToken: false,

    // iOS
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a211c074872cd542eda53f696c5eef871
    openIDRealm: 'somethingForLater',

    // Android
    // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#setAccountName(java.lang.String)
    accountName: null,

    // iOS, Android
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a6d85d14588e8bf21a4fcf63e869e3be3
    hostedDomain: 'gmail.com',
  });

  // https://firebase.google.com/docs/auth/web/google-signin
  const user = await GoogleSignIn.signInPromise();

  const credential =
    firebase.auth.GoogleAuthProvider.credential(user.idToken);

  firebase.auth().signInWithCredential(credential)
    .catch(e => console.error(e));


  // https://facebook.github.io/react-native/docs/asyncstorage.html
  AsyncStorage.setItem(STORAGE_EMAIL, user.email);

  console.log('success');
}

async function facebookAuth() {
  ///

  // https://firebase.google.com/docs/auth/web/facebook-login
}

export default LoggedOut;
