import React, { PropTypes }   from 'react';
import Immutable              from 'immutable';

export default class ProjectsView extends React.Component {
  static propTypes = {
    Projects:         PropTypes.instanceOf(Immutable.List).isRequired,
    editProject:   PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
  };

  handleDelete = (e) => {
    const id = Number(e.target.dataset.id);

    this.props.deleteProject(id);
  };

  handleEdit = (e) => {
    const id         = Number(e.target.dataset.id);
    const currentVal = this.props.Projects.get(id);

    // For a cutting edge UX
    let text = window.prompt('', currentVal);

    this.props.editProject(id, text);
  };

  render() {
    const btnStyle = {
      'margin': '1em 0 1em 1em'
    };

    return (
      <div id="Projects-list">
        {
          this.props.Projects.map(function (Project, index) {
            return (
              <div style={btnStyle} key={index}>
                <span>{Project}</span>

                <button style={btnStyle} data-id={index} onClick={this.handleDelete}>X</button>
                <button style={btnStyle} data-id={index} onClick={this.handleEdit}>Edit</button>
              </div>
            );
          }.bind(this))
        }
      </div>
    );
  }
}
