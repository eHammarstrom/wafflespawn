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

let addBookToList = async (bookISBN, list) => {
  if (!firebase.auth().currentUser) return;

  console.log('database.addBookToList, book:', bookISBN);
  console.log('database.addBookToList, list:', list);

  const _userRef = 'users/' + firebase.auth().currentUser.uid;

  try {
    await firebase.database()
      .ref(_userRef + '/books')
      .child(list)
      .child('book-' + bookISBN)
      .set({isbn: bookISBN});
  } catch (e) {
    console.error(e);
  }
}

let bookLists = {
  reading: 'reading',
  toRead: 'to-read',
  finished: 'finished'
}

module.exports = {
  registerUser,
  addBookToList,
  bookLists
}