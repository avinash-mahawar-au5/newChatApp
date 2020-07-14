import {
  SET_LOGIN_LOADING,
  SIGN_IN,
  SIGN_UP,
  RECONNECT,
  RESET_LAST_CONNECTION,
  LOGOUT,
  CREATE_NEW_CHANNEL,
  ROOMS,
  SET_CHANNEL_NAME,
} from "../actions/app";

const defaultState = {
  logged: {
    isLoading: false,
    isLogged: false,
    username: null,
  },
  rooms: [],
  currentChannel: null,

  chatSchema: {
    currentChannel: "",
    username: "",
    messages: [],
  },

  general: [
    { username: "avi", message: "Hello" },
    { username: "avinash", message: "Hello" },
    { username: "avinash", message: "Hello" },
  ],
  topic2: [
    { username: "yogesh", message: "Hello" },
    { username: "nitin", message: "Hello" },
    { username: "yogesh", message: "Hello" },
  ],
};

export default (state = defaultState, action) => {
  // console.log("Aciton", action);
  let stateCpoy = JSON.parse(JSON.stringify(state));
  if (action.type === "ROOMS") {
    stateCpoy.rooms = action.payload;
  }
  if (action.type === "SET_CHANNEL_NAME") {
    stateCpoy.currentChannel = action.payload;
  }
  switch (action.type) {
    case SET_LOGIN_LOADING:
      const { value: isLoading } = action.payload;
      return {
        ...state,
        logged: {
          ...state.logged,
          isLoading,
        },
      };
    case SIGN_UP:
    case SIGN_IN:
      localStorage.setItem(
        "last_session",
        JSON.stringify({ ...action.payload })
      );
      return {
        ...state,
        logged: {
          isLoading: false,
          isLogged: true,
          ...action.payload,
        },
      };
    case RECONNECT:
      const { last_session } = action.payload;
      return {
        ...state,
        logged: {
          ...last_session,
          isLoading: false,
          isLogged: true,
          profilePic: last_session.profilePic,
        },
      };
    case RESET_LAST_CONNECTION:
      localStorage.setItem("last_session", JSON.stringify({ ...state.logged }));
      return state;
    case LOGOUT:
      return {
        ...state,
        logged: defaultState.logged,
      };
    case "RECIEVED_MESSAGES":
      console.log(action.payload);

      return stateCpoy;

    default:
      return stateCpoy;
  }
};
