import React from 'react';
import BackToTopButton from '../../components/BackTopButton';
import { translate } from '../../../common/utilities/localization';

export default class PrivacyPolicyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  componentDidMount() {
    // insert verasafe script
    const vsScript = document.createElement('script');
    vsScript.src = 'https://www.verasafe.com/trustseal/seal.js';
    document.body.appendChild(vsScript);
  }

  handleVerasafeClick = () => {
    const nonwin = (navigator.appName !== 'Microsoft Internet Explorer') ? 'yes' : 'no';
    const vsLink = document.getElementById('verasafe');

    window.open(vsLink.href.replace('windowlocationhost', window.location.hostname), 'VeraSafeTrustVerification', `location=${nonwin},scrollbars=yes,width=700,height=${screen.availHeight},menubar=no,toolbar=no`);

    return false;
  }

  handleVerasafeRightClick = () => {
    const d = new Date();

    alert(`Copying Prohibited by Law - This image and all included logos are copyrighted by VeraSafe © ${d.getFullYear()}.`);

    return false;
  }

  render() {
    return (
      <main id="main">
        <div className="container">
          <section className="privacy-policy">
            <header className="text-center">
              <h2 className="main-heading">{translate('corporate.page.privacyPolicy.header')}</h2>
              <p>{translate('corporate.page.privacyPolicy.headerText')}</p>
            </header>
            <p>{translate('corporate.page.privacyPolicy.effective')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.introductionAndScopeTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.introductionAndScopeText') }} />
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.controllershipTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.controllershipText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.categoriesTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.categoriesText')}</p>
            <ul dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.categoriesListItems') }} />
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.receiveTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.receiveText')}</p>
            <ul dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.receiveList') }} />
            <p>{translate('corporate.page.privacyPolicy.receiveDescription')}</p>
            <p>{translate('corporate.page.privacyPolicy.receiveNote')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.processingTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.processingText')}</p>
            <ul dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.processingListItems') }} />
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.purposesTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.purposesText')}</p>
            <ul dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.purposesListItems') }} />
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.cookiesTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.cookiesText') }} />
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.retentionTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.retentionText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.sharingTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.sharingText')}</p>
            <ul dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.sharingListItems') }} />
            <p>{translate('corporate.page.privacyPolicy.sharingNoteRequire')}</p>
            <p>{translate('corporate.page.privacyPolicy.sharingNoteService')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.disclosureTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.disclosureText')}</p>
            <ul dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.disclosureListItems') }} />
            <p>{translate('corporate.page.privacyPolicy.disclosureNoteReserve')}</p>
            <p>{translate('corporate.page.privacyPolicy.disclosureNoteDisclose')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.integrityTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.integrityText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.accessReviewTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.accessReviewText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.changesTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.changesText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.frameworksTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.frameworksText')}</p>
            <p dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.frameworksNote') }} />
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.veraSafeTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.veraSafeText') }} />
            <a id="verasafe" name="verasafelink" href="https://www.verasafe.com/index.php?option=com_content&view=article&id=19&uid=E078D133D989F27&host=windowlocationhost" target="_blank" onClick={this.handleVerasafeClick} onContextMenu={this.handleVerasafeRightClick}>
              <img name="trustseal" alt="Privacy Seal" style={{ border:0 }} src="https://d5fmvefcyrh0p.cloudfront.net/classic-trust-seal/privacy-seal-classic-140px-blue.png" />
            </a>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.disputeTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.disputeText') }} />
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.bindingTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.bindingText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.regulatoryTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.regulatoryText')}</p>
            <hr className="divider" />
            <h3>{translate('corporate.page.privacyPolicy.contactTitle')}</h3>
            <p>{translate('corporate.page.privacyPolicy.contactText')}</p>
            <p dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyPolicy.contactNote') }} />
          </section>
        </div>
        <BackToTopButton />
      </main>
    );
  }

}
