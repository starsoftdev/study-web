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

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    const company = { Yourcompany: 'Yourcompany' };
    const opt = [{ id: 10, name: 'test' }];

    return (
      <main id="main">
        <div className="container">
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
                  options={opt}
                  className="field-lg"
                  mobileEnabled
                  required
                />
              </div>
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
