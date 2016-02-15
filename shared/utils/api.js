import request from 'axios';

export const rootUrl = 'http://localhost:3000/';

export const getResource = (url) => request(rootUrl + url);

// Mock variable until harvest authentication is integrated into front end
export const harvestUserId = 508343;
