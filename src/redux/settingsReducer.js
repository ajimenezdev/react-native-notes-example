const TOGGLE_DARKMODE = "settings/TOGGLE_DARKMODE";

const defaultState = {
  styles: {
    darkMode: false
  }
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return {
        ...state,
        styles: { ...state.styles, darkMode: !state.styles.darkMode }
      };
    default:
      return state;
  }
}

export function toggleDarkMode() {
  return {
    type: TOGGLE_DARKMODE
  };
}
