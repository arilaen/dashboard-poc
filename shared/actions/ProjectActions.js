import { rootUrl, getResource, harvestUserId } from '../utils/api';
import axios from 'axios';
import request from 'axios';

/*
  Exported: toggleMyProjects, toggleAllProjects, projectsLoading, getProjectsComplete
  Private: getProjects, getProjectsComplete, get Projects Fail
*/

function projectsLoading() {
  return {
    type: 'PROJECTS_LOADING'
  };
}

function getProjectsComplete(allProjects) {
  return {
    type: 'GET_PROJECTS_COMPLETE',
    allProjects
  };
}

function getProjectsFail(error) {
  return {
    type: 'GET_PROJECTS_FAIL',
    error
  };
}

function getMyProjectsComplete(myProjects) {
  return {
    type: 'GET_MY_PROJECTS_COMPLETE',
    myProjects
  };
}

function getMyProjectsFail(error) {
  return {
    type: 'GET_MY_PROJECTS_FAIL',
    error
  };
}

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

function getMyProjects(projects) {
  return (dispatch) => {
    axios.all(projects.map(project =>
      request(`${rootUrl}projects/${project.id}/user_assignments`)
    )).then(
      response => {
        if (!response) {
          return dispatch(getMyProjectsFail('Error loading user assignments'));
        }
        const rolesManaged = [].concat.apply([], response.map(a => a.data))
          .map(a => a.user_assignment)
          .filter(role => role.user_id === harvestUserId && role.is_project_manager);
        const myProjects = projects.filter(project =>
          !!rolesManaged.filter(role => role.project_id === project.id).length
        );
        dispatch(getMyProjectsComplete(myProjects));
      })
      .catch(error => dispatch(getMyProjectsFail(error)));
  };
}

export function getProjects() {
  return (dispatch) => {
    dispatch(projectsLoading());
    return getResource('projects')
      .then(response => {
        if (!response || !response.data) {
          return dispatch(getProjectsFail('Error loading all projects'));
        }
        dispatch(getProjectsComplete(response.data));
        getMyProjects(response.data)(dispatch);
      })
      .catch(error => {
        dispatch(getProjectsFail(error));
      });
  };
}
