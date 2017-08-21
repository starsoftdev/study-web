/**
 * Created by mike on 7/2/17.
 */

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import formValidator from './validator';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/index';
import * as Selector from '../selectors';
import { findPatientsForTextBlast, filterPatientsForTextBlast, removePatientFromTextBlast, removePatientsFromTextBlast, submitTextBlast } from '../actions';
import { selectValues, selectSyncErrors } from '../../../common/selectors/form.selector';
import { fetchClientCredits } from '../../App/actions';
import { selectCurrentUser, selectClientCredits, selectSources } from '../../App/selectors';

const formName = 'StudyPage.TextBlastModal';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  clientCredits: selectClientCredits(),
  formValues: selectValues(formName),
  formSyncErrors: selectSyncErrors(formName),
  patientCategories: Selector.selectPatientCategories(),
  sources: selectSources(),
  studyId: Selector.selectStudyId(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (field, value) => dispatch(change(formName, field, value)),
  findPatients: (studyId, text, categoryIds, sourceIds, campaignId) => dispatch(findPatientsForTextBlast(studyId, text, categoryIds, sourceIds, campaignId)),
  filterPatients: (text) => dispatch(filterPatientsForTextBlast(text)),
  removePatient: (patient) => dispatch(removePatientFromTextBlast(patient)),
  removePatients: () => dispatch(removePatientsFromTextBlast()),
  submitTextBlast: (patients, message, clientRoleId, onClose) => dispatch(submitTextBlast(patients, message, clientRoleId, onClose)),
  fetchClientCredits: (userId) => dispatch(fetchClientCredits(userId)),
});

@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(mapStateToProps, mapDispatchToProps)
class TextBlastForm extends React.Component {
  static propTypes = {
    change: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    clientCredits: React.PropTypes.object,
    fetchClientCredits: React.PropTypes.func,
    findPatients: React.PropTypes.func.isRequired,
    filterPatients: React.PropTypes.func.isRequired,
    formValues: React.PropTypes.object,
    formSyncErrors: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array,
    removePatient: React.PropTypes.func.isRequired,
    removePatients: React.PropTypes.func.isRequired,
    sources: React.PropTypes.array.isRequired,
    studyId: React.PropTypes.number,
    submitTextBlast: React.PropTypes.func.isRequired,
    ePMS: React.PropTypes.bool,
    campaign: React.PropTypes.number,
    studyName: React.PropTypes.string,
    initialize: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.selectSource = this.selectSource.bind(this);
    this.filterPatients = this.filterPatients.bind(this);
    this.submitTextBlast = this.submitTextBlast.bind(this);
    this.renderPatients = this.renderPatients.bind(this);
    this.renderPatientCount = this.renderPatientCount.bind(this);
    this.textAreaChange = this.textAreaChange.bind(this);
    this.checkCategories = this.checkCategories.bind(this);
    this.removeSelectedPatient = this.removeSelectedPatient.bind(this);
    this.updatePatientsCount = this.updatePatientsCount.bind(this);
    this.checkForCredits = this.checkForCredits.bind(this);
    this.state = {
      enteredCharactersLength: 0,
      sourceDisable: true,
      selectedPatientsCount: 0,
    };
  }

  componentDidMount() {
    const { studyName } = this.props;
    const message = `Hello, please respond yes or no if you are interested in a research study for ${studyName}.`;
    this.props.initialize({
      message,
    });
    this.textAreaChange(message);
  }

  textAreaChange(message = '') {
    const value = this.textarea ? this.textarea.value : message;
    this.setState({ enteredCharactersLength: value ? value.length : 0 }, () => {});
  }

  selectCategory(checked, categoryId) {
    const { change, findPatients, formValues, patientCategories, sources, studyId, removePatients, campaign } = this.props;
    // find patients for text blast
    let newCampaign = campaign;
    if (campaign === -1 || !campaign) {
      newCampaign = null;
    }
    let sourceIds = null;
    if (!formValues.source) {
      sourceIds = [];
      for (const source of sources) {
        if (formValues[`source-${source.id}`]) {
          sourceIds.push(source.id);
        }
      }
    }
    if (categoryId === 0) {
      for (const category of patientCategories) {
        change(`category-${category.id}`, checked);
      }
      if (checked || (sourceIds && sourceIds.length)) {
        findPatients(studyId, null, null, sourceIds, newCampaign);
      } else {
        removePatients();
      }
    } else {
      // change the all option to unchecked
      change('category', false);
      const categoryIds = [];
      if (checked) {
        categoryIds.push(categoryId);
      }
      for (const category of patientCategories) {
        if (categoryId !== category.id && formValues[`category-${category.id}`]) {
          categoryIds.push(category.id);
        }
      }
      if ((categoryIds && categoryIds.length) || (sourceIds && sourceIds.length)) {
        findPatients(studyId, null, categoryIds, sourceIds, newCampaign);
      } else {
        removePatients();
      }
    }
    this.updatePatientsCount();
  }

  selectSource(checked, sourceId) {
    const { change, findPatients, formValues, patientCategories, sources, studyId, removePatients } = this.props;
    // find patients for text blast
    let categoryIds = null;
    if (!formValues.category) {
      categoryIds = [];
      for (const category of patientCategories) {
        if (formValues[`category-${category.id}`]) {
          categoryIds.push(category.id);
        }
      }
    }
    if (sourceId === 0) {
      for (const source of sources) {
        change(`source-${source.id}`, checked);
      }
      if (checked || categoryIds.length) {
        findPatients(studyId, null, categoryIds, null);
      } else {
        removePatients();
      }
    } else {
      // change the all option to unchecked
      change('source', false);
      const sourceIds = [];
      if (checked) {
        sourceIds.push(sourceId);
      }
      for (const source of sources) {
        if (sourceId !== source.id && formValues[`source-${source.id}`]) {
          sourceIds.push(source.id);
        }
      }
      if (sourceIds.length || categoryIds.length) {
        findPatients(studyId, null, categoryIds, sourceIds);
      } else {
        removePatients();
      }
    }
    this.updatePatientsCount();
  }

  filterPatients(event) {
    event.preventDefault();
    const { formValues, filterPatients } = this.props;
    if (formValues.patientSearchValues) {
      filterPatients(event.target.value, formValues.patients);
    }
    this.updatePatientsCount();
  }

  submitTextBlast(event) {
    event.preventDefault();
    const { currentUser, formSyncErrors, formValues, submitTextBlast, onClose } = this.props;
    if (!formSyncErrors.message && !formSyncErrors.patients) {
      submitTextBlast(formValues.patients, formValues.message, currentUser.roleForClient.id, (err, data) => {
        onClose(err, data);
        this.props.fetchClientCredits(currentUser.id);
      });
    } else if (formSyncErrors.message) {
      toastr.error('', formSyncErrors.message);
    } else if (formSyncErrors.patients) {
      toastr.error('', formSyncErrors.patients);
    }
  }

  checkCategories(patient) {
    const { change, formValues, patientCategories } = this.props;
    let newPatientsArr = [];
    if (formValues.patients && formValues.filteredPatientSearchValues) {
      newPatientsArr = formValues.patients.filter((v) => (
        (formValues.filteredPatientSearchValues.indexOf(v) !== -1) && (v !== patient)
      ));
    }
    for (const category of patientCategories) {
      const fOne = _.find(newPatientsArr, { categoryId: category.id });
      if (!fOne) {
        change('category', false);
        change(`category-${category.id}`, false);
      }
    }
    this.updatePatientsCount();
  }

  removeSelectedPatient(patient) {
    this.checkCategories(patient);
    this.props.removePatient(patient);
    this.updatePatientsCount();
  }

  updatePatientsCount() {
    setTimeout(() => {
      const { formValues } = this.props;
      let newPatientsArr = [];
      if (formValues.patients && formValues.filteredPatientSearchValues) {
        newPatientsArr = formValues.patients.filter((v) => (
          formValues.filteredPatientSearchValues.indexOf(v) !== -1
        ));
      }
      this.setState({ selectedPatientsCount: newPatientsArr.length });
    }, 200);
  }

  checkForCredits() {
    if (this.state.selectedPatientsCount > this.props.clientCredits.details.customerCredits) {
      toastr.error('Error!', 'You do not have enough messaging credits. Please add more credits.');
    }
  }

  renderPatients() {
    const { formValues } = this.props;
    let newPatientsArr = [];
    if (formValues.patients && formValues.filteredPatientSearchValues) {
      newPatientsArr = formValues.patients.filter((v) => (
        formValues.filteredPatientSearchValues.indexOf(v) !== -1
      ));
    }
    if (newPatientsArr) {
      return (
        <div className="selected-patients-list">
          {newPatientsArr.map(patient => (
            <div className="patient" key={patient.id}>
              <span className="name">{patient.firstName} {patient.lastName}</span>
              <a
                className="btn-remove"
                onClick={() => {
                  this.removeSelectedPatient(patient);
                }}
              >
                <i className="icomoon-icon_trash" />
              </a>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  renderPatientCount() {
    const { removePatients } = this.props;
    if (this.state.selectedPatientsCount) {
      return (
        <span className="emails-counter">
          <span className="counter">{this.state.selectedPatientsCount}</span>
          <span className="text"> Patients</span>
          <a className="btn-close">
            <i className="icomoon-icon_close" onClick={removePatients} />
          </a>
        </span>
      );
    }
    return null;
  }

  render() {
    const { patientCategories, sources, ePMS } = this.props;
    const { enteredCharactersLength, selectedPatientsCount } = this.state;
    const clientCredits = this.props.clientCredits.details.customerCredits;
    const disabled = (clientCredits === 0 || clientCredits === null || clientCredits < selectedPatientsCount || selectedPatientsCount === 0);
    const notEnoughCredits = (selectedPatientsCount > clientCredits);
    return (
      <Form className="text-email-blast-form">
        <div className="sidebar pull-left">
          <div className="scroll-holder jcf--scrollable">
            <div className="sub-holder">
              <div className="category">
                <strong className="heading">Category</strong>
                <ul className="check-list list-unstyled">
                  <li>
                    <Field
                      name="category"
                      type="checkbox"
                      component={Checkbox}
                      className="pull-left"
                      onChange={(checked) => {
                        this.selectCategory(checked, 0);
                      }}
                    />
                    All
                  </li>
                  {patientCategories.map(patientCategory => (
                    <li key={patientCategory.id}>
                      <Field
                        name={`category-${patientCategory.id}`}
                        type="checkbox"
                        component={Checkbox}
                        className="pull-left"
                        onChange={(checked) => {
                          this.selectCategory(checked, patientCategory.id);
                        }}
                      />
                      {patientCategory.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="category">
                <strong className="heading">SOURCE</strong>
                <ul className="check-list list-unstyled">
                  <li>
                    <Field
                      name="source"
                      type="checkbox"
                      disabled={this.state.sourceDisable}
                      component={Checkbox}
                      className="pull-left"
                      onChange={(checked) => {
                        this.selectSource(checked, 0);
                      }}
                    />
                    All
                  </li>
                  {sources.map(source => (
                    <li key={source.id}>
                      <Field
                        name={`source-${source.id}`}
                        type="checkbox"
                        disabled={this.state.sourceDisable}
                        component={Checkbox}
                        className="pull-left"
                        onChange={(checked) => {
                          this.selectSource(checked, source.id);
                        }}
                      />
                      {source.type}
                    </li>
                  ))}
                </ul>
              </div>
              {this.renderPatients()}
            </div>
          </div>
        </div>
        <div className="form-holder">
          <div className="scroll-holder jcf--scrollable">
            <div className="sub-holder">
              <div className="subject-field">
                <FormControl type="text" className="recievers" placeholder="To" disabled />
                {this.renderPatientCount()}
              </div>
              <Field
                name="message"
                component={Input}
                componentClass="textarea"
                className="message"
                placeholder="Type a message..."
                maxLength="160"
                required
                onChange={this.textAreaChange}
                style={{ height: '350px' }}
                ref={(textarea) => {
                  this.textarea = textarea;
                }}
                isDisabled={disabled}
              />
              <div className="footer" onClick={this.checkForCredits}>
                <span className="characters-counter">
                  {`${160 - enteredCharactersLength}`}
                </span>
                <div
                  className="btn btn-default lightbox-opener pull-right"
                  onClick={(e) => ((notEnoughCredits || disabled || enteredCharactersLength === 0) ? null : this.submitTextBlast(e))}
                  disabled={disabled || !ePMS}
                >
                  Send
                </div>
              </div>
            </div>
          </div>
        </div>
        <input type="reset" className="hidden btn btn-gray-outline" value="reset" />
      </Form>
    );
  }
}

export default TextBlastForm;
