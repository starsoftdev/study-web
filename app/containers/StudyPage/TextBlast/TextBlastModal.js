/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Form from 'react-bootstrap/lib/Form';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/index';
import * as Selector from '../selectors';
import { submitTextBlast } from '../actions';

const formName = 'TextBlastModal';

@reduxForm({
  form: formName,
})
class TextBlastModal extends React.Component {
  static propTypes = {
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array,
    show: React.PropTypes.bool.isRequired,
    sources: React.PropTypes.array.isRequired,
    submitTextBlast: React.PropTypes.func.isRequired,
    role: React.PropTypes.string,
    bsClass: React.PropTypes.string,
    dialogClassName: React.PropTypes.string,
    className: React.PropTypes.any,
    style: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showTextBlastModal: false,
      selectAllCategories: false,
      categories: {},
      selectAllSources: false,
      sources: {},
      addPatients: [],
      patients: [],
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectSource = this.selectSource.bind(this);
    this.removePatient = this.removePatient.bind(this);
    this.renderPatient = this.renderPatient.bind(this);
    for (const patientCategory of props.patientCategories) {
      this.state.categories[patientCategory.id] = false;
    }
    for (const source of props.sources) {
      this.state.sources[source.id] = false;
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    for (const patientCategory of nextProps.patientCategories) {
      this.state.categories[patientCategory.id] = false;
    }
    for (const source of nextProps.sources) {
      this.state.sources[source.id] = false;
    }
  }


  selectCategory(category) {
    const { patientCategories } = this.props;
    const state = {
      categories: {
        ...this.state.categories,
      },
    };
    if (category === 'All') {
      state.selectAllCategories = !this.state.selectAllCategories;
      for (const category of patientCategories) {
        state.categories[category.id] = state.selectAllCategories;
      }
    } else {
      state.categories[category.id] = !this.state.categories[category.id];
    }
    this.setState(state);
  }

  selectSource(source) {
    const { sources } = this.props;
    const state = {
      sources: {},
    };
    if (source === 'All') {
      state.selectAllSources = !this.state.selectAllSources;
      for (const source of sources) {
        state.sources[source.id] = state.selectAllSources;
      }
    } else {
      state.sources[source.id] = !this.state.sources[source.id];
    }
    this.setState(state);
  }

  removePatient() {

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
    const { onClose, patientCategories, sources, submitTextBlast, show, role, bsClass, dialogClassName, className, style, onHide } = this.props;
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
          <Form className="text-email-blast-form" noValidate="novalidate">
            <div className="sidebar pull-left">
              <div className="scroll-holder jcf--scrollable">
                <div className="sub-holder">
                  <div className="custom-select-drop">
                    <div className="search-holder">
                      <Field
                        name="search"
                        type="search"
                        component={Input}
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
                          input={{ defaultValue: this.state.selectAllCategories, checked: this.state.selectAllCategories }}
                          onChange={() => {
                            this.selectCategory('All');
                          }}
                        />
                        All
                      </li>
                      {patientCategories.map(patientCategory => (
                        <li key={patientCategory.id}>
                          <Field
                            name="category"
                            type="checkbox"
                            component={Checkbox}
                            className="pull-left"
                            input={{ defaultValue: this.state.categories[patientCategory.id], checked: this.state.categories[patientCategory.id] }}
                            onChange={() => {
                              this.selectCategory(patientCategory);
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
                          input={{ defaultValue: this.state.selectAllSources, checked: this.state.selectAllSources }} onChange={() => {
                            this.selectSource('All');
                          }}
                        />
                        All
                      </li>
                      {sources.map(source => (
                        <li key={source.id}>
                          <Field
                            name="source"
                            type="checkbox"
                            component={Checkbox}
                            className="pull-left"
                            input={{ defaultValue: this.state.sources[source.id], checked: this.state.sources[source.id] }}
                            onChange={() => {
                              this.selectSource(source);
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
                    <input type="submit" value="submit" className="btn btn-default pull-right" />
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
  patientCategories: Selector.selectPatientCategories(),
  sources: Selector.selectSources(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitTextBlast: (patients, onClose) => dispatch(submitTextBlast(patients, onClose)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBlastModal);
