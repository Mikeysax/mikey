import publicKey from './publicKey';

const urlFor = (path) => {
  // return 'http://YourApiUrl.com' +
    publicKey() +
    path;
}

export default urlFor;
