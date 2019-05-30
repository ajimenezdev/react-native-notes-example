import firebase from "react-native-firebase";
import { REMOVE_CATEGORY } from "./categoriesReducer";
const ADD_NOTE = "notes/ADD_NOTE";
const REMOVE_NOTE = "notes/REMOVE_NOTE";
const UPDATE_NOTE = "notes/UPDATE_NOTE";

const defaultState = [];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_NOTE:
      // if the note is already on the state, treat it as an update. (Due to mix of redux-persist and firebase)
      if (!state.some(n => n.id === action.note.id)) {
        return [...state, action.note];
      }
    case UPDATE_NOTE:
      const updateIndex = state.findIndex(note => note.id === action.note.id);
      const newState = Object.assign(state.slice(), {
        [updateIndex]: action.note
      });
      return newState;
    case REMOVE_NOTE:
      return state.filter(note => note.id !== action.noteId);
    // Necesario para borrar categoria de las notas donde se este utilizando
    case REMOVE_CATEGORY:
      return state.map(note =>
        note.category && note.category.id === action.categoryId
          ? { ...note, category: null }
          : note
      );
    default:
      return state;
  }
}

export const addNote = note => async dispatch => {
  const newNote = {
    ...note,
    created: new Date(),
    author_id: firebase.auth().currentUser.uid
  };
  firebase
    .firestore()
    .collection("notes")
    .add(newNote);
};

export const updateNote = note => async dispatch => {
  firebase
    .firestore()
    .collection("notes")
    .doc(note.id)
    .update(note);
};

export const removeNote = noteId => async dispatch => {
  firebase
    .firestore()
    .collection("notes")
    .doc(noteId)
    .delete();
};

let unsubscribe = null;

export const watchNotes = () => async dispatch => {
  const userId = firebase.auth().currentUser.uid;
  unsubscribe = firebase
    .firestore()
    .collection("notes")
    .where("author_id", "==", userId)
    .onSnapshot(querySnapshot => {
      querySnapshot.docChanges.forEach(docChange => {
        const doc = docChange.doc;
        switch (docChange.type) {
          case "added":
            dispatch({
              type: ADD_NOTE,
              note: {
                id: doc.id,
                ...doc.data()
              }
            });
            break;
          case "modified":
            dispatch({
              type: UPDATE_NOTE,
              note: {
                id: doc.id,
                ...doc.data()
              }
            });
            break;
          case "removed":
            dispatch({
              type: REMOVE_NOTE,
              noteId: doc.id
            });
        }
      });
    });
};

export const unsubscribeNotes = () => {
  unsubscribe && unsubscribe();
};
