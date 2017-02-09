import React, { Component, PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import _, { map } from 'lodash';
import ReactSelect from 'components/Input/ReactSelect';
import { selectSearchProtocolsFormError } from './selectors';
import { selectProtocols, selectProtocolNumbers, selectIndications } from 'containers/HomePage/selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';

const mapStateToProps = createStructuredSelector({
  // clientSites: selectClientSites(),
  protocols: selectProtocols(),
  protocolNumbers: selectProtocolNumbers(),
  indications: selectIndications(),
  hasError: selectSearchProtocolsFormError(),
});

@reduxForm({ form: 'searchProtocols', validate: formValidator })
@connect(mapStateToProps, null)

class SearchProtocolsForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    // clientSites: PropTypes.object,
    protocols: PropTypes.object,
    protocolNumbers: PropTypes.object,
    indications: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  render() {
    const { protocols, hasError, handleSubmit, protocolNumbers, indications } = this.props;
    const protocolNumberOptions = [{ label: 'All', value: 'all' }].concat(map(protocolNumbers.details, row => ({
      label: row.protocolNumber,
      value: row.protocolNumber,
    })));
    const indicationOptions = [{ label: 'All', value: 'all' }].concat(map(indications.details, row => ({
      label: row.name,
      value: row.id,
    })));

    let croOptions = [{ label: 'All', value: 'all' }].concat(map(protocols.details, row => ({
      label: row.croName,
      value: row.croName,
    })));

    croOptions = _.uniqBy(croOptions, 'value');

    return (

      <Form className="form-search form-search-protocols pull-left" onSubmit={handleSubmit}>

        <div className="btns-popups pull-right disabled-buttons-container">
          <div className="col pull-right">
            <button disabled className="btn btn-primary download"><i className="icomoon-icon_creditcard"></i> ADD CREDITS</button>
          </div>
          <div className="col pull-right">
            <button disabled className="btn btn-primary download">+ List New Protocol</button>
          </div>
        </div>
        <div className="fields-holder clearfix">
          <div className="pull-left custom-select">
            <Field
              name="protocol"
              component={ReactSelect}
              placeholder="Select Protocol"
              options={protocolNumberOptions}
              disabled={protocols.fetching}
              onChange={(e) => { this.props.onSubmit({ protocol: e }); }}
            />
          </div>
          <div className="pull-left custom-select">
            <Field
              name="indication"
              component={ReactSelect}
              placeholder="Select Indication"
              options={indicationOptions}
              disabled={protocols.fetching}
              onChange={(e) => { this.props.onSubmit({ indication: e }); }}
            />
          </div>
          <div className="pull-left custom-select">
            <Field
              name="cro"
              component={ReactSelect}
              placeholder="Select CRO"
              options={croOptions}
              disabled={protocols.fetching}
              onChange={(e) => { this.props.onSubmit({ cro: e }); }}
            />
          </div>
          <div className="hidden">
            <button type="submit" className="btn btn-primary btn-search" disabled={protocols.fetching || hasError}>
              {(protocols.fetching)
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

export default SearchProtocolsForm;
