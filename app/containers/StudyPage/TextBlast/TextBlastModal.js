/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Form from 'react-bootstrap/lib/Form';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import Category from './Category';
import * as Selector from '../selectors';
import { submitTextBlast } from '../sagas';

class TextBlastModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array.isRequired,
    sources: React.PropTypes.array.isRequired,
    submitTextBlast: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showTextBlastModal: false,
      selectAllCategories: false,
      categories: {},
      selectAllSources: false,
      sources: {},
      patients: []
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectSource = this.selectSource.bind(this);
    for (let patientCategory of props.patientCategories) {
      this.state.categories[patientCategory.id] = false;
    }
    for (let source of props.sources) {
      this.state.sources[source.id] = false;
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    for (let patientCategory of nextProps.patientCategories) {
      this.state.categories[patientCategory.id] = false;
    }
    for (let source of nextProps.sources) {
      this.state.sources[source.id] = false;
    }
  }


  selectCategory(category) {
    const { patientCategories } = this.props;
    let state = {
      categories: {
        ...this.state.categories
      },
    }
    if (category === 'All') {
      state.selectAllCategories = !this.state.selectAllCategories;
      for (let category of patientCategories) {
        state.categories[category.id] = state.selectAllCategories;
      }
    } else {
      state.categories[category.id] = !this.state.categories[category.id];
    }
    this.setState(state);
  }

  selectSource(source) {
    const { sources } = this.props;
    let state = {
      sources: {},
    }
    if (source === 'All') {
      state.selectAllSources = !this.state.selectAllSources;
      for (let source of sources) {
        state.sources[source.id] = state.selectAllSources;
      }
    } else {
      state.sources[source.id] = !this.state.sources[source.id];
    }
    this.setState(state);
  }
  
  render() {
    const { onClose, patientCategories, sources, submitTextBlast, ...props} = this.props;
    return (
      <Modal
        {...props}
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
          <a className="close" onClick={props.onHide}>
            <i className="icomoon-close" />
          </a>
        </Modal.Header>
        <Modal.Body>
            <Form className="text-email-blast-form" data-formvalidation="" noValidate="novalidate">
              <div className="sidebar pull-left">
                <div className="scroll-holder jcf--scrollable">
                  <div className="sub-holder">
                    <div className="custom-select-drop">
                      <div className="search-holder">
                        <input type="search" className="form-control keyword-search" />
                        <i className="icon-icon_search2" />
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
                      <strong className="heading">CATEGORY</strong>
                      <ul className="check-list list-unstyled">
                        <Category checked={this.state.selectAllCategories} name={"All"} onClick={() => {
                          this.selectCategory("All");
                        }} />
                        {patientCategories.map(patientCategory => {
                          return (
                            <Category key={patientCategory.id} checked={this.state.categories[patientCategory.id]} name={patientCategory.name} onClick={() => {
                            this.selectCategory(patientCategory);
                          }} />
                          );
                        })}
                      </ul>
                    </div>
                    <div className="category">
                      <strong className="heading">SOURCE</strong>
                      <ul className="check-list list-unstyled">
                        <li>
              <span className="jcf-checkbox jcf-unchecked">
              <input type="checkbox" data-check-pattern="[name^='source-']" />
              </span>
                          All
                        </li>
                        <li>
              <span className="jcf-checkbox jcf-unchecked">
              <input type="checkbox" name="source-studykik" />
              </span>
                          StudyKIK
                        </li>
                        <li>
              <span className="jcf-checkbox jcf-unchecked">
              <input type="checkbox" name="source-tv" />
              </span>
                          TV
                        </li>
                        <li>
              <span className="jcf-checkbox jcf-unchecked">
              <input type="checkbox" name="source-radio" />
              </span>
                          Radio
                        </li>
                        <li>
              <span className="jcf-checkbox jcf-unchecked">
              <input type="checkbox" name="source-print" />
              </span>
                          Print
                        </li>
                        <li>
                          <span className="jcf-checkbox jcf-unchecked">
                            <input type="checkbox" name="source-digital" />
                          </span>
                          Digital
                        </li>
                        <li>
                          <span className="jcf-checkbox jcf-unchecked">
                            <input type="checkbox" name="source-other" />
                          </span>
                          Other
                        </li>
                      </ul>
                    </div>
                    <div className="selected-patients-list"></div>
                    <div className="dynimic-patients-list hidden">
                      <div data-patient="patient2-new-patient">
                        <span className="name">Alan Jensen</span>
                        <a href="#" className="btn-remove">
                          <i className="icon-icon_trash" /></a>
                      </div>
                      <div data-patient="patient2-new-patient">
                        <span className="name">Eugene Simpson</span>
                        <a href="#" className="btn-remove">
                          <i className="icon-icon_trash" /></a>
                      </div>
                      <div data-patient="patient2-not-qualified">
                        <span className="name">Katy Perry</span>
                        <a href="#" className="btn-remove">
                          <i className="icon-icon_trash" /></a>
                      </div>
                      <div data-patient="patient2-scheduled">
                        <span className="name">Hamish Labatt</span>
                        <a href="#" className="btn-remove">
                          <i className="icon-icon_trash" /></a>
                      </div>
                      <div data-patient="patient2-consented">
                        <span className="name">Thomas Morgan</span>
                        <a href="#" className="btn-remove">
                          <i className="icon-icon_trash" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-holder">
                <div className="scroll-holder jcf--scrollable">
                  <div className="sub-holder">
                    <div className="subject-field">
                      <input type="text" className="form-control recivers" placeholder="To" disabled="" />
                      <span className="emails-counter" data-emails-counter2="">
              <span className="counter">0</span>
              <span className="text">Patients</span>
              <a href="#" className="btn-close">
              <i className="icon-close" />
              </a>
              </span>
                    </div>
                    <textarea placeholder="Type a message..." className="form-control" data-required="true" />
                    <div className="footer">
                      <a href="#" className="btn btn-gray-outline pull-left">
                        <i className="icon-icon_book_alt" /> Select Template</a>
                      <a href="#" className="btn btn-gray-outline pull-left">
                        <i className="icon-icon_floppy_alt" /> Save Template</a>
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
    submitTextBlast: (values) => dispatch(submitTextBlast(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBlastModal);