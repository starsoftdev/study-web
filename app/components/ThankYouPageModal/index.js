/**
 * Created by mike on 10/11/16.
 */

import classNames from 'classnames';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, touch, change } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import Checkbox from '../Input/Checkbox';
import Input from '../Input/index';
import LoadingSpinner from '../LoadingSpinner';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { updateThankYouPage, resetThankYouPageState } from '../../containers/HomePage/AdminDashboard/actions';
import { selectThankYouPageUpdateProcess } from '../../containers/HomePage/AdminDashboard/selectors';

import { fetchLanding } from '../../containers/App/actions';
import { selectLanding } from '../../containers/App/selectors';
import formValidator, { fields } from './validator';

const formName = 'thankYouPageForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})

export class ThankYouPageModal extends React.Component {
  static propTypes = {
    submitForm: React.PropTypes.func.isRequired,
    fetchLanding:  React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
    openModal: React.PropTypes.bool.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    resetState: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    studies: React.PropTypes.any,
    newList: React.PropTypes.any,
    landing: React.PropTypes.object,
    thankYouPageUpdateProcess: React.PropTypes.any,
    touchFields: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    isOnTop: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      initialValuesEntered: false,
    };
  }

  componentWillMount() {
    const { studies, fetchLanding } = this.props;

    if (studies) {
      const selected = _.find(studies, { selected: true });
      if (selected) {
        fetchLanding(selected.study_id);
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { resetState, onClose, change } = this.props;

    if (newProps.landing) {
      const landing = newProps.landing;
      const thankYouPage = landing.thankYouPage;

      if (!this.state.initialValuesEntered) {
        this.setState({
          initialValuesEntered: true,
        }, () => {
          change('thankyouFor', thankYouPage.thankyouFor);
          change('youWillBe', thankYouPage.youWillBe);
          change('herIsThe', thankYouPage.herIsThe);
          change('lookingForwardText', thankYouPage.lookingForwardText);
          change('isSharePhone', thankYouPage.isSharePhone);
          change('isShareLocation', thankYouPage.isShareLocation);
          change('isHideLocationData', thankYouPage.isHideLocationData);
          change('visitOurWebsiteText', thankYouPage.visitOurWebsiteText);
          change('websiteLink', thankYouPage.websiteLink);
          change('cns', thankYouPage.cns);
        });
      }
    }

    if (!newProps.thankYouPageUpdateProcess.saving && newProps.thankYouPageUpdateProcess.success) {
      resetState();
      onClose();
    }
  }

  componentWillUnmount() {
    const { onClose, resetForm } = this.props;
    resetForm();
    onClose();
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, touchFields, submitForm, studies } = this.props;
    const selected = _.find(studies, { selected: true });
    if (formError) {
      touchFields();
      return;
    }

    const list = Object.assign({ studyId: selected.study_id }, newList);
    list.cns = newList.cns || null;
    submitForm(list);
  }

  render() {
    const { openModal, onClose } = this.props;

    return (
      <Collapse dimension="width" in={openModal} timeout={0} className={classNames('thankyou-slider', (this.props.isOnTop > 0 ? 'slider-on-top' : ''))}>
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Thank You Page</strong>
                <a className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right" /></a>
              </div>
            </div>
            <Form
              className="holder thank-you-holder"
              onSubmit={this.handleSubmit}
              noValidate="novalidate"
            >
              <div className="frame">
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Thank You For...</label>
                  </strong>
                  <Field
                    type="text"
                    name="thankyouFor"
                    className="field"
                    id="thankyou-for"
                    component={Input}
                  />
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">You Will be...</label>
                  </strong>
                  <Field
                    type="text"
                    id="you-will-be"
                    className="field"
                    name="youWillBe"
                    component={Input}
                    required
                  />
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-email">Site Location</label>
                  </strong>
                  <Field
                    type="checkbox"
                    name="isShareLocation"
                    className="field"
                    component={Checkbox}
                  />
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Phone</label>
                  </strong>
                  <Field
                    type="checkbox"
                    name="isSharePhone"
                    className="field"
                    component={Checkbox}
                  />
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Here is the...</label>
                  </strong>
                  <Field
                    type="text"
                    id="here-is-the"
                    className="field"
                    name="herIsThe"
                    component={Input}
                  />
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Looking Forward to...</label>
                  </strong>
                  <Field
                    type="text"
                    name="lookingForwardText"
                    className="field"
                    component={Input}
                  />
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Hide</label>
                  </strong>
                  <Field
                    type="checkbox"
                    name="isHideLocationData"
                    className="field"
                    component={Checkbox}
                    checked
                  />
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Visit Our Website...</label>
                  </strong>
                  <Field
                    type="text"
                    name="visitOurWebsiteText"
                    className="field"
                    component={Input}
                  />
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Link</label>
                  </strong>
                  <Field
                    type="text"
                    name="websiteLink"
                    className="field"
                    component={Input}
                  />
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">CNS CODE</label>
                  </strong>
                  <Field
                    type="text"
                    name="cns"
                    className="field"
                    component={Input}
                  />
                </div>
                <div className="field-row text-right">
                  <Button type="submit" bsStyle="primary" className="fixed-small-btn">
                    {this.props.thankYouPageUpdateProcess.saving
                      ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
                      : <span>Update</span>
                    }
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Collapse>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  newList: selectValues(formName),
  landing: selectLanding(),
  thankYouPageUpdateProcess: selectThankYouPageUpdateProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    submitForm: (values) => dispatch(updateThankYouPage(values)),
    resetState: () => dispatch(resetThankYouPageState()),
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouPageModal);
