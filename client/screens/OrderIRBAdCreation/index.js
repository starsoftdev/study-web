import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import t from 'tcomb-form'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'

import { submitOrderIRBAd } from 'actions'
import { isValidCurrency, strToFloat } from 'utils/number'

import './styles.less'

const { Form } = t.form

const Currency = t.refinement(t.Str, (str) => {
  return isValidCurrency(str)
})
Currency.getValidationErrorMessage = (value, path, context) => {
  return 'Enter a valid currency format.'
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

const irbAdOptions = {
  auto: 'none',
  config: {
    // for each of lg md sm xs you can specify the columns width
    horizontal: {
      md: [ 4, 8 ],
    },
  },
  fields: {
    siteLocation: {
      label: 'SITE LOCATION *',
      nullOption: {
        value: '',
        text: 'Select Site Location'
      },
    },
    indication: {
      label: 'INDICATION *',
      nullOption: {
        value: '',
        text: 'Select Indication'
      },
    },
    irbName: {
      label: 'IRB NAME',
    },
    irbEmail: {
      label: 'IRB EMAIL',
    },
    compensationAmount: {
      label: 'COMPENSATION AMOUNT',
    },
    clinicaltrialsGovLink: {
      label: 'CLINICALTRIALS.GOV LINK'
    },
    notes: {
      label: 'NOTES'
    },
  },
}

class OrderIRBAdCreation extends React.Component {
  static propTypes = {
    isSaving: PropTypes.bool,
    submitOrderIRBAd: PropTypes.func,
  }

  state = {
    formOptions: irbAdOptions
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const validateResult = this.refs.form.validate()
    let newFormOptions = _.cloneDeep(irbAdOptions)

    if (validateResult.errors.length > 0) {
      for (let err of validateResult.errors) {
        _.set(newFormOptions, `fields.${err.path[0]}.attrs.data-tip`, err.message)
      }
    }
    else {
      const value = {
        ...validateResult.value,
        compensationAmount: strToFloat(validateResult.compensationAmount)
      }
      console.log (value)
      this.props.submitOrderIRBAd(value)
    }

    this.setState({
      formOptions: newFormOptions
    })
  }

  render () {
    const { isSaving } = this.props

    return (
      <div className="irb-ad-creation-wrapper">
        <div className="col-md-offset-2 col-md-8">
          <form onSubmit={(ev) => this.handleSubmit(ev)}>
            <ReactTooltip type="error" />
            <Form
              ref="form"
              type={irbAdForm}
              options={this.state.formOptions}
              value={irbAdValues}
              context={{ comp: this }}
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
