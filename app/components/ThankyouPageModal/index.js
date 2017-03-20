/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from '../Input/Checkbox';
import Input from '../Input/index';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, touch, change } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
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
    // console.log('componentWillReceiveProps', newProps, this.state);
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

        // console.log('thankYouPage', thankYouPage);

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
      <Collapse dimension="width" in={openModal} timeout={250} className="thankyou-slider">
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Thank You Page</strong>
                <a href="#" className="btn-right-arrow" onClick={this.onHide}><i className="glyphicon glyphicon-menu-right"></i></a>
              </div>
            </div>
            <Form
              className="holder"
              onSubmit={this.handleSubmit}
              noValidate="novalidate"
            >
              <div className="frame">
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Thank You For...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="thankyouFor"
                      id="thankyou-for"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">You Will be...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="you-will-be"
                      name="youWillBe"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-email">Site Location</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="checkbox"
                      name="isShareLocation"
                      component={Checkbox}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Phone</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="checkbox"
                      name="isSharePhone"
                      component={Checkbox}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Here is the...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="here-is-the"
                      name="herIsThe"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Looking Forward to...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="lookingForwardText"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Hide</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="checkbox"
                      name="isHideLocationData"
                      component={Checkbox}
                      checked
                    />
                  </div>
                </div>
                <div className="field-row text-right">
                  <Button bsStyle="primary" type="submit" disabled={false}>Submit</Button>
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
