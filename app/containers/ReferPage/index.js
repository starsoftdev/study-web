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
import _ from 'lodash';

import ReferForm from '../../components/ReferForm';
import { selectReferFormError } from '../../components/ReferForm/selectors';
import { fields } from '../../components/ReferForm/validator';

import { selectCompanyTypes } from '../../containers/ReferPage/selectors';
import { submitForm, fetchCompanyTypes } from '../../containers/ReferPage/actions';
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

export class ReferPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    fetchClientSites: PropTypes.func.isRequired,
    companyTypes: PropTypes.array,
    currentUser: PropTypes.object,
    hasErrors: PropTypes.bool,
    fetchCompanyTypes: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    touchRefer: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { currentUser, fetchClientSites, fetchCompanyTypes } = this.props;
    fetchClientSites(currentUser.roleForClient.client_id);
    fetchCompanyTypes();
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
    const { siteLocations, companyTypes, currentUser } = this.props;

    return (
      <div className="container-fluid">
        <Helmet title="Refer - StudyKIK" />
        <section className="study-portal">

          <h2 className="main-heading">{translate('client.page.refer.header')}</h2>

          <div className="row form-study">
            <div className="refer-info pull-right">
              <div className="refer-holder">
                <div className="textbox text-center pull-left">
                  <strong className="title" dangerouslySetInnerHTML={{ __html: translate('client.page.refer.title') }} />
                  <p dangerouslySetInnerHTML={{ __html: translate('client.page.refer.text') }} />
                </div>
                <div className="img-holder pull-left">
                  <img src={manImage} alt="" width="256" />
                  <img className="shadow" src={shadowImage} alt="&nbsp;" width="212" height="39" />
                </div>
              </div>
            </div>

            <div className="form-holder ovh">
              <ReferForm siteLocations={siteLocations} companyTypes={companyTypes} onSubmit={this.onSubmitForm} currentUser={currentUser} />
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
    fetchClientSites: (id) => dispatch(fetchClientSites(id)),
    fetchCompanyTypes: () => dispatch(fetchCompanyTypes()),
    submitForm: (values) => dispatch(submitForm(values)),
    touchRefer: () => dispatch(touch('refer', ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferPage);
