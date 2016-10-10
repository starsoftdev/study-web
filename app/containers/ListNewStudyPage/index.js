/*
 *
 * ListNewStudyPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';
import ShoppingCartForm from 'components/ShoppingCartForm';
import ListNewStudyForm from 'components/ListNewStudyForm';
import { selectListNewStudyPageDomain } from 'containers/ListNewStudyPage/selectors';
import { selectListNewStudyFormValues } from 'components/ListNewStudyForm/selectors';
import { CAMPAIGN_LENGTH_LIST, MESSAGING_SUITE_PRICE, CALL_TRACKING_PRICE } from 'common/constants';
import { find } from 'lodash';

import Helmet from 'react-helmet';
import {
  fetchSites,
  fetchIndications,
  fetchLevels,
} from 'containers/App/actions';
import {
  selectSiteLocations,
  selectIndications,
  selectStudyLevels,
  selectSites,
} from 'containers/App/selectors';

export class ListNewStudyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    siteLocations: PropTypes.array,
    fullSiteLocations: PropTypes.array,
    indications: PropTypes.array,
    studyLevels: PropTypes.array,
    fetchSites: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchLevels: PropTypes.func,
    listNewStudyState: PropTypes.object,
    formValues: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.fetchIndications();
    this.props.fetchLevels();
  }

  onSubmitForm() {

  }

  render() {
    const { siteLocations, indications, studyLevels, formValues, fullSiteLocations } = this.props;

    const addOns = [];
    const level = find(studyLevels, { id: formValues.level_id });
    const months = find(CAMPAIGN_LENGTH_LIST, { value: formValues.campaignLength });

    if (level && months) {
      addOns.push({
        title: `${months.label} ${level.type}`,
        price: level.price,
        quantity: months.value,
        total: level.price * months.value,
      });
    }

    if (formValues.addPatientMessagingSuite) {
      addOns.push({
        title: 'Patient Messaging Suite',
        price: MESSAGING_SUITE_PRICE,
        quantity: 1,
        total: MESSAGING_SUITE_PRICE,
      });
    }

    if (formValues.callTracking) {
      addOns.push({
        title: 'Call Tracking',
        price: CALL_TRACKING_PRICE,
        quantity: 1,
        total: CALL_TRACKING_PRICE,
      });
    }

    return (
      <StickyContainer className="container-fluid">
        <Helmet title="List New Study - StudyKIK" />
        <section className="study-portal">

          <h2 className="main-heading">LIST NEW STUDY</h2>

          <div className="row form-study">

            <div className="col-xs-6 form-holder">
              <ListNewStudyForm
                formValues={formValues}
                fullSiteLocations={fullSiteLocations}
                siteLocations={siteLocations}
                indications={indications}
                studyLevels={studyLevels}
                listNewStudyState={this.props.listNewStudyState}
              />
            </div>

            <div className="fixed-block">
              <div className="fixed-block-holder">
                <Sticky className="sticky-shopping-cart">
                  {<ShoppingCartForm showCards addOns={addOns} onSubmit={this.onSubmitForm} />}
                </Sticky>
              </div>
            </div>

          </div>
        </section>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  fullSiteLocations : selectSites(),
  indications   : selectIndications(),
  studyLevels   : selectStudyLevels(),
  listNewStudyState : selectListNewStudyPageDomain(),
  formValues: selectListNewStudyFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    fetchIndications: () => dispatch(fetchIndications()),
    fetchLevels:      () => dispatch(fetchLevels()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNewStudyPage);
