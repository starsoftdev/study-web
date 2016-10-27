/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/index';
import * as Selector from '../selectors';
import { findPatientsForTextBlast, submitTextBlast } from '../actions';
import { selectValues, selectSyncErrors } from '../../../common/selectors/form.selector';

const formName = 'TextBlastModal';

@reduxForm({
  form: formName,
})
class TextBlastModal extends React.Component {
  static propTypes = {
    bsClass: React.PropTypes.string,
    change: React.PropTypes.func.isRequired,
    className: React.PropTypes.any,
    dialogClassName: React.PropTypes.string,
    findPatientsForTextBlast: React.PropTypes.func.isRequired,
    formValues: React.PropTypes.object,
    formSyncErrors: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array,
    role: React.PropTypes.string,
    show: React.PropTypes.bool.isRequired,
    sources: React.PropTypes.array.isRequired,
    studyId: React.PropTypes.number,
    style: React.PropTypes.object,
    submitTextBlast: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialValues: {
      category: false,
      source: false,
    },
  };


  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.selectSource = this.selectSource.bind(this);
    this.removePatient = this.removePatient.bind(this);
    this.submitTextBlast = this.submitTextBlast.bind(this);
    this.renderPatient = this.renderPatient.bind(this);
    this.findPatients = this.findPatients.bind(this);
  }

  componentDidMount() {
  }

  selectCategory(categoryId) {
    const { change, findPatientsForTextBlast, formValues, patientCategories, sources, studyId } = this.props;
    if (categoryId === 0) {
      for (const category of patientCategories) {
        change(`category-${category.id}`, !formValues.category);
      }
    } else {
      change('category', false);
      change(`category-${categoryId}`, !formValues[`category-${categoryId}`]);
    }
    // // find patients for text blast
    // let sourceIds = null;
    // if (!formValues.source) {
    //   sourceIds = [];
    //   for (const source of sources) {
    //     if (formValues[`source-${source.id}`]) {
    //       sourceIds.push(source.id);
    //     }
    //   }
    // }
    // if (formValues.category) {
    //   findPatientsForTextBlast(studyId, null, null, sourceIds);
    // } else {
    //   const categoryIds = [];
    //   for (const category of patientCategories) {
    //     if (formValues[`category-${category.id}`]) {
    //       categoryIds.push(category.id);
    //     }
    //   }
    //   findPatientsForTextBlast(studyId, null, categoryIds, sourceIds);
    // }
  }

  selectSource(sourceId) {
    const { change, findPatientsForTextBlast, formValues, patientCategories, sources, studyId } = this.props;
    if (sourceId === 0) {
      for (const source of sources) {
        change(`source-${source.id}`, !formValues.source);
      }
    } else {
      change('source', false);
      change(`source-${sourceId}`, !formValues[`source-${sourceId}`]);
    }
    // // find patients for text blast
    // let categoryIds = null;
    // if (!formValues.category) {
    //   categoryIds = [];
    //   for (const category of patientCategories) {
    //     if (formValues[`category-${category.id}`]) {
    //       categoryIds.push(category.id);
    //     }
    //   }
    // }
    // if (formValues.source.value) {
    //   findPatientsForTextBlast(studyId, null, categoryIds, null);
    // } else {
    //   const sourceIds = [];
    //   for (const source of sources) {
    //     if (formValues[`source-${source.id}`]) {
    //       sourceIds.push(source.id);
    //     }
    //   }
    //   findPatientsForTextBlast(studyId, null, categoryIds, sourceIds);
    // }
  }

  findPatients(text) {
    const { findPatientsForTextBlast, studyId } = this.props;
    findPatientsForTextBlast(studyId, text);
  }

  removePatient() {

  }

  submitTextBlast() {

  }

  renderPatient() {
    return (
      <div className="patient">
        <span className="name">Alan Jensen</span>
        <a className="btn-remove" onClick={this.removePatient}>
          <i className="icomoon-icon_trash" />
        </a>
      </div>
    );
  }

  render() {
    const { patientCategories, sources, show, role, bsClass, dialogClassName, className, style, onHide } = this.props;
    return (
      <Modal
        show={show}
        role={role}
        bsClass={bsClass}
        dialogClassName={dialogClassName}
        className={className}
        style={style}
        id="text-blast"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <div className="sidebar pull-left">
            <Modal.Title>
              <strong>Select Contacts</strong>
            </Modal.Title>
          </div>
          <Modal.Title>
            <strong className="title">Text Blast</strong>
          </Modal.Title>
          <a className="close" onClick={onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-email-blast-form">
            <div className="sidebar pull-left">
              <div className="scroll-holder jcf--scrollable">
                <div className="sub-holder">
                  <div className="custom-select-drop">
                    <div className="search-holder">
                      <Field
                        name="search"
                        type="search"
                        component={Input}
                        onChange={this.findPatients}
                        className="keyword-search"
                      />
                      <i className="icomoon-icon_search2" />
                      <ul className="list list-unstyled">
                        <li>Alan Jensen</li>
                        <li>Eugene Simpson</li>
                        <li>katy Perry</li>
                        <li>Hamish Labatt</li>
                        <li>Thomas Morgan</li>
                      </ul>
                    </div>
                  </div>
                  <div className="category">
                    <strong className="heading">Category</strong>
                    <ul className="check-list list-unstyled">
                      <li>
                        <Field
                          name="category"
                          type="checkbox"
                          component={Checkbox}
                          className="pull-left"
                          onChange={() => {
                            this.selectCategory(0);
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
                            onChange={() => {
                              this.selectCategory(patientCategory.id);
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
                          component={Checkbox}
                          className="pull-left"
                          onChange={() => {
                            this.selectSource(0);
                          }}
                        />
                        All
                      </li>
                      {sources.map(source => (
                        <li key={source.id}>
                          <Field
                            name={`source-${source.id}`}
                            type="checkbox"
                            component={Checkbox}
                            className="pull-left"
                            onChange={() => {
                              this.selectSource(source.id);
                            }}
                          />
                          {source.type}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="selected-patients-list">
                    {this.renderPatient()}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-holder">
              <div className="scroll-holder jcf--scrollable">
                <div className="sub-holder">
                  <div className="subject-field">
                    <input type="text" className="form-control recivers" placeholder="To" disabled />
                    <span className="emails-counter">
                      <span className="counter">0</span>
                      <span className="text">Patients</span>
                      <a className="btn-close">
                        <i className="icomoon-icon_close" />
                      </a>
                    </span>
                  </div>
                  <textarea placeholder="Type a message..." className="form-control" required />
                  <div className="footer">
                    <Button type="submit" value="submit" className="pull-right" />
                  </div>
                </div>
              </div>
            </div>
            <input type="reset" className="hidden btn btn-gray-outline" value="reset" />
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formValues: selectValues(formName),
  formSyncErrors: selectSyncErrors(formName),
  patientCategories: Selector.selectPatientCategories(),
  sources: Selector.selectSources(),
  studyId: Selector.selectStudyId(),
});

function mapDispatchToProps(dispatch) {
  return {
    change: (field, value) => dispatch(change(formName, field, value)),
    findPatientsForTextBlast: (studyId, text, categoryIds, sourceIds) => dispatch(findPatientsForTextBlast(studyId, text, categoryIds, sourceIds)),
    submitTextBlast: (patients, onClose) => dispatch(submitTextBlast(patients, onClose)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBlastModal);
