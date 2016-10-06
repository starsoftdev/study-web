/**
 * Created by mike on 10/4/16.
 */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import CenteredModal from '../../components/CenteredModal/index';

class TextEmailBlastModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showTextBlastModal: false,
    };
    this.toggleTextBlastModal = this.toggleTextBlastModal.bind(this);
    this.closeTextBlastModal = this.closeTextBlastModal.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderBody = this.renderBody.bind(this);
  }

  toggleTextBlastModal() {
    this.setState({
      showTextBlastModal: !this.state.showTextBlastModal,
    });
  }

  closeTextBlastModal() {
    this.props.onHide();
    this.setState({
      showTextBlastModal: false,
    });
  }

  renderHeader() {
    if (this.state.showTextBlastModal) {
      return (
        <div>
          <div className="sidebar pull-left">
            <Modal.Title>
              <strong>Select Contacts</strong>
            </Modal.Title>
          </div>
          <Modal.Title>
            <strong className="title">Text Blast</strong>
          </Modal.Title>
        </div>
      );
    }
    return (
      <Modal.Title>
        <strong>Text / Email Blast</strong>
      </Modal.Title>
    );
  }

  renderBody() {
    if (this.state.showTextBlastModal) {
      return (
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
                      <li>
                        <span className="jcf-checkbox">
                          <input type="checkbox" data-check-pattern="[name^='category-']" data-patients="[data-patient^='patient2-']" style={{position: 'absolute', height: '100%', width: '100%', opacity: 0, margin: 0}} />
                        </span>
                        <span>All</span>
                      </li>
                      <li>
                        <span className="jcf-checkbox jcf-unchecked">
                          <input type="checkbox" name="category-new-patient" data-patient="patient2-new-patient" />
                        </span>
                          New Patient
                      </li>
                      <li>
                        <span className="jcf-checkbox jcf-unchecked">
                          <input type="checkbox" name="category-call-attempted" />
                        </span>
                          Call Attempted
                      </li>
                      <li>
                        <span className="jcf-checkbox jcf-unchecked">
                          <input type="checkbox" name="category-no" data-patient="patient2-not-qualified" />
                        </span>
                          Not Qualified / Not Interested
                      </li>
                      <li>
                        <span className="jcf-checkbox jcf-unchecked">
                          <input type="checkbox" name="category-action-needed" />
                        </span>
                          Action Needed
                      </li>
                      <li>
                        <span className="jcf-checkbox jcf-unchecked">
                          <input type="checkbox" name="category-scheduled" data-patient="patient2-scheduled" />
                        </span>
                          Scheduled
                      </li>
                      <li>
                        <span className="jcf-checkbox jcf-unchecked">
                          <input type="checkbox" name="category-consented" data-patient="patient2-consented" />
                        </span>
                          Consented
                      </li>
                      <li>
                        <span className="jcf-checkbox jcf-unchecked">
                          <input type="checkbox" name="category-randomized" />
                        </span>
                          Randomized
                      </li>
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
      );
    }
    return (
      <Modal.Body>
        <span className="modal-opener" onClick={this.toggleTextBlastModal}>
          <div className="table">
            <div className="table-cell">
              <i className="icomoon-icon_comment_alt" />
              <span className="text">Text Blast</span>
            </div>
          </div>
        </span>
        <span className="or">
          <span className="text">OR</span>
        </span>
        <span className="modal-opener">
          <div className="table">
            <div className="table-cell">
              <i className="icomoon-alt-envelope" />
              <span className="text">Email Blast</span>
              <span className="text">Coming Soon</span>
            </div>
          </div>
        </span>
      </Modal.Body>
    );
  }

  render() {
    const { onHide } = this.props;
    let modalId = 'text-email-blast';
    if (this.state.showTextBlastModal) {
      modalId = 'text-blast';
    }
    return (
      <Modal
        {...this.props}
        id={modalId}
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          {this.renderHeader()}
          <a className="close" onClick={onHide}>
            <i className="icomoon-close" />
          </a>
        </Modal.Header>
        {this.renderBody()}
      </Modal>
    );
  }
}

export default TextEmailBlastModal;
