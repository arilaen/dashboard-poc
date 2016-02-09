import React, { Component , PropTypes }   from 'react';
import ProjectsView              from './ProjectsView';
import { bindActionCreators } from 'redux';
import * as ProjectActions       from '../actions/ProjectActions';
import { connect }            from 'react-redux';

class Home extends Component {
  static propTypes = {
    Projects:    PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static needs = [
    ProjectActions.getProjects
  ];

  render() {
    const { Projects, dispatch } = this.props;

    return (
      <div id="Project-list">
        <ProjectsView Projects={Projects}
          {...bindActionCreators(ProjectActions, dispatch)} />

      </div>
    );
  }
}

export default connect(state => ({ Projects: state.Projects }))(Home)
