import {
  SET_LOGIN_LOADING,
  SIGN_IN,
  SIGN_UP,
  RECONNECT,
  RESET_LAST_CONNECTION,
  LOGOUT,
  ROOMS,
  SET_CHANNEL_NAME,
  CREATE_NEW_CHANNEL,
} from "../actions/app";

const defaultState = {
  logged: {
    isLoading: false,
    isLogged: false,
    username: null,
  },
  rooms: [],
  currentChannel: null,
  newRoomCreated: "",
  data: [
    {
      message: ["one"],
    },
  ],
  information: [
    {
      UserName: {
        User: "",
        Channels: [],
        LiveChannel: { User: "", messgaes: [] },
      },
    },
  ],
};

export default (state = defaultState, action) => {
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

    // myStuff = [...myStuff, { name: 'js lovin fool' }]
    case "RECIEVED_MESSAGES":
      console.log("reducer recieved", action.payload);
      stateCpoy.data = [];
      return stateCpoy;

    case "CREATE_NEW_CHANNEL":
      stateCpoy.newRoomCreated = action.payload;

      return stateCpoy;

    default:
      return stateCpoy;
  }
};
