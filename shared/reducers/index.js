import { combineReducers } from 'redux';
import projects from './ProjectReducer';

const rootReducer = combineReducers({
  projects
});

export default rootReducer;
