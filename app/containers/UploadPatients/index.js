import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { actions as toastrActions } from 'react-redux-toastr';
import _ from 'lodash';

import { fetchIndications, fetchSources, fetchClientSites } from '../../containers/App/actions';
import { selectCurrentUser, selectSiteLocations, selectSources, selectIndications } from '../App/selectors';

import { exportPatients } from './actions';

import UploadPatientsForm from '../../components/UploadPatientsForm/index';
import { normalizePhoneForServer } from '../../common/helper/functions';

export class UploadPatientsPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fetchIndications: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchSources: PropTypes.func,
    fetchPatients: PropTypes.func,
    exportPatients: PropTypes.func,
    currentUser: PropTypes.object.isRequired,
    sites: PropTypes.array,
    indications: PropTypes.array,
    sources: PropTypes.array,
    toastrActions: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentWillMount() {
    const { fetchIndications, fetchSources, fetchClientSites, currentUser } = this.props;
    fetchIndications();
    fetchSources();
    fetchClientSites(currentUser.roleForClient.client_id);
  }

  onSubmitForm(params) {
    const { exportPatients } = this.props;
    const options = _.clone(params);

    // swap out the "protocol" for the study_id for adding the patient (in reality, we're storing studyId in the protocol field,
    // since it's easier to transform and display this way while still displaying studies by protocol
    if (options.protocol) {
      options.study_id = options.protocol;
    }

    delete options.protocol;
    delete options['group-name'];
    delete options['group-email'];
    delete options['group-phone'];
    delete options['group-age'];
    delete options['group-gender'];
    delete options['group-bmi'];

    if (options.patients && options.patients.length) {
      /* normalizing the phone number */
      _.forEach(options.patients, (patient, index) => {
        _.forEach(patient, (value, key) => {
          if (value === 'N/A') {
            options.patients[index][key] = null;
          }
        });

        if (patient.phone) {
          options.patients[index].phone = normalizePhoneForServer(patient.phone);
        }
      });
    }

    exportPatients(options);
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="patient-upload">
          <Helmet title="Patient Database - StudyKIK" />
          <h2 className="main-heading">Upload Patients</h2>

          <UploadPatientsForm onSubmit={this.onSubmitForm} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  sites: selectSiteLocations(),
  indications: selectIndications(),
  sources: selectSources(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchIndications: () => dispatch(fetchIndications()),
    fetchSources: () => dispatch(fetchSources()),
    fetchClientSites: (clientId) => dispatch(fetchClientSites(clientId)),
    exportPatients: (params) => dispatch(exportPatients(params)),
    toastrActions: bindActionCreators(toastrActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPatientsPage);
