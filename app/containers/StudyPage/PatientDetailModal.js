/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import Collapse from 'react-bootstrap/lib/Collapse';

import classNames from 'classnames';
import moment from 'moment-timezone';

class PatientDetailModal extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object,
    formatPhone: React.PropTypes.func.isRequired,
    openPatientModal: React.PropTypes.bool.isRequired,
    selectedPatientCategory: React.PropTypes.object,
    selectedPatient: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      carousel: {
        note: true,
        text: false,
        email: false,
        other: false,
      },
    };
    this.toggleNoteSection = this.toggleNoteSection.bind(this);
    this.toggleTextSection = this.toggleTextSection.bind(this);
    this.toggleEmailSection = this.toggleEmailSection.bind(this);
    this.toggleOtherSection = this.toggleOtherSection.bind(this);
    this.renderPatientForm = this.renderPatientForm.bind(this);
    this.renderPatientNote = this.renderPatientNote.bind(this);
    this.renderPatientText = this.renderPatientText.bind(this);
    this.renderOtherSection = this.renderOtherSection.bind(this);
  }

  toggleNoteSection() {
    this.setState({
      carousel: {
        note: true,
        text: false,
        email: false,
        other: false,
      },
    });
  }

  toggleTextSection() {
    this.setState({
      carousel: {
        note: false,
        text: true,
        email: false,
        other: false,
      },
    });
  }

  toggleEmailSection() {
    this.setState({
      carousel: {
        note: false,
        text: false,
        email: true,
        other: false,
      },
    });
  }

  toggleOtherSection() {
    this.setState({
      carousel: {
        note: false,
        text: false,
        email: false,
        other: true,
      },
    });
  }

  renderPatientForm() {
    const { formatPhone, selectedPatient } = this.props;
    let patientPhone
    if (selectedPatient) {
      patientPhone = formatPhone(selectedPatient.phone);
      return (
        <Form className="form-lightbox form-patients-list">
          <div className="field-row">
            <strong className="label required">
              <label htmlFor="new-patient-first-name">Name</label>
            </strong>
            <div className="field">
              <div className="row">
                <div className="col pull-left">
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="new-patient-first-name"
                    placeholder="First Name"
                    value={selectedPatient.firstName}
                  />
                </div>
                <div className="col pull-right">
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="new-patient-last-name"
                    placeholder="Last Name"
                    value={selectedPatient.lastName}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field-row">
            <strong className="label required"><label htmlFor="new-patient-email">email</label></strong>
            <div className="field">
              <input type="email" className="form-control" id="new-patient-email" value={selectedPatient.email} />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required"><label htmlFor="new-patient-phone">Phone</label></strong>
            <div className="field">
              <input type="tel" className="form-control" id="new-patient-phone" value={patientPhone} />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">&nbsp;</strong>
            <div className="field">
              <span className="jcf-checkbox jcf-unchecked">
                <span className="checkbox" />
                <input type="checkbox" id="unsubscribe" />
              </span>
              <label htmlFor="unsubscribe">Unsubscribe</label>
            </div>
          </div>
        </Form>
      );
    } else {
      return null;
    }
  }

  renderPatientNote(note) {
    const { currentUser } = this.props;
    return (
      <div className="post-msg">
        <div className="img-holder">
          <img role="presentation" src="images/img2.png" />
        </div>
        <div className="post-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt. Lorem ipsum dolor sit amet.
          </p>
          <a className="btn-trash">
            <i className="icomoon-icon_trash" />
          </a>
        </div>
        <strong className="email">Alan Walker</strong>
        <time dateTime="2016-07-28">07/28/16 at 09:35 AM</time>
      </div>
    );
  }

  renderPatientText(text) {
    const { currentUser } = this.props;
    return (
      <div className="post-msg">
        <div className="img-holder">
          <img role="presentation" src="images/img2.png" />
        </div>
        <div className="post-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt. Lorem ipsum dolor sit amet.
          </p>
          <a className="btn-trash">
            <i className="icomoon-icon_trash" />
          </a>
        </div>
        <strong className="email patient-name">
          <span className="first-name">Alan</span>
          <span className="last-name"> Jensen</span>
        </strong>
        <time dateTime="2016-07-28">07/28/16 at 09:35 AM</time>
      </div>
    );
  }

  renderOtherSection() {
    const{ currentUser, selectedPatient } = this.props;
    if (selectedPatient) {
      return (
        <div className={classNames("item others", {active: this.state.carousel.other})}>
          <div className="item-holder">
            <div className="dates">
              <strong className="title">Dates</strong>
              <ul className="list-unstyled list-radios">
                <li>
                  <span className="title">Signed Up</span>
                  <time dateTime={selectedPatient.createdAt}>{moment.tz(selectedPatient.createdAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
                </li>
                <li>
                  <span className="title">Updated</span>
                  <time dateTime={selectedPatient.updatedAt}>{moment.tz(selectedPatient.updatedAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
                </li>
              </ul>
            </div>
            <Form className="sub-holder form-lightbox" noValidate="novalidate">
              <div className="field-row full remove-bipolar">
                <strong className="label">Indications</strong>
                <div className="field">
                  <div className="category-list">
                    <div className="category">
                      <span className="bipolar-link">
                        <span className="text">Bipolar</span>
                        <a className="icomoon-icon_trash" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-row full">
                <div className="field add-indications">
                  <div className="indication-open-close">
                    <a className="btn btn-primary select-indication-opener">+ Add Indication</a>
                    <div className="select-indication-slide default-slide js-slide-hidden">
                      <div className="well custom-select-drop">
                        <div className="search-holder">
                          <input type="search" className="form-control keyword-search" id="search10" />
                          <label htmlFor="search10" className="icomoon-icon_search2" />
                        </div>
                        <div className="jcf--scrollable">
                          <ul className="list-unstyled list select-indication">
                            <li>Acne</li>
                            <li>Back Pain</li>
                            <li>Magraine </li>
                            <li>Ring worm</li>
                            <li>COPD</li>
                            <li>Leg pain</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fields-holder">
                <strong className="title">OTHER INFORMATION</strong>
                <div className="field-row">
                  <strong className="label"><label htmlFor="patient-dob">Date of Birth</label></strong>
                  <div className="field">
                    <div className="row">
                      <div className="col-small pull-left">
                        <select
                          id="patient-dob"
                          className="min-width min-height jcf-hidden"
                          required
                        >
                          <option>Month</option>
                          <option>January</option>
                          <option>February</option>
                          <option>March</option>
                          <option>April</option>
                          <option>May</option>
                          <option>June</option>
                          <option>July</option>
                          <option>August</option>
                          <option>September</option>
                          <option>October</option>
                          <option>November</option>
                          <option>December</option>
                        </select>
                        <span className="jcf-select jcf-unselectable jcf-select-min-width jcf-select-min-height">
                          <span className="jcf-select-text">
                            <span>Month</span>
                          </span>
                          <span className="jcf-select-opener" />
                        </span>
                      </div>
                      <div className="col-small pull-left">
                        <select required className="min-height jcf-hidden">
                          <option>Day</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                          <option>13</option>
                          <option>14</option>
                          <option>15</option>
                          <option>16</option>
                          <option>17</option>
                          <option>18</option>
                          <option>19</option>
                          <option>20</option>
                          <option>21</option>
                          <option>22</option>
                          <option>23</option>
                          <option>24</option>
                          <option>25</option>
                          <option>26</option>
                          <option>27</option>
                          <option>28</option>
                          <option>29</option>
                          <option>30</option>
                          <option>31</option>
                        </select>
                        <span className="jcf-select jcf-unselectable jcf-select-min-height">
                          <span className="jcf-select-text">
                            <span>Day</span>
                          </span>
                          <span className="jcf-select-opener" />
                        </span>
                      </div>
                      <div className="col-small pull-left patient-age">
                        <select required className="min-height jcf-hidden">
                          <option>Year</option>
                          <option>1981</option>
                          <option>1982</option>
                          <option>1983</option>
                          <option>1984</option>
                          <option>1985</option>
                          <option>1986</option>
                          <option>1987</option>
                          <option>1988</option>
                          <option>1989</option>
                          <option>1990</option>
                          <option>1991</option>
                          <option>1992</option>
                          <option>1993</option>
                          <option>1994</option>
                          <option>1995</option>
                          <option>1996</option>
                          <option>1997</option>
                          <option>1998</option>
                          <option>1999</option>
                          <option>2000</option>
                          <option>2001</option>
                          <option>2002</option>
                        </select>
                        <span className="jcf-select jcf-unselectable jcf-select-min-height">
                          <span className="jcf-select-text">
                            <span>Year</span>
                          </span>
                          <span className="jcf-select-opener" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field-row">
                  <strong className="label"><label htmlFor="patient-gender">Gender </label></strong>
                  <div className="field patient-gender">
                    <select id="patient-gender" required className="jcf-hidden">
                      <option>Select Gender</option>
                      <option>N/A</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <span className="jcf-select jcf-unselectable">
                      <span className="jcf-select-text">
                        <span>Select Gender</span>
                      </span>
                      <span className="jcf-select-opener" />
                    </span>
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label"><label htmlFor="patient-bmi">BMI </label></strong>
                  <div className="field">
                    <input type="text" className="form-control" id="patient-bmi" required defaultValue={selectedPatient.bmi} />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label"><label htmlFor="patient-source5">Source</label></strong>
                  <div className="field">
                    <input type="text" className="form-control" value={selectedPatient.source.type} disabled readOnly />
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { currentUser, openPatientModal, selectedPatientCategory, selectedPatient } = this.props;
    return (
      <Collapse dimension="width" in={openPatientModal} timeout={250} className="patients-list-form">
        <div className="form-area">
          <div className="form-head">
            <strong className="title">{selectedPatientCategory ? selectedPatientCategory.name : null}</strong>
            <a className="lightbox-opener">
              <span className="date" />
              <span className="time" />
            </a>
            <a className="btn-close" onClick={this.onPatientClick}>
              <i className="glyphicon glyphicon-menu-right" />
            </a>
          </div>
          {this.renderPatientForm()}
          <div className="column">
            <div id="carousel-example-generic" className="carousel slide popup-slider">
              <ol className="carousel-indicators">
                <li className={classNames({active: this.state.carousel.note})} onClick={this.toggleNoteSection}>Note</li>
                <li className={classNames({active: this.state.carousel.text})} onClick={this.toggleTextSection}>Text</li>
                <li className={classNames({active: this.state.carousel.email})} onClick={this.toggleEmailSection}>Email</li>
                <li className={classNames({active: this.state.carousel.other})} onClick={this.toggleOtherSection}>Other</li>
              </ol>
              <div className="carousel-inner" role="listbox">
                <div className={classNames("item note", {active: this.state.carousel.note})}>
                  <section className="postarea notes">
                    {this.renderPatientNote()}
                  </section>
                  <div className="textarea">
                    <textarea className="form-control" placeholder="Type a note..." />
                    <button className="btn btn-default">Send</button>
                  </div>
                </div>
                <div className={classNames("item text", {active: this.state.carousel.text})}>
                  <section className="postarea notes">
                    {this.renderPatientText()}
                  </section>
                  <div className="textarea">
                    <textarea className="form-control" placeholder="Type a message..." />
                    <button className="btn btn-default">Send</button>
                  </div>
                </div>
                <div className={classNames("item emails-info", {active: this.state.carousel.email})}>
                  Coming soon
                </div>
                {this.renderOtherSection()}
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    );
  }
}

export default PatientDetailModal;
