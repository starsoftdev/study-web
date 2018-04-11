import React from 'react';

import { translate } from '../../../common/utilities/localization';
import FormSubscribe from './FormSubscribe';
import FooterNavBar from './FooterNavBar';
import SocialNetworks from './SocialNetworks';

export default class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: React.PropTypes.any,
  };

  render() {
    const { pathname } = this.props.location;
    const copyrightData = { year: (new Date()).getFullYear() };
    return (
      <footer id="footer">
        {(pathname === '/') > 0 &&
          <FormSubscribe />
        }
        <div className="footer-holder">
          <div className="container-fluid">
            <div className="clearfix">
              <p className="copyright pull-left">{translate('corporate.component.footer.copyright', copyrightData)}</p>
              <FooterNavBar />
              <SocialNetworks />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
