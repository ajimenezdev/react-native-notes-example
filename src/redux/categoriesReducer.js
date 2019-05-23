import uuid from "uuid/v1";

const defaultState = [
  {
    id: uuid(),
    category: "Personal",
    color: "#FFB3BA"
  },
  {
    id: uuid(),
    category: "Trabajo",
    color: "#B9FFC9"
  },
  {
    id: uuid(),
    category: "Casa",
    color: "#FFFFB9"
  }
];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
