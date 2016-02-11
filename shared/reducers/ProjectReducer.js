import Immutable from 'immutable';

const defaultState = new Immutable.List();

// const initialState = {
//   loading: true,
//   myProjectsVisible: true,
//   allProjectsVisible: true
// };

export default function projectReducer (initialState, {
  ['TOGGLE_MY_PROJECTS']: (state) => ({
    myProjectsVisible: !state.myProjectsVisible
  }),
  ['TOGGLE_ALL_PROJECTS']: (state) => ({
    allProjectsVisible: !state.allProjectsVisible
  }),
  ['ALL_PROJECTS_LOADING']: (state) => ({
    ...state,
    loading: true
  }),
  ['ALL_PROJECTS_SUCCESS']: (state, { data }) => ({
    data,
    loading: false
  }),
  ['ALL_PROJECTS_FAIL']: (state, { error }) => ({
    error,
    loading: false
  })
});
