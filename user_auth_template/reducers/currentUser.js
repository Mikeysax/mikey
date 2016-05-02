const currentUser = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_CURRENT_USER':
    return action.payload.data;

    case 'SET_CURRENT_USER':
    return action.user;

    case 'SIGN_OUT_CURRENT_USER':
    return {};

    default:
    return state;
  }
}

export default currentUser;
