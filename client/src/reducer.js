const initialState = {
  mob: [],
};

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case "ADD_MEMBER":
      return {
        ...state,
        mob: [...state.mob, action.payload],
      };
    case "REMOVE_MEMBER":
      return {
        ...state,
        mob: state.mob.filter((mobber, index) => index !== action.payload),
      };
    case "ROTATE_MEMBERS":
      return {
        ...state,
        mob: [...state.mob.slice(-1), ...state.mob.slice(0, -1)],
      };
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
