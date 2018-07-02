import React from 'react';
import BackToTopButton from '../../components/BackTopButton';
import { translate } from '../../../common/utilities/localization';

export default class CookiesAndOtherTechnologiesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  render() {
    return (
      <div id="main">
        <div className="container">
          <section className="privacy-policy">
            <header className="text-center">
              <h2 className="main-heading">{translate('corporate.page.cookiesAndOtherTechnologies.mainHeading')}</h2>
            </header>
            <p>{translate('corporate.page.cookiesAndOtherTechnologies.intro')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.cookiesAndOtherTechnologies.firstPartyCookiesTitle')}</h3>
            <p>{translate('corporate.page.cookiesAndOtherTechnologies.firstPartyCookiesText')}</p>
            <div>{translate('corporate.page.cookiesAndOtherTechnologies.firstPartyCookiesInclude1')}</div>
            <div>{translate('corporate.page.cookiesAndOtherTechnologies.firstPartyCookiesInclude2')}</div>
            <hr className="divider" />
            <h3>{translate('corporate.page.cookiesAndOtherTechnologies.webBeaconsTitle')}</h3>
            <p>{translate('corporate.page.cookiesAndOtherTechnologies.webBeaconsText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.cookiesAndOtherTechnologies.thirdPartyCookiesTitle')}</h3>
            <p>{translate('corporate.page.cookiesAndOtherTechnologies.thirdPartyCookiesText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.cookiesAndOtherTechnologies.yourCookieChoicesTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: translate('corporate.page.cookiesAndOtherTechnologies.yourCookieChoicesText') }} />
          </section>
        </div>
        <BackToTopButton />
      </div>
    );
  }
}
