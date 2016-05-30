import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form'

import { submitGetTrialNotificationForm } from 'actions'

import {
  getModel as getFormType,
  options as formOptions
} from 'forms/GetTrialNotification'

import './styles.less'
import logoSliderImg from 'assets/images/logo-slider.png'

const TCombForm = t.form.Form

let NEW_FORM = {
  fullName: '',
  email: '',
  phone: '',
}

class GetTrialNotificationForm extends React.Component {
  static propTypes = {
    isSaving: PropTypes.bool,
    getNotifiedWithTrials: PropTypes.func,
  }

  constructor (props) {
    super(props)

    this.state = {
      options: formOptions,
      formData: NEW_FORM,
    }
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const value = this.refs.form.getValue()

    if (value) {
      this.props.getNotifiedWithTrials(value)
    }
  }

  render () {
    const { formData } = this.state
    const { isSaving } = this.props
    return (
      <div className="banner">
        <div className="col-md-2 slider-form">
          <form
            className="form-green proposal-form"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <p>Be Notified About Clinical Trials!</p>
            <TCombForm
              ref="form"
              type={getFormType(formData)}
              options={this.state.options}
              value={formData}
            />
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-green block"
                disabled={isSaving}
              >
                {isSaving
                  ? <span>Saving...</span>
                  : 'Submit Information!'
                }
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-8 slider">
          <img src={logoSliderImg} className="slider-image" />
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  isSaving: state.submittingGetTrialNotificationForm,
})
const mapDispatchToProps = {
  submitGetTrialNotificationForm,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetTrialNotificationForm)
