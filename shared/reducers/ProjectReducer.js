import { Map } from 'immutable';

const initialState = new Map({
  loading: true,
  myProjectsLoading: true,
  allProjects: [],
  myProjects: [],
  myProjectsVisible: true,
  allProjectsVisible: true,
  error: false
});

export default function projects(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'TOGGLE_MY_PROJECTS': {
      const myProjectsVisible = !state.myProjectsVisible;
      return state.set({ myProjectsVisible });
    }
    case 'TOGGLE_ALL_PROJECTS': {
      const allProjectsVisible = !state.allProjectsVisible;
      return state.set(allProjectsVisible);
    }
    case 'PROJECTS_LOADING': {
      return state.set('loading', true).set('myProjectsLoading', true);
    }
    case 'GET_PROJECTS_COMPLETE': {
      return state.set('loading', false).set('allProjects', action.allProjects);
    }
    case 'GET_PROJECTS_FAIL': {
      return state.set('loading', false).set(action.error);
    }
    case 'GET_MY_PROJECTS_COMPLETE': {
      return state.set('myProjectsLoading', false).set('myProjects', action.myProjects);
    }
    case 'GET_MY_PROJECTS_FAIL': {
      return state.set('myProjectsLoading', false).set(action.error);
    }
    default:
      return state;
  }
}
