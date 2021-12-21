import * as actionTypes from './../actions/actionsTypes';

const initialState = {
  lastChat: null,
  notifications: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHAT:
      const notifications = action.chat?.notifications || [];
      const lastChat = action.chat?.lastChat || null;
      return {
        ...state,
        notifications,
        lastChat,
      };
    case actionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case actionTypes.SET_LAST_CHAT:
      return {
        ...state,
        lastChat: action.lastChat,
      };
    default: {
      return state;
    }
  }
};

export default chatReducer;
