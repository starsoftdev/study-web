import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { map, omit, omitBy, isUndefined } from 'lodash';

import SearchPatientsForm from 'containers/PatientDatabasePage/SearchPatientsForm/index';
import PatientsList from 'containers/PatientDatabasePage/PatientsList/index';
import { fetchIndications, fetchSources } from 'containers/App/actions';
import { fetchPatientCategories, fetchPatients } from './actions';
import './styles.less';

export class PatientDatabasePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fetchIndications: PropTypes.func,
    fetchSources: PropTypes.func,
    fetchPatientCategories: PropTypes.func,
    fetchPatients: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.searchPatients = this.searchPatients.bind(this);
  }

  componentWillMount() {
    this.props.fetchIndications();
    this.props.fetchSources();
    this.props.fetchPatientCategories();
    this.props.fetchPatients();
  }

  searchPatients(searchFilter) {
    const queryParams = omit(omitBy(searchFilter, isUndefined), ['includeIndication', 'excludeIndication']);

    if (searchFilter.includeIndication) {
      queryParams.includeIndication = map(searchFilter.includeIndication, i => i.value).join(',');
    }
    if (searchFilter.excludeIndication) {
      queryParams.excludeIndication = map(searchFilter.excludeIndication, i => i.value).join(',');
    }

    this.props.fetchPatients(queryParams);
  }

  render() {
    return (
      <div className="patient-database-page">
        <div className="container-fluid">
          <Helmet title="Patient Database - StudyKIK" />
          <h2 className="main-heading">Patient Database</h2>
          <section className="actions-panel">
            <div className="form-group clearfix">
              <div className="additional-actions btns pull-right">
                <button type="button" className="btn btn-primary btn-blast">
                  <i className="fa fa-comments-o" aria-hidden="true" />
                  <span>Text/Email Blast</span>
                </button>
                <button type="button" className="btn btn-primary btn-import">
                  <i className="fa fa-upload" aria-hidden="true" />
                  <span>Import</span>
                </button>
                <button type="button" className="btn btn-primary btn-download">
                  <i className="fa fa-download" aria-hidden="true" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </section>
          <section className="form-group">
            <SearchPatientsForm onSubmit={this.searchPatients} />
          </section>
          <section className="form-group">
            <PatientsList />
          </section>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchIndications: () => dispatch(fetchIndications()),
    fetchSources: () => dispatch(fetchSources()),
    fetchPatientCategories: searchParams => dispatch(fetchPatientCategories(searchParams)),
    fetchPatients: searchParams => dispatch(fetchPatients(searchParams)),
  };
}

export default connect(null, mapDispatchToProps)(PatientDatabasePage);
