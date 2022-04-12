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
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
