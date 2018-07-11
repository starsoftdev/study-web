import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectEditProtocolProcess } from '../selectors';
import formValidator from './validator';
import { translate } from '../../../../common/utilities/localization';

const mapStateToProps = createStructuredSelector({
  editProtocolProcess: selectEditProtocolProcess(),
});

@reduxForm({ form: 'editProtocolForm', validate: formValidator })
@connect(mapStateToProps, null)

class EditProtocolForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object,
    handleSubmit: PropTypes.func,
    editProtocolProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      fileName: '',
      fileSrc: this.props.item.image || null,
    };

    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(e) {
    if (e.target.files[0]) {
      this.setState({ fileName: e.target.files[0].name, fileSrc: URL.createObjectURL(e.target.files[0]) });
    }
  }

  render() {
    return (
      <form className="form-study form-lightbox" onSubmit={this.props.handleSubmit}>
        <div className="field-row">
          <strong className="label">
            <label>{translate('client.component.editProtocolForm.labelProtocol')}</label>
          </strong>
          <div className="field">
            <Field
              name="protocolNumber"
              component={Input}
              type="text"img
              placeholder={translate('client.component.editProtocolForm.placeholderProtocol')}
              isDisabled
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>{translate('client.component.editProtocolForm.labelIndication')}</label>
          </strong>
          <div className="field">
            <Field
              name="indication"
              component={Input}
              type="text"
              placeholder={translate('client.component.editProtocolForm.placeholderIndication')}
              isDisabled
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>{translate('client.component.editProtocolForm.labelCro')}</label>
          </strong>
          <div className="field">
            <Field
              name="cro"
              component={Input}
              type="text"
              isDisabled
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>{translate('client.component.editProtocolForm.labelIrb')}</label>
          </strong>
          <div className="field">
            <Field
              name="irb"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>{translate('client.component.editProtocolForm.labelIwrs')}</label>
          </strong>
          <div className="field">
            <Field
              name="iwrs"
              component={Input}
              type="text"
            />
          </div>
        </div>
        <div className="btn-block btns text-right">
          <button type="submit" className="btn btn-default" disabled={this.props.editProtocolProcess.saving}>
            {this.props.editProtocolProcess.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{translate('client.component.editProtocolForm.update')}</span>
            }
          </button>
        </div>

      </form>
    );
  }
}

export default EditProtocolForm;
