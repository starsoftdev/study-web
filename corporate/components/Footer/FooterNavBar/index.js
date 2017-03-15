import React from 'react';
import { Link } from 'react-router';

const menuItems = [
  { text: 'Privacy Policy', link: '/privacy-policy' },
  { text: 'Terms & Conditions', link: '/terms-and-conditions' },
  { text: 'Sitemap', link: '/sitemap' },
  { text: 'RSS Feeds', link: '/rss' },
];

function FooterNavBar() {
  return (
    <ul className="list-inline pull-left footer-nav">
      {
        menuItems.map((item, index) =>
          <li key={index}>
            <Link to={item.link}>{item.text}</Link>
          </li>
        )
      }
    </ul>
  );
}

export default FooterNavBar;
