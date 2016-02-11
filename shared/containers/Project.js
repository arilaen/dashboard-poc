import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */

export default class Project extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <div className="project-container">
        <h1>This is will be a project page</h1>
        { children }
      </div>
    );
  }
}

Project.propTypes = {
  children: React.PropTypes.object
};
