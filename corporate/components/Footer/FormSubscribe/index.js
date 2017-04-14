/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';
import { Well, Collapse } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, touch, blur } from 'redux-form';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../../app/common/helper/functions';
import { selectSyncErrorBool, selectValues } from '../../../../app/common/selectors/form.selector';

import {
  selectLearnAboutFutureTrialsSuccess,
} from '../../../../app/containers/App/selectors';

import Input from '../../../../app/components/Input/index';

import {
  learnAboutFutureTrials,
  resetLearnAboutFutureTrialsSuccess,
} from '../../../../app/containers/App/actions';
import formValidator, { fields } from './validator';

const formName = 'learnAboutFuture';

function mapDispatchToProps(dispatch) {
  return {
    blur: (field, value) => dispatch(blur(formName, field, value)),
    submitForm: (values) => dispatch(learnAboutFutureTrials(values)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
    resetLearnAboutFutureTrialsSuccess: () => dispatch(resetLearnAboutFutureTrialsSuccess()),
  };
}

@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(null, mapDispatchToProps)

export class FormSubscribe extends React.Component {
  static propTypes = {
    blur: React.PropTypes.func.isRequired,
    submitForm: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    newSubscriber: React.PropTypes.any,
    touchFields: React.PropTypes.func.isRequired,
    learnAboutFutureTrialsSuccess: React.PropTypes.any,
    resetLearnAboutFutureTrialsSuccess: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.onMouseOverHandler = this.onMouseOverHandler.bind(this);
    this.onMouseOutHandler = this.onMouseOutHandler.bind(this);
    this.handleCollapseProcess = this.handleCollapseProcess.bind(this);
    this.handleCollapseEnd = this.handleCollapseEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);

    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.learnAboutFutureTrialsSuccess) {
      this.props.resetForm();
      this.props.resetLearnAboutFutureTrialsSuccess();
    }
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  // TODO: need to refactor DOM operations below
  onMouseOverHandler() {
    document.getElementById('closeFormButton').classList.add('focused');
  }

  onMouseOutHandler() {
    document.getElementById('closeFormButton').classList.remove('focused');
  }

  handleCollapseProcess() {
    document.getElementById('closeFormButton').classList.add('focused');
  }

  handleCollapseEnd() {
    document.getElementById('closeFormButton').classList.remove('focused');
  }

  handleClick(ev) {
    ev.preventDefault();
    this.setState({ open: !this.state.open }, () => {
      this.button.classList.toggle('collapsed');
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newSubscriber, touchFields, submitForm } = this.props;
    if (formError) {
      touchFields();
      return;
    }

    const subscriber = Object.assign({}, newSubscriber);
    /* normalizing the phone number */
    subscriber.phone = normalizePhoneForServer(newSubscriber.phone);

    submitForm(subscriber);
  }

  render() {
    return (
      <form
        className="form-subscribe"
        action="#"
        noValidate="novalidate"
        onSubmit={this.handleSubmit}
      >
        <div className="container">
          <strong className="title pull-left">
            <button
              className="btn btn-primary close collapsed pull-right visible-xs"
              ref={(button) => { this.button = button; }}
              id="closeFormButton"
              onClick={this.handleClick}
              onMouseOut={this.onMouseOutHandler}
              onMouseOver={this.onMouseOverHandler}
            >
              <span className="plus"></span>
            </button>
            Learn About Future Clinical Trials
          </strong>
          <Collapse
            className="holder"
            in={this.state.open}
            onEnter={this.handleCollapseProcess}
            onExit={this.handleCollapseProcess}
            onEntered={this.handleCollapseEnd}
            onExited={this.handleCollapseEnd}
          >
            <Well>
              <input type="submit" className="btn btn-default pull-right" value="submit" />
              <div className="fields-area">
                <div className="col-xs-4">
                  <Field
                    name="name"
                    placeholder="* Full Name"
                    component={Input}
                    type="text"
                    className="field"
                    id=""
                    required
                  />
                </div>
                <div className="col-xs-4">
                  <Field
                    name="email"
                    placeholder="* Email"
                    component={Input}
                    type="email"
                    className="field"
                    id=""
                    required
                  />
                </div>
                <div className="col-xs-4">
                  <Field
                    name="phone"
                    placeholder="* Mobile Phone"
                    component={Input}
                    type="tel"
                    className="field"
                    id=""
                    required
                    onBlur={this.onPhoneBlur}
                  />
                </div>
              </div>
            </Well>
          </Collapse>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  newSubscriber: selectValues(formName),
  learnAboutFutureTrialsSuccess: selectLearnAboutFutureTrialsSuccess(),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSubscribe);
