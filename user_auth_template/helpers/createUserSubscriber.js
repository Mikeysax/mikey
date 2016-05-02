import _ from 'lodash';

const createUserSubscriber = function(getState) {
  let lastUser = getState().currentUser;
  return function() {
    if (lastUser.id !== getState().currentUser.id) {
      if (_.isNumber(getState().currentUser.id)) {
        localStorage.setItem('currentUser', JSON.stringify(getState().currentUser));
      } else {
        localStorage.removeItem('currentUser');
      }
      lastUser = getState().currentUser;
    }
  }
};

export default createUserSubscriber;
