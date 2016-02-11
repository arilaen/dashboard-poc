import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as actions from '../actions/ProjectActions';
import { getResource } from '../utils/api';

import ToggableHeader from '../components/ToggableHeader';
import ProjectSummary from '../components/ProjectSummary';

function mapStateToProps(state) {
  return {
    Projects: state.allProjects
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
    dispatch(actions.fetchAllProjects());
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
        <div className="dashboard-col -single">
          <ProjectSummary data={project} />
        </div>
    );
  }

  render() {
    const { children, Projects } = this.props;
    const data = [];
    const { myProjects, allProjects } = data;
    return (
      <div className="projects-container">
        <ToggableHeader
          value="My Projects"
          onToggleClick={this.handleMyClick}
          className={ classNames('toggable-header', { hide : !Projects.myProjectsVisible })}
        >
          <div className="dashboard-layout">
            { this.renderSectionWithData(myProjects) }
          </div>
        </ToggableHeader>
        <ToggableHeader value="All Projects"
          className={ classNames('toggable-header', { hide : !Projects.allProjectsVisible })}
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
  Projects: React.PropTypes.object
};

export default connect(
  mapStateToProps
)(AllProjects);
