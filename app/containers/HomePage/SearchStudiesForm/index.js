import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import { selectSearchStudiesFormError } from './selectors';
import { selectClientSites } from 'containers/App/selectors';
import { selectStudies } from 'containers/HomePage/selectors';
import formValidator from './validator';
import { ACTIVE_STATUS_VALUE, INACTIVE_STATUS_VALUE } from 'containers/HomePage/constants';
import LoadingSpinner from 'components/LoadingSpinner';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  clientSites: selectClientSites(),
  studies: selectStudies(),
  hasError: selectSearchStudiesFormError(),
});

@reduxForm({ form: 'searchStudies', validate: formValidator })
@connect(mapStateToProps, null)

class SearchStudiesForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientSites: PropTypes.object,
    studies: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  render() {
    const { clientSites, studies, hasError, handleSubmit } = this.props;
    const siteOptions = map(clientSites.details, siteIterator => ({
      label: siteIterator.name,
      value: siteIterator.id,
    }));
    const statusOptions = [{ label: 'Active', value: ACTIVE_STATUS_VALUE }, { label: 'Inactive', value: INACTIVE_STATUS_VALUE }];

    return (
      <form className="form-search-studies" onSubmit={handleSubmit}>
        <div className="search-studies">
          <div className="row form-group">
            <div className="col-sm-3">
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder="Search Name..."
                disabled={clientSites.fetching || studies.fetching}
              />
            </div>
            <div className="col-sm-3">
              <Field
                name="site"
                component={ReactSelect}
                placeholder="Select Site Location"
                options={siteOptions}
                disabled={clientSites.fetching || studies.fetching}
              />
            </div>
            <div className="col-sm-3">
              <Field
                name="status"
                component={ReactSelect}
                placeholder="Select Status"
                options={statusOptions}
                disabled={clientSites.fetching || studies.fetching}
              />
            </div>
            <div className="col-sm-3">
              <button type="submit" className="btn btn-primary btn-search" disabled={clientSites.fetching || studies.fetching || hasError}>
                {(studies.fetching)
                  ? <LoadingSpinner showOnlyIcon size={20} className="fetching-studies" />
                  : <span>Search</span>
                }
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchStudiesForm;
