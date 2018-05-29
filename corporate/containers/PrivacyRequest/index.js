import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Field, reduxForm, change, reset, touch } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';
import inViewport from 'in-viewport';

import Input from '../../../app/components/Input/index';
import ReactSelect from '../../../app/components/Input/ReactSelect';
import BackToTopButton from '../../components/BackTopButton';
import { translate } from '../../../common/utilities/localization';

import { selectSyncErrorBool, selectValues } from '../../../app/common/selectors/form.selector';

import {
  selectPrivacyRequestSuccess,
} from '../../../app/containers/App/selectors';

import {
  privacyRequest,
  resetPrivacyRequestSuccess,
} from '../../../app/containers/App/actions';

import formValidator, { fields } from './validator';

import './style.less';

// import formValidator, { fields } from './validator';

const formName = 'privacyForm';

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  privacyRequest: selectValues(formName),
  newPrivacyRequestSuccess: selectPrivacyRequestSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitForm: (values) => dispatch(privacyRequest(values)),
    resetPrivacyRequestSuccess: () => dispatch(resetPrivacyRequestSuccess()),
    change: (name, value) => dispatch(change(formName, name, value)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(mapStateToProps, mapDispatchToProps)
export default class PrivacyRequestPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    change: React.PropTypes.func,
    newPrivacyRequestSuccess: React.PropTypes.any,
    resetPrivacyRequestSuccess: React.PropTypes.func,
    submitForm: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    privacyRequest: React.PropTypes.any,
    touchFields: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.watcher = null;
    this.setVisible = this.setVisible.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      requestId: 0,
    };

    this.optdone = [
      { id: 1, name: translate('corporate.page.privacyrequest.request.opt1'), value: translate('corporate.page.privacyrequest.request.opt1') },
      { id: 2, name: translate('corporate.page.privacyrequest.request.opt2'), value: translate('corporate.page.privacyrequest.request.opt2') },
      { id: 3, name: translate('corporate.page.privacyrequest.request.opt3'), value: translate('corporate.page.privacyrequest.request.opt3') },
      { id: 4, name: translate('corporate.page.privacyrequest.request.opt4'), value: translate('corporate.page.privacyrequest.request.opt4') },
      { id: 5, name: translate('corporate.page.privacyrequest.request.opt5'), value: translate('corporate.page.privacyrequest.request.opt5') },
      { id: 6, name: translate('corporate.page.privacyrequest.request.opt6'), value: translate('corporate.page.privacyrequest.request.opt6') },
      { id: 7, name: translate('corporate.page.privacyrequest.request.opt7'), value: translate('corporate.page.privacyrequest.request.opt7') },
    ];
    this.placeholders = [
      [translate('corporate.page.privacyrequest.request.opt1placeholder1'), translate('corporate.page.privacyrequest.request.opt1placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt2placeholder1'), translate('corporate.page.privacyrequest.request.opt2placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt3placeholder1'), translate('corporate.page.privacyrequest.request.opt3placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt4placeholder1'), translate('corporate.page.privacyrequest.request.opt4placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt5placeholder1'), ''],
      [translate('corporate.page.privacyrequest.request.opt6placeholder1'), translate('corporate.page.privacyrequest.request.opt6placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt7placeholder1'), ''],
    ];
  }

  componentDidMount() {
    this.watcher = inViewport(this.animatedForm, this.setVisible);
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  onChange(value) {
    this.props.change('reCaptcha', value);
  }

  onChangeRequest(val) {
    const selected = this.optdone.find((item) => {
      return item.value === val;
    });
    if (selected) {
      this.setState({ requestId: selected.id });
    } else {
      this.setState({ requestId: 0 });
    }
    const { privacyRequest } = this.props;

    privacyRequest.subrequest = '';
    privacyRequest.message = '';
    if (selected && selected.id !== 4) {
      privacyRequest.subrequest2 = 'ignore';
    } else {
      privacyRequest.subrequest2 = '';
    }
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  handleSubmit(ev) {
    ev.preventDefault();

    const { formError, touchFields } = this.props;
    const { privacyRequest, submitForm } = this.props;

    if (this.state.requestId === 5) {
      privacyRequest.subrequest = 'ignore';
    }

    if (this.state.requestId !== 4) {
      privacyRequest.subrequest2 = 'ignore';
    } else {
      privacyRequest.subrequest2 = '';
    }

    const request = Object.assign({}, privacyRequest);
    if (formError) {
      touchFields();
      return;
    }

    for (let i = 0; i < 2; i++) {
      if (this.placeholders[this.state.requestId - 1][i] !== '') {
        request[`placeholder${i}`] = this.placeholders[this.state.requestId - 1][i];
      }
    }
    submitForm(request);
    if (this.recaptcha) {
      this.recaptcha.reset();
    }
  }

  renderExtend() {
    const extendType = [
      ['drop', 'text'],
      ['drop', 'text'],
      ['drop', 'text'],
      ['text', 'text'],
      ['text', 'no'],
      ['drop', 'text'],
      ['text', 'no'],
    ];
    const subOptions = [
      [
        { id: 1, name: translate('corporate.page.privacyrequest.request.opt1info1'), value: translate('corporate.page.privacyrequest.request.opt1info1') },
        { id: 2, name: translate('corporate.page.privacyrequest.request.opt1info2'), value: translate('corporate.page.privacyrequest.request.opt1info2') },
        { id: 3, name: translate('corporate.page.privacyrequest.request.opt1info3'), value: translate('corporate.page.privacyrequest.request.opt1info3') },
        { id: 4, name: translate('corporate.page.privacyrequest.request.opt1info4'), value: translate('corporate.page.privacyrequest.request.opt1info4') },
        { id: 5, name: translate('corporate.page.privacyrequest.request.opt1info5'), value: translate('corporate.page.privacyrequest.request.opt1info5') },
        { id: 6, name: translate('corporate.page.privacyrequest.request.opt1info6'), value: translate('corporate.page.privacyrequest.request.opt1info6') },
      ],
      [
        { id: 1, name: translate('corporate.page.privacyrequest.request.opt2info1'), value: translate('corporate.page.privacyrequest.request.opt2info1') },
        { id: 2, name: translate('corporate.page.privacyrequest.request.opt2info2'), value: translate('corporate.page.privacyrequest.request.opt2info2') },
      ],
      [
        { id: 1, name: translate('corporate.page.privacyrequest.request.opt3info1'), value: translate('corporate.page.privacyrequest.request.opt3info1') },
        { id: 2, name: translate('corporate.page.privacyrequest.request.opt3info2'), value: translate('corporate.page.privacyrequest.request.opt3info2') },
        { id: 3, name: translate('corporate.page.privacyrequest.request.opt3info3'), value: translate('corporate.page.privacyrequest.request.opt3info3') },
        { id: 4, name: translate('corporate.page.privacyrequest.request.opt3info4'), value: translate('corporate.page.privacyrequest.request.opt3info4') },
        { id: 5, name: translate('corporate.page.privacyrequest.request.opt3info5'), value: translate('corporate.page.privacyrequest.request.opt3info5') },
        { id: 6, name: translate('corporate.page.privacyrequest.request.opt3info6'), value: translate('corporate.page.privacyrequest.request.opt3info6') },
        { id: 7, name: translate('corporate.page.privacyrequest.request.opt3info7'), value: translate('corporate.page.privacyrequest.request.opt3info7') },
        { id: 8, name: translate('corporate.page.privacyrequest.request.opt3info8'), value: translate('corporate.page.privacyrequest.request.opt3info8') },
      ],
      [],
      [],
      [
        { id: 1, name: translate('corporate.page.privacyrequest.request.opt6info1'), value: translate('corporate.page.privacyrequest.request.opt6info1') },
        { id: 2, name: translate('corporate.page.privacyrequest.request.opt6info2'), value: translate('corporate.page.privacyrequest.request.opt6info2') },
        { id: 3, name: translate('corporate.page.privacyrequest.request.opt6info3'), value: translate('corporate.page.privacyrequest.request.opt6info3') },
      ],
    ];
    const output = [];
    for (let i = 0; i < 2; i++) {
      if (extendType[this.state.requestId - 1][i] === 'drop') {
        output.push(<div className="field-row" key={`${this.state.requestId}0${i}`}>
          <Field
            name="subrequest"
            component={ReactSelect}
            placeholder={this.placeholders[this.state.requestId - 1][i]}
            options={subOptions[this.state.requestId - 1]}
            className="field-lg"
            mobileEnabled
            required
          />
        </div>);
      }

      if (extendType[this.state.requestId - 1][i] === 'text') {
        let fieldName = 'message';
        if (this.state.requestId !== 5 && i === 0) {
          fieldName = 'subrequest';
        }
        if (this.state.requestId === 4 && i === 1) {
          fieldName = 'subrequest2';
        }
        output.push(<div className="field-row" key={`${this.state.requestId}0${i}`}>
          <Field
            name={fieldName}
            placeholder={this.placeholders[this.state.requestId - 1][i]}
            component={Input}
            className="field-lg"
            bsClass="form-control input-lg"
            componentClass="textarea"
          />
        </div>);
      }
    }
    return output;
  }

  render() {
    const company = { Yourcompany: 'Yourcompany' };
    const opt = [
      { id: 1, name: 'I\'m a person', value: 'I\'m a person' },
      { id: 2, name: 'I\'m representing an organization', value: 'I\'m representing an organization' },
    ];


    return (
      <main id="main">
        <div className="container corporate-site">
          <section className="privacy-request">
            <header className="text-center">
              <h2 className="main-heading">{translate('corporate.page.privacyrequest.header')}</h2>
              <h3 dangerouslySetInnerHTML={{ __html: translate('corporate.page.privacyrequest.headerText', company) }} />
              <p>{translate('corporate.page.privacyrequest.effective')} <a href="/">{company.Yourcompany}</a></p>
            </header>
            <form
              ref={(animatedForm) => { this.animatedForm = animatedForm; }}
              action="#"
              className="form-privacy"
              noValidate="novalidate"
              data-view="fadeInUp"
              onSubmit={(ev) => this.handleSubmit(ev)}
            >
              <div className="field-row">
                <Field
                  name="type"
                  component={ReactSelect}
                  placeholder={translate('corporate.page.privacyrequest.type')}
                  options={opt}
                  className="field-lg"
                  mobileEnabled
                  required
                />
              </div>
              <div className="field-row">
                <Field
                  name="name"
                  placeholder={translate('corporate.page.privacyrequest.namePlaceholder')}
                  component={Input}
                  type="text"
                  className="field-lg"
                  bsClass="form-control input-lg"
                  id=""
                  mobileEnabled
                />
              </div>
              <div className="field-row">
                <Field
                  name="email"
                  placeholder={translate('corporate.page.privacyrequest.emailPlaceholder')}
                  component={Input}
                  type="email"
                  className="field-lg"
                  bsClass="form-control input-lg"
                  id=""
                  mobileEnabled
                />
              </div>
              <div className="field-row">
                <Field
                  name="request"
                  component={ReactSelect}
                  placeholder={translate('corporate.page.privacyrequest.request')}
                  options={this.optdone}
                  className="field-lg"
                  mobileEnabled
                  required
                  onChange={(value) => this.onChangeRequest(value)}
                />
              </div>
              { this.state.requestId !== 0 && this.renderExtend()}
              <div className="field-row">
                <ReCAPTCHA
                  ref={(ref) => { this.recaptcha = ref; }}
                  sitekey={SITE_KEY}
                  onChange={this.onChange}
                  className="recaptcha-wrapper"
                />
                <Field
                  name="reCaptcha"
                  type="hidden"
                  component={Input}
                  className="field"
                  bsClass="form-control input-lg"
                />
              </div>
              <div className="field-row">
                <input type="submit" className="btn btn-default btn-block input-lg" value={translate('corporate.page.contactPage.submit')} />
              </div>
            </form>
          </section>
        </div>
        <BackToTopButton />
      </main>
    );
  }

}
