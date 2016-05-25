import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form'
import selectn from 'selectn'

import { savePatient } from 'actions'

import {
  getModel as getPatientType,
  options as patientFormOptions
} from 'forms/GetProposal'

const TCombForm = t.form.Form

let NEW_PATIENT = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  siteAddress: '',
  organization: '',
  protocolNumber: '',
  sponsorEmail: '',
  croEmail: '',
  indication: '',
  exposureLevel: '',
  campaignLength: '',
  patientMessagingSuite: false,
}

class GetProposalForm extends React.Component {
  static propTypes = {
    patient: PropTypes.object,
    editing: PropTypes.bool,
    savingPatient: PropTypes.bool,
    savePatient: PropTypes.func,
  }

  static defaultProps = {
    editing: true
  }

  constructor (props) {
    super(props)

    const { patient } = this.props

    if (patient) {
      this.state = {
        options: patientFormOptions,
        patient,
      }
    } else {
      this.state = {
        options: patientFormOptions,
        patient: NEW_PATIENT,
      }
    }
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const value = this.refs.form.getValue()

    if (value) {
      const id = this.state.patient ? this.state.patient.id: null
      this.props.savePatient(id, value)
    }
  }

  render () {
    const { patient } = this.state
    const pageTitle = this.props.editing ? 'Editing Patient' : 'Get A Study Proposal'
    const saving = this.props.savingPatient
    return (
      <form
        className="form-green proposal-form"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <TCombForm
          ref="form"
          type={getPatientType(patient)}
          options={this.state.options}
          value={patient}
        />
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving
              ? <span>Saving...</span>
              : 'Get Proposal!'
            }
          </button>
        </div>
      </form>
    )
  }
}


const mapStateToProps = (state) => ({
  savingPatient: state.savingPatient,
})
const mapDispatchToProps = {
  savePatient,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetProposalForm)
