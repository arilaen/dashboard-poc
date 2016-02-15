import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as actions from '../actions/ProjectActions';
import { getResource } from '../utils/api';

import ToggableHeader from '../components/ToggableHeader';
import ProjectSummary from '../components/ProjectSummary';

function mapStateToProps(state) {
  const projects = state.projects.toObject();
  return {
    allProjects: projects.allProjects,
    myProjects: projects.myProjects,
    allProjectsVisible: projects.allProjectsVisible,
    myProjectsVisible: projects.myProjectsVisible
  };
}

class AllProjects extends React.Component {

  constructor(props) {
    super(props);
    this.handleMyClick = this.handleMyClick.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.getProjects());
  }

  handleMyClick() {
    const { dispatch } = this.props;
    dispatch(actions.toggleMyProjects());
  }

  handleAllClick() {
    const { dispatch } = this.props;
    dispatch(actions.toggleAllProjects());
  }

  renderSectionWithData(data) {
    return data.map((project, i) =>
        <div className="dashboard-col -single" key={i}>
          <ProjectSummary data={project} />
        </div>
    );
  }

  render() {
    const { children, allProjects, myProjects, allProjectsVisible, myProjectsVisible } = this.props;
    return (
      <div className="projects-container">
        <ToggableHeader
          value="My Projects"
          onToggleClick={this.handleMyClick}
          className={ classNames('toggable-header',
            { hide : !myProjectsVisible }
          )}
        >
          <div className="dashboard-layout">
            { this.renderSectionWithData(myProjects) }
          </div>
        </ToggableHeader>
        <ToggableHeader value="All Projects"
          className={ classNames('toggable-header',
            { hide : !allProjectsVisible }
          )}
          onToggleClick={this.handleAllClick}
        >
          <div className="dashboard-layout">
            { this.renderSectionWithData(allProjects) }
          </div>
        </ToggableHeader>
      </div>
    );
  }
}

AllProjects.propTypes = {
  children: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  allProjects: React.PropTypes.array,
  myProjects: React.PropTypes.array,
  allProjectsVisible: React.PropTypes.bool,
  myProjectsVisible: React.PropTypes.bool
};

export default connect(
  mapStateToProps
)(AllProjects);
