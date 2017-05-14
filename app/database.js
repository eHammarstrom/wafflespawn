import * as firebase from 'firebase';

let userAuth = (idToken) => {
  const credential =
    firebase.auth.GoogleAuthProvider.credential(idToken);

  return firebase.auth().signInWithCredential(credential);
}

module.exports = {
  userAuth: userAuth
}