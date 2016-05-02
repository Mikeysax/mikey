import publicKey from './publicKey';

const urlFor = (path) => {
  return "http://replaceThisUrlWithYourApiUrl.com" +
    publicKey() +
    path;
}

export default urlFor;
