import React, { PropTypes } from 'react';
import { Field, reduxForm, change, touch } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Parallax } from 'react-parallax';
import ReCAPTCHA from 'react-google-recaptcha';

import FindOutPatientsFormValidator, { fields } from './validator';
import Input from '../../../app/components/Input';
import { selectSyncErrorBool } from '../../../app/common/selectors/form.selector';

import img2 from '../../assets/images/img2.svg';
import img3 from '../../assets/images/img3.svg';
import bg1 from '../../assets/images/bg1.jpg';
import { translate } from '../../../common/utilities/localization';

const formName = 'find-location';
@reduxForm({
  form: formName,
  validate: FindOutPatientsFormValidator,
})

export class FindOutPatientsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    change: React.PropTypes.func,
    formError: React.PropTypes.bool.isRequired,
    touchFields: React.PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange(value) {
    this.props.change('reCaptcha', value);
    // if (value) {
    //   this.props.handleSubmit();
    //   this.recaptcha.reset();
    // }
  }

  render() {
    return (
      <form
        action="#"
        className="form-find-location"
        data-formvalidation="true"
        onSubmit={(e) => {
          e.preventDefault();
          const { formError, touchFields } = this.props;
          if (formError) {
            touchFields();
            return;
          }
          this.props.handleSubmit();
          this.recaptcha.reset();
        }}
      >
        <Parallax bgImage={bg1} bgWidth="auto" bgHeight="1090px" strength={800}>
          <div className="container">
            <h2>{translate('corporate.page.trials.findOutPatientsForm.header')}</h2>
            <div className="form-holder">
              <Field
                name="fullName"
                type="text"
                component={Input}
                placeholder={translate('corporate.page.trials.findOutPatientsForm.placeholder1')}
                className="field-wrapper"
                bsClass="form-control input-lg"
              />
              <Field
                name="email"
                type="text"
                component={Input}
                placeholder={translate('corporate.page.trials.findOutPatientsForm.placeholder2')}
                className="field-wrapper"
                bsClass="form-control input-lg"
              />
              <Field
                name="company"
                type="text"
                component={Input}
                placeholder={translate('corporate.page.trials.findOutPatientsForm.placeholder3')}
                className="field-wrapper"
                bsClass="form-control input-lg"
              />
              <Field
                name="postalCode"
                type="text"
                component={Input}
                placeholder={translate('corporate.page.trials.findOutPatientsForm.placeholder4')}
                className="field-wrapper"
                bsClass="form-control input-lg"
              />
              <Field
                name="indication"
                type="text"
                component={Input}
                placeholder={translate('corporate.page.trials.findOutPatientsForm.placeholder5')}
                className="field-wrapper"
                bsClass="form-control input-lg"
                onFocus={this.focusField}
                onBlur={this.blurField}
              />
              <Field
                name="reCaptcha"
                type="hidden"
                component={Input}
                className="field-wrapper"
                bsClass="form-control input-lg"
              />
              <ReCAPTCHA
                ref={(ref) => { this.recaptcha = ref; }}
                sitekey={SITE_KEY}
                onChange={this.onChange}
                className="recaptcha-wrapper"
              />
              <input type="submit" className="btn btn-block input-lg" value={translate('corporate.page.trials.findOutPatientsForm.buttonText')} />
              <div className="images">
                <div className="img-holder left">
                  <img src={img2} alt="img2" width="232" height="279" className="img-responsive" />
                </div>
                <div className="img-holder right">
                  <img src={img3} alt="img3" width="193" height="302" className="img-responsive" />
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </form>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
});
function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FindOutPatientsForm);
