import request from 'axios';

const rootUrl = 'http://localhost:3000/';

export const getResource = function getResource(url) {
  return request(rootUrl + url)
  .then(response => response.json());
};
