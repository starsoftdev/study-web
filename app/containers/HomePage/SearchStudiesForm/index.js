import React, { Component, PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import { map } from 'lodash';

import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectClientSites } from '../../App/selectors';
import { selectStudies } from '../selectors';
import { selectSearchStudiesFormError, selectSearchStudiesFormValues } from './selectors';
import formValidator from './validator';
import { ACTIVE_STATUS_VALUE, INACTIVE_STATUS_VALUE } from '../constants';

const mapStateToProps = createStructuredSelector({
  clientSites: selectClientSites(),
  studies: selectStudies(),
  hasError: selectSearchStudiesFormError(),
  formValues: selectSearchStudiesFormValues(),
});

@reduxForm({ form: 'searchStudies', validate: formValidator })
@connect(mapStateToProps, null)

class SearchStudiesForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientSites: PropTypes.object,
    studies: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    formValues: PropTypes.object,
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { currentUser } = this.props;
    let bDisabled = true;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = (currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin') ? null : true;
      if (bDisabled) {
        const nLocation = currentUser.roleForClient.site_id ? currentUser.roleForClient.site_id : null;
        this.props.dispatch(change('searchStudies', 'site', nLocation));
        this.performSearch(currentUser.roleForClient.site_id, 'site');
      }
    }
  }

  performSearch(e, name) {
    const params = this.props.formValues;
    if (e && e.target) {
      params[e.target.name] = e.target.value;
      this.props.onSubmit(params, true);
    } else {
      params[name] = e;
      this.props.onSubmit(params);
    }
  }

  render() {
    const { clientSites, studies, hasError, handleSubmit, currentUser } = this.props;
    let bDisabled = true;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = !(currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin');
    }
    const siteOptions = [{ label: 'All', value: '0' }].concat(map(clientSites.details, siteIterator => ({
      label: siteIterator.name,
      value: siteIterator.id,
    })));
    const statusOptions = [{ label: 'All', value: '0' },
                           { label: 'Active', value: ACTIVE_STATUS_VALUE },
                           { label: 'Inactive', value: INACTIVE_STATUS_VALUE }];

    return (
      <Form className="form-search form-search-studies pull-left" onSubmit={handleSubmit}>
        <div className="fields-holder clearfix">
          <div className="search-area pull-left">
            <div className="field">
              <Button className="btn-enter" type="submit">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                onChange={(e) => this.performSearch(e, 'name')}
                type="text"
                className="keyword-search"
                placeholder="Search"
                disabled={clientSites.fetching || studies.fetching}
              />
            </div>
          </div>
          <div className="pull-left custom-select">
            <Field
              name="site"
              component={ReactSelect}
              placeholder="Select Site Location"
              options={siteOptions}
              onChange={(e) => this.performSearch(e, 'site')}
              disabled={clientSites.fetching || studies.fetching || bDisabled}
            />
          </div>
          <div className="pull-left custom-select">
            <Field
              name="status"
              component={ReactSelect}
              placeholder="Select Status"
              options={statusOptions}
              onChange={(e) => this.performSearch(e, 'status')}
              disabled={clientSites.fetching || studies.fetching}
            />
          </div>
          <div className="hidden">
            <button type="submit" className="btn btn-primary btn-search" disabled={clientSites.fetching || studies.fetching || hasError}>
              {(studies.fetching)
                ? <LoadingSpinner showOnlyIcon size={20} />
                : <span>Search</span>
              }
            </button>
          </div>
        </div>
      </Form>
    );
  }
}

export default SearchStudiesForm;
