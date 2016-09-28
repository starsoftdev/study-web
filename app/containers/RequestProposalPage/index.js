/*
 *
 * RequestProposalPage
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';
import Helmet from 'react-helmet';

import RequestProposalForm from 'components/RequestProposalForm';
import RequestProposalCart from 'components/RequestProposalCart';
import GlobalNotifications from 'containers/GlobalNotifications';

import {
  fetchSites,
  fetchIndications,
  fetchLevels,
} from 'containers/App/actions';
import {
  selectSiteLocations,
  selectIndications,
  selectStudyLevels,
} from 'containers/App/selectors';

import { submitForm } from 'containers/RequestProposalPage/actions';

export class RequestProposalPage extends Component {
  static propTypes = {
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    studyLevels: PropTypes.array,
    fetchSites: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchLevels: PropTypes.func,
    onSubmitForm: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.fetchIndications();
    this.props.fetchLevels();
  }

  render() {
    const { siteLocations, indications, studyLevels } = this.props;
    const events = [
      {
        events: [
          'twilio-message'
        ],
        raw: { pathname: this.props.location.pathname },
        cb: (err, data) => {
          console.log('received', err, data)
        }
      },
      {
        events: [
          'create-patient',
        ],
        raw: { pathname: this.props.location.pathname },
        cb: (err, data) => {
          console.log('received', err, data)
        }
      }
    ]

    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Request Proposal - StudyKIK" />
        <section className="study-portal">

          <h2 className="main-heading">REQUEST PROPOSAL</h2>

          <div className="row form-study">

            <div className="col-xs-6 form-holder">
              <RequestProposalForm
                siteLocations={siteLocations}
                indications={indications}
                studyLevels={studyLevels}
              />
            </div>

            <div className="fixed-block">
              <div className="fixed-block-holder">
                <Sticky className="sticky-shopping-cart">
                {/* this will be replaced with a new shopping cart component */}
                  <RequestProposalCart onSubmit={this.onSubmitForm} />

                </Sticky>
              </div>
            </div>

          </div>
        </section>
        {<GlobalNotifications {...this.props} events={events} />}
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  indications   : selectIndications(),
  studyLevels   : selectStudyLevels(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    fetchIndications: () => dispatch(fetchIndications()),
    fetchLevels:      () => dispatch(fetchLevels()),
    onSubmitForm:     (values) => dispatch(submitForm(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestProposalPage);
