import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, reset, touch, blur } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import Input from '../../../app/components/Input/index';
import ReactSelect from '../../../app/components/Input/ReactSelect';
import CenteredModal from '../../../app/components/CenteredModal/index';
import { selectSyncErrorBool, selectValues } from '../../../app/common/selectors/form.selector';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../app/common/helper/functions';
import formValidator, { fields } from './validator';

import {
  listSiteNow,
} from '../../../app/containers/App/actions';

const formName = 'listNowForm';

function mapDispatchToProps(dispatch) {
  return {
    blur: (field, value) => dispatch(blur(formName, field, value)),
    submitForm: (values) => dispatch(listSiteNow(values)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(null, mapDispatchToProps)

class ListNowModal extends React.Component {
  static propTypes = {
    blur: React.PropTypes.func.isRequired,
    submitForm: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
    formError: React.PropTypes.bool.isRequired,
    newList: React.PropTypes.any,
    touchFields: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onHide = this.onHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  onHide() {
    const { onHide, resetForm } = this.props;
    resetForm();
    onHide();
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, touchFields, submitForm } = this.props;
    if (formError) {
      touchFields();
      return;
    }

    const list = Object.assign({}, newList);
    /* normalizing the phone number */
    list.phone = normalizePhoneForServer(newList.phone);

    submitForm(list);
  }

  render() {
    const companyTypes = [{
      id: 1,
      name: 'Company Type',
    }, {
      id: 2,
      name: 'CRO',
    }, {
      id: 3,
      name: 'Research Site',
    }, {
      id: 4,
      name: 'Sponsor',
    }, {
      id: 5,
      name: 'Vendor / Media',
    }];
    return (
      <Modal
        show={this.props.show}
        form={formName}
        id="list-now"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>list now</strong>
          </Modal.Title>
          <a className="close" onClick={this.onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-holder jcf--scrollable">
            <span className="text">
              Please provide your information below and a StudyKIK Project Manager will contact you shortly to get your study listed!
            </span>
            <Form
              className="form-lightbox"
              onSubmit={this.handleSubmit}
              noValidate="novalidate"
            >
              <div className="field-row">
                <Field
                  name="name"
                  placeholder="*Full Name"
                  component={Input}
                  type="text"
                  className="field-row"
                  id=""
                  required
                />
              </div>
              <div className="field-row">
                <Field
                  name="company"
                  placeholder="*Company Name"
                  component={Input}
                  type="text"
                  className="field-row"
                  id=""
                  required
                />
              </div>
              <div className="field-row">
                <Field
                  name="companyType"
                  placeholder="*Company Type"
                  component={ReactSelect}
                  options={companyTypes}
                  className="field-row"
                  id=""
                  required
                />
              </div>
              <div className="field-row">
                <Field
                  name="email"
                  component={Input}
                  placeholder="*Email"
                  type="text"
                  className="field-row"
                  id=""
                  required
                />
              </div>
              <div className="field-row">
                <Field
                  name="phone"
                  placeholder="*Phone"
                  component={Input}
                  type="text"
                  className="field-row"
                  id=""
                  required
                  onBlur={this.onPhoneBlur}
                />
              </div>
              <div className="text-right">
                <Button type="submit" disabled={false}>Submit</Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  newList: selectValues(formName),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListNowModal);
