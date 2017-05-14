import * as firebase from 'firebase';

let registerUser = (idToken, accessToken) => {
  console.log('database: preparing credentials');

  const credential =
    firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

  console.log('database: authenticating credentials');

  return firebase.auth().signInWithCredential(credential)
    .then(val => val)
    .catch(e => {
      console.error('database: ' + e);
      throw e;
    });
}

module.exports = {
  registerUser: registerUser
}