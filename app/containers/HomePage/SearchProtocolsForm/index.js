import React, { Component, PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/Input/index';

import ReactSelect from '../../../components/Input/ReactSelect';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectSearchProtocolsFormError } from './selectors';
import { selectProtocols, selectProtocolNumbers } from '../selectors';
import formValidator from './validator';
import { translate } from '../../../../common/utilities/localization';

const mapStateToProps = createStructuredSelector({
  protocols: selectProtocols(),
  protocolNumbers: selectProtocolNumbers(),
  hasError: selectSearchProtocolsFormError(),
});

@reduxForm({ form: 'searchProtocols', validate: formValidator })
@connect(mapStateToProps, null)

class SearchProtocolsForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    protocols: PropTypes.object,
    protocolNumbers: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  render() {
    const { protocols, hasError, handleSubmit } = this.props;
    const siteLocationOptions = [{ label: translate('common.constants.all'), value: 'all' }];

    const statusOptions = [{ label: translate('common.constants.all'), value: 'all' }, { label: translate('sponsor.component.searchProtocolsForm.statusActive'), value: 'active' }, { label: translate('sponsor.component.searchProtocolsForm.statusInactive'), value: 'inactive' }];


    return (

      <Form className="form-search form-search-protocols pull-left" onSubmit={handleSubmit}>

        <div className="btns-popups pull-right disabled-buttons-container">
        </div>
        <div className="fields-holder clearfix">
          <div className="pull-left custom-select">
            <div className="has-feedback">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder={translate('sponsor.component.searchProtocolsForm.search')}
                className="keyword-search"
              />
            </div>
          </div>
          <div className="pull-left custom-select">
            <Field
              name="indication"
              component={ReactSelect}
              placeholder={translate('sponsor.component.searchProtocolsForm.siteLocationPlaceholder')}
              options={siteLocationOptions}
              disabled={protocols.fetching}
              onChange={(e) => { this.props.onSubmit({ indication: e }); }}
            />
          </div>
          <div className="pull-left custom-select">
            <Field
              name="cro"
              component={ReactSelect}
              placeholder={translate('sponsor.component.searchProtocolsForm.statusPlaceholder')}
              options={statusOptions}
              disabled={protocols.fetching}
              onChange={(e) => { this.props.onSubmit({ cro: e }); }}
            />
          </div>
          <div className="hidden">
            <button type="submit" className="btn btn-primary btn-search" disabled={protocols.fetching || hasError}>
              {(protocols.fetching)
                ? <LoadingSpinner showOnlyIcon size={20} />
                : <span>{translate('sponsor.component.searchProtocolsForm.search')}</span>
              }
            </button>
          </div>
        </div>
      </Form>

    );
  }
}

export default SearchProtocolsForm;
