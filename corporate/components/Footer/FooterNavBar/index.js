import React from 'react';
import { Link } from 'react-router';
import { translate } from '../../../../common/utilities/localization';

const menuItems = [
  { text: translate('corporate.component.footer.privacy'), link: '/privacy-policy' },
  { text: translate('corporate.component.footer.terms'), link: '/terms-and-conditions' },
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
