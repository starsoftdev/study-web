import React from 'react';
import { Well, Collapse } from 'react-bootstrap';
const enhanceWithClickOutside = require('react-click-outside');

import defaultImage from 'assets/images/Default-User-Img-Dr.png';

export class loggedUserMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    logout: React.PropTypes.func,
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.switchUserDrop = this.switchUserDrop.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);

    this.state = {
      loggedDropCollapsed: true,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  handleClickOutside() {
    if (!this.state.loggedDropCollapsed) {
      this.setState({ loggedDropCollapsed: true }, () => {
        this.loggedUserArea.classList.remove('active');
      });
    }
  }

  handleLogoutClick(ev) {
    ev.preventDefault();
    this.props.logout();
  }

  switchUserDrop(ev) {
    ev.preventDefault();
    this.setState({ loggedDropCollapsed: !this.state.loggedDropCollapsed }, () => {
      this.loggedUserArea.classList.toggle('active');
    });
  }

  render() {
    const { user } = this.props;
    const { loggedDropCollapsed } = this.state;
    const fullName = (user) ? `${user.firstName} ${user.lastName}` : '';
    const profileImageURL = (user && user.profileImageURL) ? user.profileImageURL : defaultImage;
    return (
      <div
        className="logged-user-area open-close"
        ref={(loggedUserArea) => { this.loggedUserArea = loggedUserArea; }}
      >
        <a
          className="opener"
          href="#"
          onClick={this.switchUserDrop}
        >
          <div className="img-circle">
            <img src={profileImageURL} alt={fullName} width="43" height="43" />
          </div>
          <span className="text">{fullName}</span>
          <i className="caret"></i>
        </a>
        <Collapse className="slide logged-user-drop" in={!loggedDropCollapsed}>
          <Well>
            <ul className="list-unstyled jcf-scrollable text-left">
              <li><a href="/app">Portal</a></li>
              <li><a href="#" onClick={this.handleLogoutClick}>Log out</a></li>
            </ul>
          </Well>
        </Collapse>
      </div>
    );
  }
}

export default enhanceWithClickOutside(loggedUserMenu);