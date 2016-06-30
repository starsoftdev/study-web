import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form'

import { saveReferralForm } from 'actions'

import {
  schema as formSchema,
  options as formOptions,
} from 'forms/GetReferral'

const TCombForm = t.form.Form

class GetProposalForm extends React.Component {
  static propTypes = {
    isSaving: PropTypes.bool,
    saveReferralForm: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const value = this.refs.form.getValue()

    if (value) {
      this.props.saveReferralForm(value)
    }
  }

  render () {
    const isSaving = this.props.isSaving
    return (
      <form
        className="form-green referral-form"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <TCombForm
          ref="form"
          type={formSchema}
          options={formOptions}
        />
        <div className="form-group pull-right">
          <button
            type="submit"
            className="btn btn-orange block"
            disabled={isSaving}
          >
            {isSaving
              ? <span>Saving...</span>
              : 'Submit'
            }
          </button>
        </div>
      </form>
    )
  }
}


const mapStateToProps = (state) => ({
  isSaving: state.savingReferralForm,
})
const mapDispatchToProps = {
  saveReferralForm,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetProposalForm)
