import * as firebase from 'firebase';

function registerUser(idToken, accessToken) {
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

async function addBookToList(isbn, title, imageUrl, list) {
  if (!firebase.auth().currentUser) return;

  console.log('database.addBookToList, book:', isbn);
  console.log('database.addBookToList, title:', title);
  console.log('database.addBookToList, imageUrl:', imageUrl);
  console.log('database.addBookToList, list:', list);

  const _userRef = 'users/' + firebase.auth().currentUser.uid;
  const _bookRef = firebase.database()
    .ref(_userRef + '/books')
    .child(list)
    .child('book-' + isbn);

  try {
    let req = await _bookRef.once('value');

    let book = req.val();

    if (book) {
      book.isbn = isbn;
      book.title = title;
      book.image = imageUrl;
    } else {
      book = { isbn: isbn, title: title, image: imageUrl };
    }

    await _bookRef.update(book);
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