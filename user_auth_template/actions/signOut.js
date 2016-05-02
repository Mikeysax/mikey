import axios from 'axios';
import urlFor from '../helpers/urlFor';

  const signOut = (currentUser) => {
    const url = urlFor(
      '/user_sessions?api_key=' +
      currentUser.api_key
    );

    const result = axios.delete(url);
    return {
      type: 'SIGN_OUT_CURRENT_USER',
      payload: result
    };
    
  };


export default signOut;
