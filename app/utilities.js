import * as firebase from 'firebase';
import * as navigation from './navigation';

let throwLoginIfNotAuthed = (propsNavigation) => {
  firebase.auth().onAuthStateChanged(u => {
    if (!u)
      propsNavigation.dispatch(navigation.resetToLogin());
  });
}

module.exports = {
  throwLoginIfNotAuthed
}