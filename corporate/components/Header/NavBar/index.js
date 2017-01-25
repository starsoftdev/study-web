import React from 'react';
import { Link } from 'react-router';
import { Well, Collapse } from 'react-bootstrap';
import classNames from 'classnames';

const menuItems = [
  { text: 'Study search', link: '/' },
  { text: 'List your trials', link: '/list-your-trials' },
  { text: 'About', link: '/about' },
  { text: 'Blog', link: '/blog' },
  { text: 'Contact', link: '/contact' },
];

export default class NavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    menuCollapsed: React.PropTypes.any,
    location: React.PropTypes.any,
  };

  componentDidMount() {}

  componentWillReceiveProps() {}

  render() {
    const { menuCollapsed } = this.props;
    const { pathname } = this.props.location;
    return (
      <Collapse className="navbar-collapse holder" in={!menuCollapsed}>
        <Well>
          <ul className="nav navbar-nav">
            {
              menuItems.map((item, index) =>
                <li
                  key={index}
                  className={classNames({ active: (pathname === item.link) })}
                >
                  <Link
                    to={item.link}
                    title={item.text}
                  >
                    <div>{item.text.toUpperCase()}</div>
                  </Link>
                </li>
              )
            }
          </ul>
        </Well>
      </Collapse>
    );
  }
}
