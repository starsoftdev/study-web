import React, { Component, PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

import ReactSelect from '../../../components/Input/ReactSelect';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectSearchProtocolsFormError } from './selectors';
import { selectProtocols, selectProtocolNumbers, selectIndications } from '../selectors';
import formValidator from './validator';
import { translate } from '../../../../common/utilities/localization';

const mapStateToProps = createStructuredSelector({
  protocols: selectProtocols(),
  protocolNumbers: selectProtocolNumbers(),
  indications: selectIndications(),
  hasError: selectSearchProtocolsFormError(),
});

@reduxForm({ form: 'searchProtocols', validate: formValidator })
@connect(mapStateToProps, null)

class SearchProtocolsForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    protocols: PropTypes.object,
    protocolNumbers: PropTypes.object,
    indications: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  render() {
    const { protocols, hasError, handleSubmit, protocolNumbers, indications } = this.props;
    const protocolNumberOptions = [{ label: translate('common.constants.all'), value: 'all' }].concat(protocolNumbers.details.map(row => ({
      label: row.number,
      value: row.number,
    })));
    const indicationOptions = [{ label: translate('common.constants.all'), value: 'all' }].concat(indications.details.map(row => ({
      label: row.name,
      value: row.id,
    })));

    let croOptions = [{ label: translate('common.constants.all'), value: 'all' }].concat(protocols.details.filter(protocol => ((
      protocol.croName
    ))).map(row => ({
      label: row.croName,
      value: row.croName,
    })));

    croOptions = _.uniqBy(croOptions, 'value');

    return (

      <Form className="form-search form-search-protocols pull-left" onSubmit={handleSubmit}>

        <div className="btns-popups pull-right disabled-buttons-container">
        </div>
        <div className="fields-holder clearfix">
          <div className="pull-left custom-select">
            <Field
              name="protocol"
              component={ReactSelect}
              placeholder={translate('sponsor.component.searchProtocolsForm.protocolPlaceholder')}
              options={protocolNumberOptions}
              disabled={protocols.fetching}
              onChange={(e) => { this.props.onSubmit({ protocol: e }); }}
            />
          </div>
          <div className="pull-left custom-select">
            <Field
              name="indication"
              component={ReactSelect}
              placeholder={translate('sponsor.component.searchProtocolsForm.indicationPlaceholder')}
              options={indicationOptions}
              disabled={protocols.fetching}
              onChange={(e) => { this.props.onSubmit({ indication: e }); }}
            />
          </div>
          <div className="pull-left custom-select">
            <Field
              name="cro"
              component={ReactSelect}
              placeholder={translate('sponsor.component.searchProtocolsForm.croPlaceholder')}
              options={croOptions}
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
