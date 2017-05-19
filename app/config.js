const GoogleAuth = {
  clientID: 'yourClientID', // iOS
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ],
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a06bf16b507496b126d25ea909d366ba4
  shouldFetchBasicProfile: true,
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a486c8df263ca799bea18ebe5430dbdf7
  language: 'en-US',
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd
  loginHint: 'wafflespawn application',
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#ae214ed831bb93a06d8d9c3692d5b35f9
  serverClientID: '432153624336-bo2b7cm9nj9cq41d38qmetq76dc3glfi.apps.googleusercontent.com',
  // Don't use Android OAuth-ID!
  // http://stackoverflow.com/questions/33583326/new-google-sign-in-android
  // And this
  // http://stackoverflow.com/questions/33583326/new-google-sign-in-android/41413713#41413713
  // And this
  // https://github.com/devfd/react-native-google-signin/issues/22#issuecomment-269894801
  // Whether to request server auth code. Make sure to provide `serverClientID`.
  // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
  offlineAccess: false, // we want to add token to firebase
  // Whether to force code for refresh token.
  // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
  forceCodeForRefreshToken: false,
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a211c074872cd542eda53f696c5eef871
  openIDRealm: 'somethingForLater',
  // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#setAccountName(java.lang.String)
  accountName: null,
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a6d85d14588e8bf21a4fcf63e869e3be3
  hostedDomain: 'gmail.com'
};

module.exports = {
  GoogleAuth
}