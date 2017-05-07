import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import GoogleSignIn from 'react-native-google-sign-in';

const logo = require('../../images/logo.png');

class LoggedOut extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'powderblue' }}>

          <Image
            style={styles.logo}
            source={logo} />

        </View>

        <View style={{ flex: 3, flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center' ,
            backgroundColor: 'skyblue' }}>

          <Icon.Button style={styles.btnLogin}
            name='google' backgroundColor='#ffffff' onPress={googleAuth} color='rgba(0,0,0,0.54)'>
            Sign in with Google
          </Icon.Button>

          <View style={styles.viewPadding} />

          <Icon.Button style={styles.btnLogin}
            name='facebook' backgroundColor='#3b5998' onPress={facebookAuth}>
            Login with Facebook
          </Icon.Button>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnLogin: {
    ///
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
    scopes: ['your', 'requested', 'api', 'scopes'],

    // iOS, Android
    // Whether to request email and basic profile.
    // [Default: true]
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a06bf16b507496b126d25ea909d366ba4
    shouldFetchBasicProfile: boolean,

    // iOS
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a486c8df263ca799bea18ebe5430dbdf7
    language: string,

    // iOS
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd
    loginHint: string,

    // iOS, Android
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#ae214ed831bb93a06d8d9c3692d5b35f9
    serverClientID: 'yourServerClientID',

    // Android
    // Whether to request server auth code. Make sure to provide `serverClientID`.
    // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
    offlineAccess: boolean,
    
    // Android
    // Whether to force code for refresh token.
    // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
    forceCodeForRefreshToken: boolean,

    // iOS
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a211c074872cd542eda53f696c5eef871
    openIDRealm: string,

    // Android
    // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#setAccountName(java.lang.String)
    accountName: 'yourServerAccountName',

    // iOS, Android
    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a6d85d14588e8bf21a4fcf63e869e3be3
    hostedDomain: 'yourHostedDomain',
  });

  const user = await GoogleSignIn.signInPromise();

  console.log(user);
}

async function facebookAuth() {
  ///
}

export default LoggedOut;