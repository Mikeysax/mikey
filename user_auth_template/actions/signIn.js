import axios from 'axios';
import urlFor from '../helpers/urlFor';

  const signIn = (signInAttributes) => {
    const url = urlFor('/user_sessions');
    const result = axios.post(url, signInAttributes);

    return {
      type: 'LOAD_CURRENT_USER',
      payload: result
    };
  };


export default signIn;
