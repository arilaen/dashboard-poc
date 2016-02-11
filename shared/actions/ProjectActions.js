import { getResource } from '../utils/api';

export function toggleMyProjects() {
  return {
    type: 'TOGGLE_MY_PROJECTS'
  };
}

export function toggleAllProjects() {
  return {
    type: 'TOGGLE_ALL_PROJECTS'
  };
}

export function requestAllProjects() {
  return {
    type: 'ALL_PROJECTS_LOADING'
  };
}

export function receiveAllProjects(json) {
  return {
    type: 'ALL_PROJECTS_SUCCESS',
    payload: {
      data: {
        projectList: json.data || {}
      }
    }
  };
}

export function failReceiveAllProjects(error) {
  return {
    type: 'ALL_PROJECTS_FAIL',
    payload: { error }
  };
}

export function fetchAllProjects() {
  return (dispatch) => {
    dispatch(requestAllProjects());
    return getResource('data')
      .then((json) => dispatch(receiveAllProjects(json)))
      .catch((error) => dispatch(failReceiveAllProjects(error.message)));
  };
}
