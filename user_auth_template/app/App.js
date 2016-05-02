  store.subscribe(createUserSubscriber(store.getState));
  syncCurrentUserFromLocalStorage(store.dispatch);
