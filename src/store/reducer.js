const initialState = {
  mob: [],
  rotations: 0,
  elapsed: 0,
  time: {
    // all times stored as seconds
    elapsed: 0,
    running: false,
    remaining: 900,
    duration: 900,
    timerStart: null,
  },
};

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Member actions
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
        rotations: state.rotations + 1,
      };
    case "SET_MEMBERS":
      return {
        ...state,
        mob: action.payload,
      };

    // Timer actions
    case "DECREMENT_TIMER":
      return {
        ...state,
        time: {
          ...state.time,
          remaining: state.time.remaining - 1,
          elapsed: state.time.elapsed + 1,
        },
      };
    case "RESET_TIMER":
      return {
        ...state,
        time: {
          ...state.time,
          remaining: state.time.duration,
        },
      };
    case "TOGGLE_TIMER":
      return {
        ...state,
        time: {
          ...state.time,
          running: !state.time.running,
          timerStarted: !state.time.running ? action.payload : null,
        },
      };
    case "SET_DURATION":
      return {
        ...state,
        time: {
          ...state.time,
          duration: action.payload,
          // if the new duration is less than time remaining, update it, otherwise keep it
          remaining:
            action.payload < state.time.remaining
              ? action.payload
              : state.time.remaining,
        },
      };
    case "SET_ELAPSED":
      return {
        ...state,
        elapsed: action.payload,
      };
    case "SET_TIME":
      return {
        ...state,
        time: {
          ...state.time,
          ...action.payload,
        },
      };
    case "ADD_TWO_MINUTES":
      return {
        ...state,
        time: {
          ...state.time,
          remaining: state.time.remaining + 120,
        },
      };

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
