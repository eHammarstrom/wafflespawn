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

async function addBookToList(data, list) {
  if (!firebase.auth().currentUser) return;

  const {
    volumeId,
    isbn,
    title,
    imageUrl,
    totalPages
  } = data;

  console.log('database.addBookToList, book - title:', isbn, '-', title);

  const _userRef = 'users/' + firebase.auth().currentUser.uid;
  const _bookRef = firebase.database()
    .ref(_userRef + '/books')
    .child(list)
    .child(volumeId);

  try {
    let req = await _bookRef.once('value');

    let book = req.val();

    if (book) {
      book.volumeId = volumeId;
      book.isbn = isbn;
      book.title = title;
      book.image = tryOrDefault(imageUrl, "");
      book.totalPages = tryOrDefault(totalPages, 0);
    } else {
      book = {
        volumeId: volumeId,
        isbn: isbn,
        title: title,
        image: tryOrDefault(imageUrl, ""),
        totalPages: tryOrDefault(totalPages, 0)
      };
    }

    await _bookRef.update(book);
  } catch (e) {
    console.error(e);
  }
}

function tryOrDefault(item, def) {
  if (item)
    return item;
  else
    return def;
}

let bookLists = {
  planToRead: 'Plan to Read',
  currentlyReading: 'Currently Reading',
  onHold: 'On Hold',
  completed: 'Completed',
};

module.exports = {
  registerUser,
  addBookToList,
  bookLists
};
