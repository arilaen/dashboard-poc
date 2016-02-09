import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function projectReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_PROJECTS':
      return new Immutable.List(action.res.data);
    case 'CREATE_PROJECTS':
      return state.concat(action.res.data.text);
    case 'EDIT_PROJECTS':
      return state.set(action.id, action.text);
    case 'DELETE_PROJECTS':
      return state.delete(action.id);
    default:
      return state;
  }
}
