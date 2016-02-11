import React, { PropTypes } from 'react';
import Immutable from 'immutable';

export default class ProjectsView extends React.Component {
  static propTypes = {
    projects:      PropTypes.instanceOf(Immutable.List).isRequired,
    editProject:   PropTypes.func.isRequired
  };

  render() {
    const btnStyle = {
      margin: '1em 0 1em 1em'
    };

    return (
      <div id="project-list">
        {
          this.props.projects.map((project, index) =>
            <div style={btnStyle} key={index}>
              <span>{project}</span>
            </div>
          )
        }
      </div>
    );
  }
}
