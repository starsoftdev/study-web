import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import { Field, reduxForm } from 'redux-form';
import Input from '../../components/Input';
import Toggle from '../../components/Input/Toggle';
import Checkbox from '../../components/Input/Checkbox';
import defaultImage from '../../assets/images/picin.jpg';

const formName = 'landingPageForm';

@reduxForm({
  form: formName,
  validate: null,
})

export default class LandingPageEdit extends Component { // eslint-disable-line react/prefer-stateless-function

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
        <div className="text">
          <div>
            <strong className="label">
              <label>Text:</label>
            </strong>
            <div className="field rich-text-editor-container">
              <RichTextEditor
                value={this.state.code}
                onChange={this.updateCode}
                toolbarConfig={toolbarConfig}
              />
            </div>
          </div>
        </div>
        <div className="initial-text-message">
          <div>
            <strong className="label">
              <label>Initial text message:</label>
            </strong>
            <div className="field">
              <Field
                name="initialMessageText"
                component={Input}
                componentClass="textarea"
              />
            </div>
          </div>
        </div>
        <div className="study-ad">
          <div>
            <strong className="label">
              <label>Study Ad:</label>
            </strong>
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
        </div>
        <div className="custom-info-fields">
          <div className="field-row">
            <strong className="label">
              <label>Title:</label>
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
              <label>Location:</label>
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
              <label>Enter Your information To Join!:</label>
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
              <label>Full Name:</label>
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
              <label>Email:</label>
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
              <label>Mobile Phone:</label>
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
              <label>Sign up Now!:</label>
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
              <label>Click To Call!:</label>
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
              <label>Click To Call number:</label>
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
              <label>If interested, enter information above to sign up!:</label>
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
              <label>By Signing up...:</label>
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
              <label>Share this study:</label>
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
              <label>Initial text:</label>
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
              <label>Upcoming Study:</label>
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
              <label>Hide click to call button:</label>
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
              <label>Hide share this study Icons and text:</label>
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
              <label>MLP Distance:</label>
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
              <label>MLP Phone:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="mlpPhone"
                component={Input}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
