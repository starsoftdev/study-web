import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import t from 'tcomb-form'

import { submitOrderIRBAd } from 'actions'

import './styles.less'

const { Form } = t.form

const Currency = t.refinement(t.Str, (str) => {
  const regex = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/
  return regex.test(str)
})
Currency.getValidationErrorMessage = (value, path, context) => {
  return 'This is not a valid currency format.'
}

const irbAdForm = t.struct({
  siteLocation: t.enums({}),
  indication: t.enums({}),
  irbName: t.maybe(t.Str),
  irbEmail: t.maybe(t.Str),
  compensationAmount: t.maybe(Currency),
  clinicaltrialsGovLink: t.maybe(t.Str),
  notes: t.maybe(t.Str),
})

const irbAdValues = {
  siteLocation: null,
  indication: null,
  irbName: null,
  irbEmail: null,
  compensationAmount: null,
  clinicaltrialsGovLink: null,
  notes: null,
}

const irbAdTemplate = (locals) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-3 col-md-offset-2">SITE LOCATION *</div>
        <div className="col-md-5">{locals.inputs.siteLocation}</div>
      </div>
      <div className="row">
        <div className="col-md-3 col-md-offset-2">INDICATION *</div>
        <div className="col-md-5">{locals.inputs.indication}</div>
      </div>
      <div className="row">
        <div className="col-md-3 col-md-offset-2">IRB NAME</div>
        <div className="col-md-5">{locals.inputs.irbName}</div>
      </div>
      <div className="row">
        <div className="col-md-3 col-md-offset-2">IRB EMAIL</div>
        <div className="col-md-5">{locals.inputs.irbEmail}</div>
      </div>
      <div className="row">
        <div className="col-md-3 col-md-offset-2">COMPENSATION AMOUNT</div>
        <div className="col-md-5">{locals.inputs.compensationAmount}</div>
      </div>
      <div className="row">
        <div className="col-md-3 col-md-offset-2">CLINICALTRIALS.GOV LINK</div>
        <div className="col-md-5">{locals.inputs.clinicaltrialsGovLink}</div>
      </div>
      <div className="row">
        <div className="col-md-3 col-md-offset-2">FILE UPLOADED PROTOCOL</div>
        <div className="col-md-5">
          <div className="form-group">
            <div className="fileUpload btn form-control">
              <span>BROWSE</span>
              <input type="file" className="upload" name="fileUploadedProtocol" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-md-offset-2">NOTES</div>
        <div className="col-md-5">{locals.inputs.notes}</div>
      </div>
    </div>
  )
}

const irbAdOptions = {
  template: irbAdTemplate,
  auto: 'none',
  fields: {
    siteLocation: {
      nullOption: {
        value: '',
        text: 'Select Site Location'
      },
    },
    indication: {
      nullOption: {
        value: '',
        text: 'Select Indication'
      },
    },
  }
}

class OrderIRBAdCreation extends React.Component {
  static propTypes = {
    isSaving: PropTypes.bool,
    submitOrderIRBAd: PropTypes.func,
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const value = this.refs.form.getValue()

    if (value) {
      this.props.submitOrderIRBAd(value)
    }
  }

  render () {
    const { isSaving } = this.props

    return (
      <div className="irb-ad-creation-wrapper">
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <Form
            ref="form"
            type={irbAdForm}
            options={irbAdOptions}
            value={irbAdValues}
          />
          <br />
          <div className="row">
            <div className="col-md-offset-8 col-md-2">
                <button className="btn btn-success btn-block" type="submit" disabled={isSaving}>
                  {isSaving ? <i className="fa fa-repeat fa-spin" /> : 'SUBMIT'}
                </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isSaving: state.submittingOrderIRBAd,
})

const mapDispatchToProps = {
  submitOrderIRBAd,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderIRBAdCreation)
