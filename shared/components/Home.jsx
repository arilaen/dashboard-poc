import React, { Component , PropTypes }   from 'react';
import ProjectsView from './ProjectsView';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/ProjectActions';
import { connect } from 'react-redux';

class Home extends Component {
  static propTypes = {
    projects: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static needs = [
    ProjectActions.getProjects
  ];

  render() {
    const { projects, dispatch } = this.props;

    return (
      <div id="projects-list">
        <ProjectsView projects={projects}
          {...bindActionCreators(ProjectActions, dispatch)} />

      </div>
    );
  }
}

export default connect(state => ({ projects: state.projects }))(Home)
