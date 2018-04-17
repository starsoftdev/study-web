import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Form from 'react-bootstrap/lib/Form';
import _ from 'lodash';

import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, reset, change, blur } from 'redux-form';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import Input from '../Input/index';
import LoadingSpinner from '../LoadingSpinner';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { fetchLanding } from '../../containers/App/actions';
import { selectLanding } from '../../containers/App/selectors';
import {
  updateFacebookLandingPage,
  resetLandingPageState,
  changeStudyAd,
} from '../../containers/HomePage/AdminDashboard/actions';
import {
  selectFacebookLandingPageUpdateProcess,
} from '../../containers/HomePage/AdminDashboard/selectors';

const formName = 'leadGenForm';

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    blur: (field, value) => dispatch(blur(formName, field, value)),
    submitForm: (values) => dispatch(updateFacebookLandingPage(values)),
    resetState: () => dispatch(resetLandingPageState()),
    submitStudyAd: (values) => dispatch(changeStudyAd(values)),
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    resetForm: () => dispatch(reset(formName)),
  };
}

@reduxForm({
  form: formName,
})
@connect(null, mapDispatchToProps)

export class LeadGenModal extends React.Component {
  static propTypes = {
    submitForm: React.PropTypes.func.isRequired,
    fetchLanding:  React.PropTypes.func.isRequired,
    openModal: React.PropTypes.bool.isRequired,
    change: React.PropTypes.func.isRequired,
    blur: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    resetState: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    studies: React.PropTypes.any,
    newList: React.PropTypes.any,
    landing: React.PropTypes.object,
    updateFacebookLandingPageProcess: React.PropTypes.any,
    submitStudyAd: React.PropTypes.func.isRequired,
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
    const { onClose, change } = this.props;

    if (newProps.landing) {
      const landing = newProps.landing;

      if (!this.state.initialValuesEntered) {
        this.setState({
          initialValuesEntered: true,
        }, () => {
          change('facebookPageId', landing.facebookLandingForm ? landing.facebookLandingForm.facebookPage.facebookPageId : '');
          change('facebookPageToken', landing.facebookLandingForm ? landing.facebookLandingForm.facebookPage.facebookPageToken : '');
          change('facebookFormName', landing.facebookLandingForm ? landing.facebookLandingForm.facebookFormName : '');
          change('facebookFormId', landing.facebookLandingForm ? landing.facebookLandingForm.id : null);
          change('facebookPageInnerId', landing.facebookLandingForm ? landing.facebookLandingForm.facebookPage.id : null);
        });
      }
    }

    if ((this.props.updateFacebookLandingPageProcess.saving && !newProps.updateFacebookLandingPageProcess.saving) && newProps.updateFacebookLandingPageProcess.success) {
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
    const { formError, newList, submitForm, studies } = this.props;
    const selected = _.find(studies, { selected: true });
    if (formError) {
      return;
    }
    const list = Object.assign({ studyId: selected.study_id }, newList);

    submitForm(list);
  }

  render() {
    const { openModal, onClose } = this.props;

    return (
      <Collapse dimension="width" in={openModal} timeout={250} className={classNames('landing-slider', (this.props.isOnTop > 0 ? 'slider-on-top' : ''))}>
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">LEAD GEN</strong>
                <a className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right" /></a>
              </div>
            </div>
            <Form
              className="holder landing-holder"
              onSubmit={this.handleSubmit}
              noValidate="novalidate"
            >
              <div className="frame">
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="facebook-url">FACEBOOK PAGE ID</label>
                  </strong>
                  <div className="field">
                    <Field
                      id="facebook-url"
                      type="text"
                      name="facebookPageId"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="facebook-url">FACEBOOK TOKEN</label>
                  </strong>
                  <div className="field">
                    <Field
                      id="facebook-url"
                      type="text"
                      name="facebookPageToken"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="facebook-url">FACEBOOK FORM NAME</label>
                  </strong>
                  <div className="field">
                    <Field
                      id="facebook-url"
                      type="text"
                      name="facebookFormName"
                      component={Input}
                    />
                  </div>
                </div>


                <div className="field-row text-right">
                  <Button type="submit" bsStyle="primary" className="fixed-small-btn">
                    {this.props.updateFacebookLandingPageProcess.saving
                      ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
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
  updateFacebookLandingPageProcess: selectFacebookLandingPageUpdateProcess(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadGenModal);
