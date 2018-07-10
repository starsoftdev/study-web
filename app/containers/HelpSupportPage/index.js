/*
 *
 * HelpSupportPage
 *
 */


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { touch } from 'redux-form';
import _ from 'lodash';

import HelpAndSupportForm from '../../components/HelpAndSupportForm';
import { selectHelpAndSupportFormError } from '../../components/HelpAndSupportForm/selectors';
import { fields } from '../../components/HelpAndSupportForm/validator';

import { submitForm } from '../../containers/HelpSupportPage/actions';
import {
  fetchClientSites,
} from '../../containers/App/actions';
import {
  selectSiteLocations,
  selectCurrentUser,
} from '../../containers/App/selectors';

import manImage from '../../assets/images/man.svg';
import shadowImage from '../../assets/images/shadow.png';
import { translate } from '../../../common/utilities/localization';

export class HelpSupportPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    siteLocations: PropTypes.array,
    fetchClientSites: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    hasErrors: PropTypes.bool,
    submitForm: PropTypes.func.isRequired,
    touchHelpAndSupport: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { currentUser, fetchClientSites } = this.props;
    fetchClientSites(currentUser.roleForClient.client_id);
  }

  onSubmitForm = (values) => {
    if (this.props.hasErrors) {
      this.props.touchHelpAndSupport();
      return;
    }
    const siteLocation = _.find(this.props.siteLocations, { id: values.siteLocation });
    const newValues = {
      siteLocationName: siteLocation.name,
      user_id: this.props.currentUser.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      siteLocation: values.siteLocation,
      message: values.message,
      companyName: 'Help',
      companyType: 'Support',
      isHelp: true,
    };
    this.props.submitForm(newValues);
  }

  render() {
    const { siteLocations, currentUser } = this.props;

    return (
      <div className="container-fluid helpAndSupportPage">
        <Helmet title="Help and Support - StudyKIK" />
        <section className="study-portal">
          <h2 className="main-heading">{translate('client.page.helpSupport.header')}</h2>
          <div className="row form-study">
            <div className="refer-info pull-right">
              <div className="refer-holder">
                <div className="textbox text-center pull-left">
                  <strong className="title help-support-info">{translate('client.page.helpSupport.friendlyStaff')}</strong>
                </div>
                <div className="img-holder pull-left">
                  <img src={manImage} alt="" width="256" />
                  <img className="shadow" src={shadowImage} alt="&nbsp;" width="212" height="39" />
                </div>
              </div>
            </div>
            <div className="form-holder ovh">
              <HelpAndSupportForm siteLocations={siteLocations} onSubmit={this.onSubmitForm} currentUser={currentUser} />
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
  hasErrors: selectHelpAndSupportFormError(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (id) => dispatch(fetchClientSites(id)),
    submitForm: (values) => dispatch(submitForm(values)),
    touchHelpAndSupport: () => dispatch(touch('helpAndSupport', ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpSupportPage);
