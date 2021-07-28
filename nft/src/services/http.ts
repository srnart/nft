import fetch from 'isomorphic-fetch';

const defaultOptions = {
  method: 'POST',
};

export const makeRequest = (url: string, options?: RequestInit) => {
  return fetch(url, { ...defaultOptions, ...options })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err);
};
