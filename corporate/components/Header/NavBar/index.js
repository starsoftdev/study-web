import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

const menuItems = [
  { text: 'Study search', link: '/' },
  { text: 'List your trials', link: '/list-your-trials' },
  { text: 'About', link: '/about' },
  { text: 'Blog', link: '/blog' },
  { text: 'Contact', link: '/contact' },
];

export default class NavBar extends React.Component {

  static propTypes = {
    menuCollapsed: React.PropTypes.any,
  };

  componentDidMount() {}

  componentWillReceiveProps() {}

  render() {
    // TODO: add 'collapsing' state to show menu opening animation
    const { menuCollapsed } = this.props;
    return (
      <div
        ref={(menu) => { this.menu = menu; }}
        className={classNames('navbar-collapse collapse', { in: !menuCollapsed })}
        id="bs-example-navbar-collapse-1"
      >
        <ul className="nav navbar-nav">
          {
            menuItems.map((item, index) =>
              <li key={index}>
                <Link to={item.link} title={item.text}>
                  <div>{item.text.toUpperCase()}</div>
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}
