import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, touch } from 'redux-form';
import { normalizePhone } from '../../../app/common/helper/functions';
import { selectSyncErrorBool, selectValues } from '../../../app/common/selectors/form.selector';

import {
  selectNewContactSuccess,
} from '../../../app/containers/App/selectors';

import Input from '../../../app/components/Input/index';

import {
  newContact,
  resetNewContactSuccess,
} from '../../../app/containers/App/actions';

import inViewport from 'in-viewport';
import { Link } from 'react-router';

import img17 from '../../assets/images/img17.svg';
import img18 from '../../assets/images/img18.svg';
import imgWifi from '../../assets/images/wifi.svg';

import './styles.less';

const formName = 'contactForm';
import formValidator, { fields } from './validator';
@reduxForm({
  form: formName,
  validate: formValidator,
})

export class ContactPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    submitForm: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    newContact: React.PropTypes.any,
    touchFields: React.PropTypes.func.isRequired,
    newContactSuccess: React.PropTypes.any,
    resetNewContactSuccess: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.watcher = inViewport(this.animatedForm, this.setVisible);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.newContactSuccess) {
      this.props.resetForm();
      this.props.resetNewContactSuccess();
    }
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newContact, touchFields, submitForm } = this.props;
    if (formError) {
      touchFields();
      return;
    }

    const contact = Object.assign({}, newContact);
    /* normalizing the phone number */
    contact.phone = normalizePhone(newContact.phone);

    submitForm(contact);
  }

  render() {
    return (
      <div id="main">
        <div className="container">
          <h2 className="main-heading alt text-center small-font">
            STUDYKIK IS DEDICATED TO HELPING PEOPLE FIND CLINICAL TRIALS IN THEIR AREA. IF YOU WISH TO HAVE VOLUNTEERS
            FIND YOUR CLINICAL TRIALS, <Link to="/" title="find your clinical trials">CLICK HERE</Link>
          </h2>
          <form
            ref={(animatedForm) => { this.animatedForm = animatedForm; }}
            action="#"
            className="form-contact"
            noValidate="novalidate"
            data-view="fadeInUp"
            onSubmit={this.handleSubmit}
          >
            <div className="form-holder">
              <p className="text-center txt-green">To speak with one of our friendly staff members, please contact us.</p>
              <div className="row contact-info">
                <div className="col-xs-4">
                  <h3 className="txt-orange"><i className="icomoon-phone txt-orange"></i> PHONE</h3>
                  <a href="tel:8776272509">877.627.2509</a>
                </div>
                <div className="col-xs-4">
                  <h3 className="txt-orange"><i className="icomoon-map-marker txt-orange"></i> LOCATION</h3>
                  <address>1675 Scenic Ave <br /> Suite 150 <br /> Costa Mesa, Ca 92626</address>
                </div>
                <div className="col-xs-4 pull-right col">

                  <h3 className="txt-orange"><i className="icomoon-envelope txt-orange"></i> EMAIL</h3>
                  <a href="mailto:info@studykik.com" className="email">info@studykik.com</a>
                </div>
              </div>
              <Field
                name="name"
                placeholder="* Full Name"
                component={Input}
                type="text"
                className="field"
                bsClass="form-control input-lg"
                id=""
                required
              />
              <Field
                name="email"
                placeholder="* Email"
                component={Input}
                type="email"
                className="field"
                bsClass="form-control input-lg"
                id=""
                required
              />
              <Field
                name="phone"
                placeholder="* Mobile Phone"
                component={Input}
                type="tel"
                className="field"
                bsClass="form-control input-lg"
                id=""
                required
              />
              <Field
                name="message"
                placeholder="* Message"
                component={Input}
                className="field"
                bsClass="form-control input-lg"
                componentClass="textarea"
              />
              <input type="submit" className="btn btn-default btn-block input-lg" value="Submit" />
              <div className="image left">
                <img src={img17} alt="&nbsp;" width="351" height="437" className="svg" />
                <span className="wifi">
                  <img src={imgWifi} alt="&nbsp;" width="40" className="svg" />
                </span>
              </div>
              <div className="image right">
                <img src={img18} alt="&nbsp;" width="380" height="480" className="svg" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  newContact: selectValues(formName),
  newContactSuccess: selectNewContactSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitForm: (values) => dispatch(newContact(values)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
    resetNewContactSuccess: () => dispatch(resetNewContactSuccess()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
