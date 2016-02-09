import request from 'axios';

const API_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';

export function getProjects() {
  return {
    type:    'GET_PROJECTS',
    promise: request.get(API_URL)
  }
}

export function createProject(text) {
  return {
    type:    'CREATE_PROJECT',
    promise: request.post(API_URL, { time: Date.now(), text })
  };
}

export function editProject(id, text) {
  return {
    type: 'EDIT_PROJECT',
    id,
    text,
    date: Date.now()
  };
}

export function deleteProject(id) {
  return {
    type: 'DELETE_PROJECT',
    id
  };
}
