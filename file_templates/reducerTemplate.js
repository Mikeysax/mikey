
const __Name__ = (state = {}, action) => {
  switch(action.type) {
    case 'ACTION_TYPE': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default __Name__;
