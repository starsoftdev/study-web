/*
 *
 * ReferPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { touch } from 'redux-form';

import ReferForm from 'components/ReferForm';
import { selectReferFormError } from 'components/ReferForm/selectors';
import { fields } from 'components/ReferForm/validator';

import { selectCompanyTypes } from 'containers/ReferPage/selectors';
import { submitForm, fetchCompanyTypes } from 'containers/ReferPage/actions';
import {
  fetchSites,
} from 'containers/App/actions';
import {
  selectSiteLocations,
  selectCurrentUser,
} from 'containers/App/selectors';

import manImage from 'assets/images/man.svg';
import shadowImage from 'assets/images/shadow.png';

import _ from 'lodash';

export class ReferPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    fetchSites: PropTypes.func,
    companyTypes: PropTypes.array,
    currentUser: PropTypes.object,
    hasErrors: PropTypes.bool,
    fetchCompanyTypes: PropTypes.func,
    submitForm: PropTypes.func,
    touchRefer: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.fetchCompanyTypes();
  }

  onSubmitForm = (values) => {
    if (this.props.hasErrors) {
      this.props.touchRefer();
      return;
    }
    const siteLocation = _.find(this.props.siteLocations, { id: values.siteLocation });
    const newValues = {
      siteLocationName: siteLocation.name,
      user_id: this.props.currentUser.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      companyType: values.companyType,
      companyName: values.companyName,
      siteLocation: values.siteLocation,
      message: values.message,
    };
    this.props.submitForm(newValues);
  }

  render() {
    const { siteLocations, companyTypes } = this.props;

    return (
      <div className="container-fluid">
        <Helmet title="Refer - StudyKIK" />
        <section className="study-portal">

          <h2 className="main-heading">REFER</h2>

          <div className="row form-study">
            <div className="refer-info pull-right">
              <div className="refer-holder">
                <div className="textbox text-center pull-left">
                  <strong className="title">
                    Refer a new site<br />
                    or Sponsor/CRO<br />
                    project manager by <br />
                    entering their contact!
                  </strong>
                  <p>
                    When they list a Platinum Study or<br />
                    higher, you will receive 100 reward.<br />
                    If they list a multi-site (10+) <br />
                    central recruitment you will <br />
                    receive 300 <br />
                    reward KIKs!
                  </p>
                </div>
                <div className="img-holder pull-left">
                  <img src={manImage} alt="" width="256" />
                  <img className="shadow" src={shadowImage} alt="&nbsp;" width="212" height="39" />
                </div>
              </div>
            </div>

            <div className="form-holder ovh">
              <ReferForm siteLocations={siteLocations} companyTypes={companyTypes} onSubmit={this.onSubmitForm} />
            </div>

          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  currentUser: selectCurrentUser(),
  companyTypes: selectCompanyTypes(),
  hasErrors: selectReferFormError(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    fetchCompanyTypes: () => dispatch(fetchCompanyTypes()),
    submitForm: (values) => dispatch(submitForm(values)),
    touchRefer: () => dispatch(touch('refer', ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferPage);
