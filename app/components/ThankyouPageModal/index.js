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

import Checkbox from '../Input/Checkbox';
import Input from '../Input/index';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { updateThankYouPage, resetThankYouPageState } from '../../containers/HomePage/AdminDashboard/actions';
import { selectThankYouPageUpdateProcess } from '../../containers/HomePage/AdminDashboard/selectors';

import { fetchLanding } from '../../containers/App/actions';
import { selectLanding } from '../../containers/App/selectors';
import formValidator, { fields } from './validator';

import './styles.less';

const formName = 'thankYouPageForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})

export class ThankyouPageModal extends React.Component {
  static propTypes = {
    submitForm: React.PropTypes.func.isRequired,
    fetchLanding:  React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
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
    this.onHide = this.onHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      selected: null,
      landingFetched: false,
      initialValuesEntered: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { resetState, onClose, fetchLanding } = this.props;

    if (newProps.studies) {
      for (const study of newProps.studies) {
        if (study.selected) {
          this.setState({
            selected: study,
          });
        }
      }
    }

    if (newProps.landing) {
      this.setState({
        landingFetched: true,
      }, () => {
        let landing = null;
        let thankYouPage = null;
        let study = null;

        if (this.props.landing) {
          study = this.props.landing;

          for (const studySource of study.studySources) {
            if (studySource.landingPage) {
              landing = studySource.landingPage;
              thankYouPage = landing.thankYouPage;
            }
          }
        }

        if (!this.state.initialValuesEntered) {
          this.props.dispatch(change(formName, 'thankyouFor', thankYouPage.thankyouFor));
          this.props.dispatch(change(formName, 'youWillBe', thankYouPage.youWillBe));
          this.props.dispatch(change(formName, 'herIsThe', thankYouPage.herIsThe));
          this.props.dispatch(change(formName, 'lookingForwardText', thankYouPage.lookingForwardText));
          this.props.dispatch(change(formName, 'isSharePhone', thankYouPage.isSharePhone));
          this.props.dispatch(change(formName, 'isShareLocation', thankYouPage.isShareLocation));
          this.props.dispatch(change(formName, 'isHideLocationData', thankYouPage.isHideLocationData));
          this.setState({
            initialValuesEntered: true,
          });
        }
      });
    }

    if (this.state.selected && newProps.openModal && !this.state.landingFetched) {
      fetchLanding(this.state.selected.study_id);
    }

    if (!newProps.thankYouPageUpdateProcess.saving && newProps.thankYouPageUpdateProcess.success) {
      fetchLanding(this.state.selected.study_id);
      resetState();
      onClose();
    }
  }

  onHide() {
    const { onClose, resetForm } = this.props;
    this.setState({
      landingFetched: false,
      initialValuesEntered: false,
    }, () => {
      resetForm();
      onClose();
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, touchFields, submitForm } = this.props;
    if (formError) {
      touchFields();
      return;
    }

    const list = Object.assign({ studyId: this.state.selected.study_id }, newList);
    submitForm(list);
  }

  render() {
    const { openModal } = this.props;

    return (
      <Collapse dimension="width" in={openModal} timeout={0} className={classNames('thankyou-slider', (this.props.isOnTop > 0 ? 'slider-on-top' : ''))}>
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Thank You Page</strong>
                <a className="btn-right-arrow" onClick={this.onHide}><i className="glyphicon glyphicon-menu-right" /></a>
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
                <div className="field-row text-right">
                  <Button bsStyle="primary" type="submit" disabled={false}>Update</Button>
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
    submitForm: (values) => dispatch(updateThankYouPage(values)),
    resetState: () => dispatch(resetThankYouPageState()),
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankyouPageModal);
