import React from 'react';
import BackToTopButton from '../../components/BackTopButton';
import { translate } from '../../../common/utilities/localization';

export default class PQS extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  componentDidMount() {
  }

  render() {
    return (
      <main id="main">
        <div className="container">
          <section className="privacy-policy">
            <header className="text-center">
              <h2 className="main-heading">{translate('corporate.page.pqs.header')}</h2>
            </header>
            <p>
              {translate('corporate.page.pqs.intro1')}
            </p>
            <p>
              {translate('corporate.page.pqs.intro2')}
            </p>
            <br />
            <h3>{translate('corporate.page.pqs.heading1')}</h3>
            <ul>
              <li>{translate('corporate.page.pqs.heading1list1')}</li>
              <li>{translate('corporate.page.pqs.heading1list2')}</li>
              <li>{translate('corporate.page.pqs.heading1list3')}</li>
              <li>{translate('corporate.page.pqs.heading1list4')}</li>
              <li>{translate('corporate.page.pqs.heading1list5')}</li>
              <li>{translate('corporate.page.pqs.heading1list6')}</li>
              <li>{translate('corporate.page.pqs.heading1list7')}</li>
            </ul>
            <p>{translate('corporate.page.pqs.heading1paragrah')}</p>
            <br />
            <h3>{translate('corporate.page.pqs.heading2')}</h3>
            <p>
              {translate('corporate.page.pqs.heading2paragrah')}
            </p>
          </section>
        </div>
        <BackToTopButton />
      </main>
    );
  }

}
