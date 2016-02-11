import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */
import { Link } from 'react-router';

export default class ListMenu extends React.Component {

  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.state = {
      open: props.open
    };
  }

  showMenu() {
    this.setState({
      open: true
    });
  }

  hideMenu() {
    this.setState({
      open: false
    });
  }

  renderProjectList() {
    const { data } = this.props;
    const clientListIcon =
      '<svg class="icon icon-navicon"><use xlink:href="#icon-navicon"></use></svg>';
    const listItemIcon =
      '<svg class="icon icon-angle-right"><use xlink:href="#icon-angle-right"></use></svg>';
    return data.map((item) => {
      return (
        <div className="list-section">
        <h3 className="name">{item.company}</h3>
        <ul className="items">
          {item.projects.map(projectName => {
            return (
              <li className="list-item">
                <Link to={`/all-projects/${projectName}`} title={projectName}>
                  <span className="item-name">{ projectName }</span>
                  <span dangerouslySetInnerHTML={{ __html: listItemIcon }} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      );
    });
  }

  render() {
    const clientListIcon =
      '<svg class="icon icon-navicon"><use xlink:href="#icon-navicon"></use></svg>';
    const listItemIcon =
      '<svg class="icon icon-angle-right"><use xlink:href="#icon-angle-right"></use></svg>';

    return (this.state.open ?
      <div className="list-menu">
        <button className="list-toggle -open" onClick={ this.hideMenu }>
          <span dangerouslySetInnerHTML={{ __html: clientListIcon }} />
          Hide Client List
        </button>
        <ul className="items -core">
          <li className="list-item -core">
            <Link to="/at-a-glance" title="Cantina At-A-Glance">
              <span className="item-name">Cantina At-A-Glance</span>
              <span dangerouslySetInnerHTML={{ __html: listItemIcon }} />
            </Link>
          </li>
          <li className="list-item -core">
            <Link to="/all-projects" title="All Projects">
              <span className="item-name">All Projects</span>
              <span dangerouslySetInnerHTML={{ __html: listItemIcon }} />
            </Link>
          </li>
        </ul>
        { this.renderProjectList() }
      </div>
    :
      <button className="list-toggle" onClick={ this.showMenu }>
        <span dangerouslySetInnerHTML={{ __html: clientListIcon }} />
        Show Client List
      </button>
    );
  }
}

ListMenu.propTypes = {
  data: React.PropTypes.array.isRequired,
  open: React.PropTypes.bool.isRequired
};
