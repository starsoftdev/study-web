import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';
import inViewport from 'in-viewport';

import Input from '../../../app/components/Input/index';
import ReactSelect from '../../../app/components/Input/ReactSelect';
import BackToTopButton from '../../components/BackTopButton';
import { translate } from '../../../common/utilities/localization';

import './style.less';

const formName = 'privacyForm';

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
  };
}

@reduxForm({
  form: formName,
})
@connect(null, mapDispatchToProps)
export default class PrivacyRequestPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    change: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.watcher = null;
    this.setVisible = this.setVisible.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      requestId: 0,
    };
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

  onChangeRequest(value) {
    if (value) {
      this.setState({ requestId: value });
    } else {
      this.setState({ requestId: 0 });
    }
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
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
    const placeholders = [
      [translate('corporate.page.privacyrequest.request.opt1placeholder1'), translate('corporate.page.privacyrequest.request.opt1placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt2placeholder1'), translate('corporate.page.privacyrequest.request.opt2placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt3placeholder1'), translate('corporate.page.privacyrequest.request.opt3placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt4placeholder1'), translate('corporate.page.privacyrequest.request.opt4placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt5placeholder1'), ''],
      [translate('corporate.page.privacyrequest.request.opt6placeholder1'), translate('corporate.page.privacyrequest.request.opt6placeholder2')],
      [translate('corporate.page.privacyrequest.request.opt7placeholder1'), ''],
    ];
    const subOptions = [
      [
        { id: 1, name: translate('corporate.page.privacyrequest.request.opt1info1') },
        { id: 2, name: translate('corporate.page.privacyrequest.request.opt1info2') },
        { id: 3, name: translate('corporate.page.privacyrequest.request.opt1info3') },
        { id: 4, name: translate('corporate.page.privacyrequest.request.opt1info4') },
        { id: 5, name: translate('corporate.page.privacyrequest.request.opt1info5') },
        { id: 6, name: translate('corporate.page.privacyrequest.request.opt1info6') },
      ],
      [
        { id: 1, name: translate('corporate.page.privacyrequest.request.opt2info1') },
        { id: 2, name: translate('corporate.page.privacyrequest.request.opt2info2') },
      ],
      [
        { id: 1, name: translate('corporate.page.privacyrequest.request.opt3info1') },
        { id: 2, name: translate('corporate.page.privacyrequest.request.opt3info2') },
        { id: 3, name: translate('corporate.page.privacyrequest.request.opt3info3') },
        { id: 4, name: translate('corporate.page.privacyrequest.request.opt3info4') },
        { id: 5, name: translate('corporate.page.privacyrequest.request.opt3info5') },
        { id: 6, name: translate('corporate.page.privacyrequest.request.opt3info6') },
        { id: 7, name: translate('corporate.page.privacyrequest.request.opt3info7') },
        { id: 8, name: translate('corporate.page.privacyrequest.request.opt3info8') },
      ],
      [],
      [],
      [
        { id: 1, name: translate('corporate.page.privacyrequest.request.opt6info1') },
        { id: 2, name: translate('corporate.page.privacyrequest.request.opt6info2') },
        { id: 3, name: translate('corporate.page.privacyrequest.request.opt6info3') },
      ],
    ];
    const output = [];
    for (let i = 0; i < 2; i++) {
      if (extendType[this.state.requestId - 1][i] === 'drop') {
        output.push(<div className="field-row" key={`${this.state.requestId}0${i}`}>
          <Field
            name="subrequest"
            component={ReactSelect}
            placeholder={placeholders[this.state.requestId - 1][i]}
            options={subOptions[this.state.requestId - 1]}
            className="field-lg"
            mobileEnabled
            required
          />
        </div>);
      }

      if (extendType[this.state.requestId - 1][i] === 'text') {
        output.push(<div className="field-row" key={`${this.state.requestId}0${i}`}>
          <Field
            name="message"
            placeholder={placeholders[this.state.requestId - 1][i]}
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
    const opt = [{ id: 1, name: 'I\'m a person' }, { id: 2, name: 'I\'m representing an organization' }];
    const optdone = [
      { id: 1, name: translate('corporate.page.privacyrequest.request.opt1') },
      { id: 2, name: translate('corporate.page.privacyrequest.request.opt2') },
      { id: 3, name: translate('corporate.page.privacyrequest.request.opt3') },
      { id: 4, name: translate('corporate.page.privacyrequest.request.opt4') },
      { id: 5, name: translate('corporate.page.privacyrequest.request.opt5') },
      { id: 6, name: translate('corporate.page.privacyrequest.request.opt6') },
      { id: 7, name: translate('corporate.page.privacyrequest.request.opt7') },
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
              onSubmit={this.handleSubmit}
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
                  options={optdone}
                  className="field-lg"
                  mobileEnabled
                  required
                  onChange={(value) => this.onChangeRequest(value)}
                />
              </div>
              { this.state.requestId > 0 && this.renderExtend()}
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
