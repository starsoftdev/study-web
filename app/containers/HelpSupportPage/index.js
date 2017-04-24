/*
 *
 * HelpSupportPage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

export default class HelpSupportPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="container-fluid">
        <Helmet title="HelpSupport - StudyKIK" />
        <section className="study-portal">
          <h2 className="main-heading">Help And Support</h2>
        </section>
      </div>
    );
  }
}
