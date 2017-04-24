/*
 *
 * VideoPage
 *
 */
import React from 'react';
import Helmet from 'react-helmet';

export default class HelpSupportPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="container-fluid">
        <Helmet title="Videos - StudyKIK" />
        <section className="study-portal">
          <h2 className="main-heading">Videos</h2>
        </section>
      </div>
    );
  }
}
