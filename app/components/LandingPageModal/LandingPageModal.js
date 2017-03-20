/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from '../Input/Checkbox';
import Input from '../Input/index';
import ReactSelect from '../Input/ReactSelect';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';

export class LandingPageModal extends React.Component {
  static propTypes = {
    openModal: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
  };

  render() {
    const { openModal, onClose } = this.props;
    const country = [{ label: 'USA', value: 'USA', id: 0 },
                    { label: 'Canada', value: 'Canada', id: 1 },
                    { label: 'UK', value: 'UK', id: 2 },
                    { label: 'France', value: 'France', id: 3 },
                    { label: 'Italy', value: 'Italy', id: 4 },
                    { label: 'Germany', value: 'Germany', id: 5 },
                    { label: 'Brazil', value: 'Brazil', id: 6 },
                    { label: 'Chile', value: 'Chile', id: 7 },
                    { label: 'Colombia', value: 'Colombia', id: 8 },
                    { label: 'Cuba', value: 'Cuba', id: 9 },
                    { label: 'Czech Republic', value: 'Czech Republic', id: 10 },
                    { label: 'Denmark', value: 'Denmark', id: 11 },
                    { label: 'Fiji', value: 'Fiji', id: 12 },
                    { label: 'Australia', value: 'Australia', id: 13 },
                    { label: 'Hungary', value: 'Hungary', id: 14 },
                    { label: 'Iceland', value: 'Iceland', id: 15 },
                    { label: 'Japan', value: 'Japan', id: 16 },
                    { label: 'Luxembourg', value: 'Luxembourg', id: 17 },
                    { label: 'Malaysia', value: 'Malaysia', id: 18 },
    ];
    return (
      <Collapse dimension="width" in={openModal} timeout={250} className="landing-slider">
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Landing Page</strong>
                <a href="#" className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right"></i></a>
              </div>
            </div>
            <Form className="holder" onSubmit={this.onSubmit}>
              <div className="frame">
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Enter Your...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="enter-landing-page-name"
                      name="pageName"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label required">
                    <label htmlFor="new-patient-first-name">Full Name</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="landing-page-name"
                      name="fullName"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label required">
                    <label htmlFor="new-patient-email">Email</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label required">
                    <label htmlFor="new-patient-phone">Mobile Phone</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="tel"
                      name="cell"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label required">
                    <label htmlFor="new-patient-phone">Country</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="country"
                      component={ReactSelect}
                      placeholder="Select Country"
                      searchPlaceholder="Search"
                      searchable
                      options={country}
                      customSearchIconClass="icomoon-icon_search2"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Sign up Now Button</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="signupBtn"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Click To Call Button</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="clickcallBtn"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Click To Call number</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="clickcallNumber"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Recruitment Number</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="recruitmentNumber"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Study AD</label>
                  </strong>
                  <div className="field">
                    { false && this.state.fileSrc &&
                      <div className="img-preview">
                        <a href="#image-perview" className="lightbox-opener">
                          <img src="images/img5.png" alt="description" onError="this.src='images/error.png';" id="img-preview" /></a>
                      </div>
                    }
                    <label htmlFor="study-ad" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn"></label>
                    <Field
                      id="study-ad"
                      name="studyAd"
                      component={Input}
                      type="file"
                      className="hidden"
                      onChange={this.handleFileChange}
                    />
                    {/* TODO need to put an error message up so that people know to upload a file. */}
                    {/* formError
                    ? <div className="has-error">{formErrors.studyAd}</div>
                    : null
                    */}
                  </div>
                </div>
                <div className="field-row textarea">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Text</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="text"
                      component={Input}
                      componentClass="textarea"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">If Intersted...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="interest"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">By Signing up...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="signingUp"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Share this study</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="shareStudy"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Share this study Icons and text</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="checkbox"
                      name="shareStudyIcon"
                      component={Checkbox}
                    />
                  </div>
                </div>
                <div className="field-row text-right">
                  <Button bsStyle="primary"> Submit </Button>
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

});

export default connect(mapStateToProps)(LandingPageModal);
