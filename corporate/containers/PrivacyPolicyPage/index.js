import React from 'react';

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
              <h2 className="main-heading">PRIVACY POLICY</h2>
              <p>
                StudyKIK respects your privacy and will never sell or trade personal information provided on this Website.  Maintaining trust is paramount to us.
              </p>
            </header>
            <p>
              Effective on: 2018-03-05
            </p>
            <hr className="divider" />
            <h3>
              Introduction and Scope
            </h3>
            <p>
              Caerus Marketing Group LLC, d/b/a StudyKIK, a California limited liability company with offices located at 1675 Scenic Ave, Suite 150,
              Costa Mesa, CA 92626 (“StudyKIK,” “we,” “us,” “our”), takes the protection of personally identifiable information (“personal data”) very
              seriously. This Privacy Notice (the “Notice”) addresses data subjects whose personal data we may receive through our website located
              at <a href="http://www.studykik.com">www.studykik.com</a> and over the phone if we call you at your request.
            </p>
            <hr className="divider" />
            <h3>Controllership</h3>
            <p>
              In the context of this Notice, StudyKIK acts as a data controller for the personal data we process.
            </p>
            <hr className="divider" />
            <h3>Categories of Personal Data</h3>
            <p>
              We may process the following types of personal data:
            </p>
            <ul>
              <li>Biographical information such as your first and last name, age, and date of birth;</li>
              <li>Contact information such as your email address and phone number;</li>
              <li>Payment information including payment card numbers; and</li>
              <li>Health data (sensitive personal data), such as information about medical symptoms or prescribed medications.</li>
            </ul>
            <hr className="divider" />
            <h3>How We Receive Personal Data</h3>
            <p>
              You may provide us with personal data when you:
            </p>
            <ul>
              <li>fill out a form on our website;</li>
              <li>speak to us on the phone; or</li>
              <li>visit our website (by way of our cookies and tracking pixels).</li>
            </ul>
            <p>
              After you enter your name and contact information into the form on our website, a StudyKIK representative will call you at the phone number
              you provided. During this initial phone call, the StudyKIK representative will ask you a series of questions in order to determine your
              eligibility to participate in a variety of applicable clinical trials. Our representative will obtain your explicit consent before asking
              you any questions about your health.
            </p>
            <p>
              If you choose to participate in a clinical trial, we may also receive your personal data, including health data, from doctors working on
              behalf of clinical research organizations (CROs), in which case we will notify you, where required by applicable laws, without undue delay.
            </p>
            <hr className="divider" />
            <h3>Basis of Processing</h3>
            <p>
              Within the scope of this Notice, we may rely on one or more of the following legal grounds for processing your personal data:
            </p>
            <ul>
              <li>your explicit consent;</li>
              <li>the need to perform our obligations under a contract or to perform related pre-contractual duties at your request;</li>
              <li>the necessity to comply with our legal obligations; or</li>
              <li>the need to pursue the legitimate interests of pharmaceutical companies, such as to find better treatments for medical conditions; and</li>
              <li>any other ground, as required or permitted by law in the specific respective context.</li>
            </ul>
            <hr className="divider" />
            <h3>Purposes of Processing</h3>
            <p>
              We process personal data for the purposes of:
            </p>
            <ul>
              <li>assisting pharmaceutical companies and external CROs in finding medical study participants;</li>
              <li>enabling your use of our website and the services we provide;</li>
              <li>responding to your inquiries, and/or other requests or questions, and</li>
              <li>sending you marketing emails.</li>
            </ul>
            <hr className="divider" />
            <h3>Use of Cookies</h3>
            <p>
              We use cookies to store information on your computer. Cookies improve your navigation on this site and enhance your user experience. You may
              delete or otherwise control cookies. For more information please visit <a href="https://www.aboutcookies.org/">https://www.aboutcookies.org/</a>.
            </p>
            <hr className="divider" />
            <h3>Data Retention Periods</h3>
            <p>
              When the purposes of processing are satisfied, we will retain your data for up to one year in order to notify you of similar clinical research
              opportunities that may interest you, unless you request that we delete your data sooner. If we don’t hear from you (i.e., if you don’t request
              additional information about new clinical trials based on the information we send you) within a year, your personal data will be deleted.
            </p>
            <hr className="divider" />
            <h3>Sharing Personal Data with Third Parties</h3>
            <p>
              We may share your personal data with other entities. Such third parties may include:
            </p>
            <ul>
              <li>CROs and pharmaceutical companies, in which case the transfers of your sensitive personal data are taking place only based on your explicit consent;</li>
              <li>those providing and managing IT systems and infrastructure for StudyKIK;</li>
              <li>those providing payment processing services;</li>
              <li>those providing text messaging and communications software; and</li>
              <li>companies providing external customer support solutions.</li>
            </ul>
            <p>
              We will require that these third parties maintain at least the same level of confidentiality that we maintain for such personal data.
            </p>
            <p>
              Our service providers may be located outside of the United States; however, we will require that these third parties maintain at least
              the same level of data protection that we maintain for your personal data. StudyKIK remains liable for the protection of personal data
              that we transfer to our service providers within the scope of our Privacy Shield certification, except to the extent that we are not
              responsible for the event giving rise to any unauthorized or improper processing.
            </p>
            <hr className="divider" />
            <h3>Other Disclosure of Your personal data</h3>
            <p>
              We may disclose your personal data:
            </p>
            <ul>
              <li>
                to the extent required by law or if we have a good-faith belief that such disclosure is necessary in order to comply with official investigations
                or legal proceedings initiated by governmental and/or law enforcement officials, or private parties, including but not limited to: in response
                to subpoenas, search warrants, or court orders;
              </li>
              <li>
                if we sell or transfer all or a portion of our company’s business interests, assets, or both, or in connection with a corporate merger,
                consolidation, restructuring, or other company change; or
              </li>
              <li>to our subsidiaries or affiliates only if necessary for business and operational purposes.</li>
            </ul>
            <p>
              We reserve the right to use, transfer, sell, and share aggregated, anonymous data, which does not include any personal data, about our website
              users as a group for any legal business purpose, such as analyzing usage trends and seeking compatible advertisers, sponsors, clients, and customers.
            </p>
            <p>
              If we must disclose your personal data in order to comply with official investigations or legal proceedings initiated by governmental and/or law
              enforcement officials, we may not be able to ensure that such recipients of your personal data will maintain the privacy or security of your personal data.
            </p>
            <hr className="divider" />
            <h3>Data Integrity & Security</h3>
            <p>
              StudyKIK has implemented and will maintain technical, organizational, and physical security measures that are reasonably designed to help protect personal
              data from unauthorized processing, such as unauthorized access, disclosure, alteration, or destruction.
            </p>
            <hr className="divider" />
            <h3>Access & Review</h3>
            <p>
              If you are a data subject about whom we store personal data, you may have the right to request access to, and the opportunity to update, correct, or delete,
              such personal data. To submit such requests or raise any other questions, please use the information provided in the Contact Us section of this Notice.
            </p>
            <hr className="divider" />
            <h3>Changes to this Notice</h3>
            <p>
              If we make any material change to this Notice, we will post the revised Notice to this web page and update the “Effective” date above to reflect the date on
              which the new Notice became effective.
            </p>
            <hr className="divider" />
            <h3>EU-U.S. and Swiss-U.S. Privacy Shield Frameworks</h3>
            <p>
              With respect to personal data in the scope of this Notice, StudyKIK complies with the EU-U.S. Privacy Shield Framework and the Swiss-U.S. Privacy Shield
              Framework (the "Privacy Shield"), as adopted and set forth by the U.S. Department of Commerce regarding the processing of personal data. StudyKIK commits
              to adhere to and has certified to the Department of Commerce that it adheres to the Privacy Shield Principles.
            </p>
            <p>
              To learn more about the Privacy Shield, and to view StudyKIK’s certification, please
              visit <a href="https://www.privacyshield.gov">https://www.privacyshield.gov</a> and <a href="https://www.privacyshield.gov/list">https://www.privacyshield.gov/list</a>,
              respectively.
            </p>
            <hr className="divider" />
            <h3>VeraSafe Privacy Program</h3>
            <p>
              StudyKIK is a member of the <a href="https://www.verasafe.com/privacy-services/certification-standard/">VeraSafe Privacy Program</a>, meaning that
              with respect to personal data processed in the scope of this Notice, VeraSafe has assessed StudyKIK’s data governance and data security for compliance
              with the VeraSafe Privacy Program Certification Criteria. The certification criteria require that participants maintain a high standard for data privacy
              and implement specific best practices pertaining to notice, onward transfer, choice, access, data security, data quality, recourse, and enforcement.
            </p>
            <a id="verasafe" name="verasafelink" href="https://www.verasafe.com/index.php?option=com_content&view=article&id=19&uid=E078D133D989F27&host=windowlocationhost" target="_blank" onClick={this.handleVerasafeClick} onContextMenu={this.handleVerasafeRightClick}>
              <img name="trustseal" alt="Privacy Seal" style={{ border:0 }} src="https://d5fmvefcyrh0p.cloudfront.net/classic-trust-seal/privacy-seal-classic-140px-blue.png" />
            </a>
            <hr className="divider" />
            <h3>Dispute Resolution</h3>
            <p>
              Where a privacy complaint or dispute cannot be resolved through StudyKIK’s internal processes, StudyKIK has agreed to participate in
              the <a href="https://www.verasafe.com/privacy-services/dispute-resolution/privacy-shield-dispute-procedure/">VeraSafe Privacy Shield Dispute Resolution Procedure</a>.
              Subject to the terms of the VeraSafe Privacy Shield Dispute Resolution Procedure, VeraSafe will provide appropriate recourse free of charge to you.
              To file a complaint with VeraSafe and participate in the VeraSafe Privacy Shield Dispute Resolution Procedure, please submit the required information
              here: <a href="https://www.verasafe.com/privacy-services/dispute-resolution/submit-dispute/">https://www.verasafe.com/privacy-services/dispute-resolution/submit-dispute/</a>.
            </p>
            <hr className="divider" />
            <h3>Binding Arbitration</h3>
            <p>
              If your dispute or complaint can’t be resolved by us, nor through the dispute resolution program established by VeraSafe, you may have the right
              to require that we enter into binding arbitration with you pursuant to the Privacy Shield’s Recourse, Enforcement and Liability Principle and
              Annex I of the Privacy Shield.
            </p>
            <hr className="divider" />
            <h3>Regulatory Oversight</h3>
            <p>
              StudyKIK is subject to the investigatory and enforcement powers of the United States Federal Trade Commission.
            </p>
            <hr className="divider" />
            <h3>Contact Us</h3>
            <p>
              If you have any questions about this Notice or our processing of your personal data, please write to our Product Development Manager by email
              at mo.tan@studykik.com or by postal mail at:
            </p>
            <p>
              StudyKIK<br />
              1675 Scenic Ave, #150, Costa Mesa<br />
              CA 92626<br />
              USA<br />
              <br />
              Please allow up to four weeks for us to reply.<br />
            </p>
          </section>
        </div>
      </main>
    );
  }

}
