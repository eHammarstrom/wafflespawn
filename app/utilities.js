import * as firebase from 'firebase';
import * as navigation from './navigation';
import * as actions from './actions';

function throwLoginIfNotAuthed(propsNavigation) {
  firebase.auth().onAuthStateChanged(u => {
    if (!u)
      propsNavigation.dispatch(navigation.resetToLogin());
  });
}

function subscribeToUserBooks(store) {
  if (!firebase.auth().currentUser) return;

  const userRef = firebase.database().ref(
    'users/' + firebase.auth().currentUser.uid + '/books/');

  userRef.on('value', (data) => {
    console.log('data:', data.val());
    store.dispatch(actions.addUserBooks(data.val()));
  });
}

function formatAuthors(authorsData) {
  if (!authorsData)
    return 'Unknown author';

  if (authorsData.length > 2)
    return authorsData[0] + ' et al.';
  else
    return authorsData.join(', ');
}

const book = {
  formatAuthors
}

module.exports = {
  throwLoginIfNotAuthed,
  subscribeToUserBooks,
  book
};
