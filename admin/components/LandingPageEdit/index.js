import React from 'react';
import RichTextEditor from 'react-rte';
import { Field } from 'redux-form';
import Input from '../../components/Input';
import Toggle from '../../components/Input/Toggle';
import Checkbox from '../../components/Input/Checkbox';
import defaultImage from '../../assets/images/picin.jpg';

export default class LandingPageEdit extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = {
      code: RichTextEditor.createEmptyValue(),
      studyAdModalOpen: false,
      studyPreviewModalOpen: false,
      updatedStudyAd: null,
    };

    this.updateCode = this.updateCode.bind(this);
    this.openStudyAdModal = this.openStudyAdModal.bind(this);
    this.closeStudyAdModal = this.closeStudyAdModal.bind(this);
    this.openStudyPreviewModal = this.openStudyPreviewModal.bind(this);
    this.closeStudyPreviewModal = this.closeStudyPreviewModal.bind(this);
  }

  updateCode(newCode) {
    this.setState({ code: newCode });
  }

  closeStudyAdModal() {
    this.setState({ studyAdModalOpen: false });
  }

  openStudyAdModal() {
    this.setState({ studyAdModalOpen: true });
  }

  closeStudyPreviewModal() {
    this.setState({ studyPreviewModalOpen: false });
  }

  openStudyPreviewModal() {
    this.setState({ studyPreviewModalOpen: true });
  }

  render() {
    const fileSrc = defaultImage;
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' },
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'H1', style: 'header-one' },
        { label: 'H2', style: 'header-two' },
        { label: 'H3', style: 'header-three' },
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
        { label: '"', style: 'blockquote' },
      ],
    };

    return (
      <div id="landingPageEdit">
        <section className="text">
          <div>
            <label htmlFor="new-patient-phone">Text:</label>
            <div className="field rich-text-editor-container">
              <RichTextEditor
                value={this.state.code}
                onChange={this.updateCode}
                toolbarConfig={toolbarConfig}
              />
            </div>
          </div>
        </section>
        <section className="initial-text-message">
          <div>
            <label htmlFor="new-patient-phone">Initial text message:</label>
            <div className="field">
              <Field
                name="initialMessageText"
                component={Input}
                componentClass="textarea"
              />
            </div>
          </div>
        </section>
        <section className="study-ad">
          <div>
            <label htmlFor="new-patient-phone">Study Ad:</label>
            <div className="field">
              { fileSrc &&
                <div className="img-preview">
                  <a
                    className="lightbox-opener"
                    onClick={this.openStudyPreviewModal}
                  >
                    <img src={fileSrc} id="img-preview" alt="preview" />
                  </a>
                </div>
              }
              <a
                className="btn btn-gray upload-btn"
                onClick={this.openStudyAdModal}
              >
                update study ad
              </a>
            </div>
          </div>
        </section>
        <section className="custom-info-fields">
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-first-name">Title:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                id="enter-landing-page-name"
                name="title"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-first-name">Location:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                id="enter-landing-page-location"
                name="locationMask"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-first-name">Enter Your information To Join!:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                id="enter-landing-page-name"
                name="instructions"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-first-name">Full Name:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                id="landing-page-name"
                name="fullNamePlaceholder"
                component={Input}
                required
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-email">Email:</label>
            </strong>
            <div className="field">
              <Field
                type="email"
                name="emailPlaceholder"
                component={Input}
                required
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">Mobile Phone:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="phonePlaceholder"
                component={Input}
                required
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">Sign up Now!:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="signupButtonText"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">Click To Call!:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="clickToCallButtonText"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">Click To Call number:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="clickToCallButtonNumber"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">If interested, enter information above to sign up!:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="ifInterestedInstructions"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">By Signing up...:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="bySignUpText"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">Share this study:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="shareThisStudyText"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-first-name">Initial text:</label>
            </strong>
            <div className="field">
              <Field
                name="isSendInitialMessageText"
                component={Toggle}
                className="field"
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-first-name">Upcoming Study:</label>
            </strong>
            <div className="field">
              <Field
                name="upcomingStudy"
                component={Toggle}
                className="field"
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">Hide click to call button:</label>
            </strong>
            <div className="field">
              <Field
                type="checkbox"
                name="hideClickToCall"
                component={Checkbox}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">Hide share this study Icons and text:</label>
            </strong>
            <div className="field">
              <Field
                type="checkbox"
                name="showSocialMediaButtons"
                component={Checkbox}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">MLP Distance:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="distance"
                component={Input}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">MLP Phone:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="mlpPhone"
                component={Input}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
