import axios from 'axios';
import urlFor from '../helpers/urlFor';

const signUp = (userAttributes) => {
  const url = urlFor("/users");
  const result = axios.post(url, userAttributes);

  return {
    type: "LOAD_CURRENT_USER",
    payload: result
  };
};

export default signUp;
