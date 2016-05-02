const syncCurrentUserFromLocalStorage = function(dispatch) {
  const userJson = localStorage.getItem('currentUser');
  if (userJson !== null) {
    const defaultUser = JSON.parse(userJson);
    dispatch({
      type: 'SET_CURRENT_USER',
      user: defaultUser
    });
  }
};

export default syncCurrentUserFromLocalStorage;
