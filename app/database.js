import { assign } from 'lodash';
import * as firebase from 'firebase';

// PUBLIC

/**
 * Adds or authenticates user to firebase DB
 * @param {String} idToken
 * @param {String} accessToken
 */
function registerUser(idToken, accessToken) {
  const credential =
    firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

  return firebase.auth().signInWithCredential(credential)
    .then(val => val)
    .catch(e => {
      console.error('database: ' + e);
    });
}

/**
 * Moves book to a new category, and sets the book defaults of that category
 * @param {String use: database.bookLists} currentCategory
 * @param {String use: database.bookLists} destinationCategory
 * @param {String} volumeId
 */
async function moveBookToCategory(currentCategory, destinationCategory, volumeId) {
  const currentBookRef = getBookRef(currentCategory, volumeId);
  const destinationBookRef = getBookRef(destinationCategory, volumeId);

  try {
    let book = (await currentBookRef.once('value')).val();

    book = setCategoryDefaults(destinationCategory, book);

    currentBookRef.remove();
    await destinationBookRef.update(book);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Adds given book object to the given category and volumeId
 * @param {String use: database.bookLists} category
 * @param {String} volumeId
 * @param {Object {
 *  author: [String]
 *  title: String
 *  volumeId: String
 *  imageUrl: String
 *  isbn: String (Optional?)
 *  totalPages: Int
 * }} data
 */
async function addBookToList(category, volumeId, data) {
  const bookRef = getBookRef(category, volumeId);

  try {
    let book = (await bookRef.once('value')).val();

    data.image = tryOrDefault(data.imageUrl, "");
    data.totalPages = tryOrDefault(data.totalPages, 0);
    data.currentPage = 0;
    data.progress = 0;

    book = assign(data, book);

    book = setCategoryDefaults(category, book);

    await bookRef.update(book);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Removes book given category and volumeId
 * @param {String use: database.bookLists} category
 * @param {String} volumeId
 */
async function removeBook(category, volumeId) {
  const bookRef = getBookRef(category, volumeId);

  try {
    await bookRef.remove();
  } catch (e) {
    console.error(e)
  }
}

/**
 * Modifies book properties with given properties
 * @param {String of book category} category
 * @param {String of book volume id} volumeId
 * @param {Object of new field values} props
 */
async function editBookProperty(category, volumeId, props) {
  const bookRef = getBookRef(category, volumeId);

  try {
    let req = await bookRef.once('value');

    let book = req.val();

    if (props.currentPage) {
      props.progress = safeDiv(props.currentPage, book.totalPages);

      if (category === bookLists.currentlyReading) {
        statistics.addPageDiff(category, volumeId,
          (props.currentPage - tryOrDefault(book.currentPage, 0)),
          (props.progress === 1));
      }
    }

    book = assign(book, props);

    await bookRef.update(book);
  } catch(e) {
    console.error(e);
  }
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
  bookLists,
  editBookProperty,
  moveBookToCategory,
  removeBook
};

// PRIVATE

const statistics = { // namespace statistics functions
  addPageDiff
}

/**
 * Prepare book for category transfer/entry
 * param {String use: database.bookLists} category
 * param {Object} book
 * return {Object} book'
 */
function setCategoryDefaults(category, book) {
  switch (category) {
    case bookLists.completed:
      book.progress = 1;
      book.currentPage = book.totalPages;
      break;
    case bookLists.planToRead:
      book.progress = 0;
      book.currentPage = 0;
      break;
  }

  return book;
}

async function addPageDiff(category, volumeId, diff, completed) {
  const time = Date.now();
  const readStatsRef = firebase.database()
    .ref(getUserRef() + '/stats')
    .child(time);

  try {
    let entry = {
      date: time,
      category,
      volumeId,
      diff,
      completed
    };

    await readStatsRef.update(entry);
  } catch (e) {
    console.error(e);
  }
}

function getUserRef() {
  return 'users/' + firebase.auth().currentUser.uid
}

function getBookRef(category, volumeId) {
  const bookRef = firebase.database()
    .ref(getUserRef() + '/books')
    .child(category)
    .child(volumeId);

  return bookRef;
}

function safeDiv(n, d) {
  if (d === 0)
    return 0;
  else
    return (n / d);
}

function tryOrDefault(item, def) {
  if (item)
    return item;
  else
    return def;
}
