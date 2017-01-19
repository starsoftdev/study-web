import React from 'react';
import { Link } from 'react-router';

const menuItems = [
  { text: 'Study search', link: '/' },
  { text: 'List your trials', link: '/list-your-trials' },
  { text: 'About', link: '/about' },
  { text: 'Blog', link: '/blog' },
  { text: 'Contact', link: '/contact' },
];

function NavBar() {
  return (
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
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

export default NavBar;
