import React from 'react';
import BackToTopButton from '../../components/BackTopButton';
import { translate } from '../../../common/utilities/localization';

export default class TermsAndConditionsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  render() {
    return (
      <div id="main">
        <div className="container">
          <section className="privacy-policy">
            <header className="text-center">
              <h2 className="main-heading">{translate('corporate.page.termsAndConditions.mainHeading')}</h2>
              <p>{translate('corporate.page.termsAndConditions.heading')}</p>
            </header>
            <hr className="divider" />
            <h3>{translate('corporate.page.termsAndConditions.deliveryTitle')}</h3>
            <p>{translate('corporate.page.termsAndConditions.deliveryText')}</p>
            <p>{translate('corporate.page.termsAndConditions.deliveryNote')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.termsAndConditions.disclaimerTitle')}</h3>
            <p>{translate('corporate.page.termsAndConditions.disclaimerText')}</p>
            <p>{translate('corporate.page.termsAndConditions.disclaimerNote')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.termsAndConditions.restrictionsTitle')}</h3>
            <p>{translate('corporate.page.termsAndConditions.restrictionsText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.termsAndConditions.liabilityTitle')}</h3>
            <p>{translate('corporate.page.termsAndConditions.liabilityText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.termsAndConditions.listedTitle')}</h3>
            <p>{translate('corporate.page.termsAndConditions.listedText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.termsAndConditions.submissionsTitle')}</h3>
            <p>{translate('corporate.page.termsAndConditions.submissionsText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.termsAndConditions.refundTitle')}</h3>
            <p>{translate('corporate.page.termsAndConditions.refundText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.termsAndConditions.terminationTitle')}</h3>
            <p>{translate('corporate.page.termsAndConditions.terminationText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.termsAndConditions.miscellaneousTitle')}</h3>
            <p>{translate('corporate.page.termsAndConditions.miscellaneousText')}</p>
          </section>
        </div>
        <BackToTopButton />
      </div>
    );
  }
}
