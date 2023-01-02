const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
      case "UPDATE_START":
        return {
          ...state,
          isFetching:false
        };
      case "UPDATE_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "UPDATE_FAILURE":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
    case "LOGOUT":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;
