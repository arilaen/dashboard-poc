import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */
import { Link } from 'react-router';
import Header from '../components/Header';

export default class CoreLayout extends React.Component {

  render() {
    const { children } = this.props;
    return (
      <div className="main-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="content-container">
          { children }
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.object
};
