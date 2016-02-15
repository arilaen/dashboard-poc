import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */
import Isvg from 'react-inlinesvg';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.timeOfDayGreeting = this.timeOfDayGreeting.bind(this);
  }

  timeOfDayGreeting() {
    const dateLoaded = new Date();
    const hours = dateLoaded.getHours();
    if (hours < 12) {
      return 'Good morning';
    } else if (hours < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  render() {
    return (
      <header className="primary-header">
        <a className="logo" href="/">
          <Isvg src="../../assets/images/cantina-logo.svg" />
        </a>
        <div className="pull-left current-product">
          { /* TODO: This will be replaced with a dropdown component */ }
          <span className="product-name">PM DASHBOARD</span>
        </div>

        <div className="pull-right user-admin">
          { /* TODO: This will be replaced with a login/logout component */ }
          { this.timeOfDayGreeting() }
          <span className="user-name">Jon Snow!</span>
          <a href="#" className="user-logout">Logout</a>
        </div>
      </header>
    );
  }
}
