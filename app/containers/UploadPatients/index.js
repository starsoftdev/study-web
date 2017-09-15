import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _, { map, omit, omitBy, isUndefined } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { actions as toastrActions } from 'react-redux-toastr';

import { fetchIndications, fetchSources, fetchClientSites } from '../../containers/App/actions';
import { selectCurrentUser, selectSiteLocations, selectSources, selectIndications } from '../App/selectors';

import UploadPatientsForm from '../../components/UploadPatientsForm/index';

export class UploadPatientsPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fetchIndications: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchSources: PropTypes.func,
    fetchPatients: PropTypes.func,
    currentUser: PropTypes.object.isRequired,
    sites: PropTypes.array,
    indications: PropTypes.array,
    sources: PropTypes.array,
    toastrActions: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchIndications, fetchSources, fetchClientSites, currentUser } = this.props;
    fetchIndications();
    fetchSources();
    fetchClientSites(currentUser.roleForClient.client_id);
  }

  componentWillReceiveProps(newProps) {
    const { currentUser, socket } = this.props;

    // console.log('componentWillReceiveProps', newProps);
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="patient-upload">
          <Helmet title="Patient Database - StudyKIK" />
          <h2 className="main-heading">Upload Patients</h2>

          <UploadPatientsForm />
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
    toastrActions: bindActionCreators(toastrActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPatientsPage);
