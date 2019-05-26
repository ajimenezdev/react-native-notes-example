import uuid from "uuid/v1";
export const ADD_CATEGORY = "categories/ADD_CATEGORY";
export const REMOVE_CATEGORY = "categories/REMOVE_CATEGORY";
export const UPDATE_CATEGORY = "categories/UPDATE_CATEGORY";

const defaultState = [
  {
    id: uuid(),
    category: "Personal",
    colorIdx: 0
  },
  {
    id: uuid(),
    category: "Trabajo",
    colorIdx: 1
  },
  {
    id: uuid(),
    category: "Casa",
    colorIdx: 2
  }
];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, { ...action.category, id: uuid() }];
    case REMOVE_CATEGORY:
      return state.filter(category => category.id !== action.categoryId);
    case UPDATE_CATEGORY:
      const updateIndex = state.findIndex(c => c.id === action.category.id);
      const newState = Object.assign(state.slice(), {
        [updateIndex]: action.category
      });
      return newState;
    default:
      return state;
  }
}

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category
  };
}

export function updateCategory(category) {
  return {
    type: UPDATE_CATEGORY,
    category
  };
}

export function removeCategory(categoryId) {
  return {
    type: REMOVE_CATEGORY,
    categoryId
  };
}
