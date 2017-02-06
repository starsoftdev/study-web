import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/Input';
import LoadingSpinner from 'components/LoadingSpinner';
import formValidator from './validator';
import { selectEditProtocolProcess } from 'containers/SponsorManageUsers/selectors';

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
            <label>Protocol Number</label>
          </strong>
          <div className="field">
            <Field
              name="protocolNumber"
              component={Input}
              type="text"img
              placeholder="Protocol"
              isDisabled
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>INDICATION</label>
          </strong>
          <div className="field">
            <Field
              name="indication"
              component={Input}
              type="text"
              placeholder="Indication"
              isDisabled
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>CRO</label>
          </strong>
          <div className="field">
            <Field
              name="cro"
              component={Input}
              type="text"
              placeholder="CRO"
              isDisabled
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>IRB</label>
          </strong>
          <div className="field">
            <Field
              name="irb"
              component={Input}
              type="text"
              placeholder="IRB"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>IWRS</label>
          </strong>
          <div className="field">
            <Field
              name="iwrs"
              component={Input}
              type="text"
              placeholder="IWRS"
            />
          </div>
        </div>

        <div className="field-row label-top">
          <strong className="label required"><label htmlFor="clinicaltrialGovLink">STUDY AD</label></strong>
          <div className="field">
            { this.state.fileSrc && <img alt="" className="protocol-study-img" src={this.state.fileSrc} /> }
            <label htmlFor="study_file" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn" />
            <Field
              id="study_file"
              name="file"
              component={Input}
              onChange={this.handleFileChange}
              type="file"
            />
            <strong className="label lfilename"><label className="filename" htmlFor="irb_filename">{this.state.fileName}</label></strong>
          </div>
        </div>

        <div className="btn-block btns text-right">
          <button type="submit" className="btn btn-default" disabled={this.props.editProtocolProcess.saving}>
            {this.props.editProtocolProcess.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{'Update'}</span>
            }
          </button>
        </div>

      </form>
    );
  }
}

export default EditProtocolForm;
