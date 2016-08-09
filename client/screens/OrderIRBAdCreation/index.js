import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import t from 'tcomb-form'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'

import { submitOrderIRBAd, fetchSites, fetchStudyCategories } from 'actions'
import { isValidCurrency, strToFloat } from 'utils/number'

import LoadingResults from 'components/LoadingResults'

import './styles.less'

const { Form } = t.form

const Currency = t.refinement(t.Str, (str) => {
  return isValidCurrency(str)
})
Currency.getValidationErrorMessage = (value, path, context) => {
  return 'Enter a valid currency format.'
}

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

function objectFromArray (arr, key, value) {
  let obj = {}
  for (let item of arr) {
    obj[item[key]] = item[value]
  }

  return obj
}

class OrderIRBAdCreation extends React.Component {
  static propTypes = {
    authorization: PropTypes.object,
    isSaving: PropTypes.bool,
    fetchingSites: PropTypes.bool,
    sites: PropTypes.object,
    studyCategories: PropTypes.object,
    submitOrderIRBAd: PropTypes.func,
    fetchSites: PropTypes.func,
    fetchStudyCategories: PropTypes.func,
  }

  state = {
    formOptions: irbAdOptions,
    formValues: irbAdValues,
  }

  componentWillMount () {
    const { fetchSites, fetchStudyCategories } = this.props

    fetchSites()
    fetchStudyCategories()
  }

  componentWillReceiveProps (nextProps) {
    const { sites, studyCategories, fetchingSites } = nextProps

    if (fetchingSites || studyCategories.isFetching) {
      this.irbAdForm = null
    }
    else {
      const siteLocationsObj = objectFromArray(sites, 'id', 'name')
      const studyCategoriesObj = objectFromArray(studyCategories.studyCategories, 'id', 'name')

      this.irbAdForm = t.struct({
        siteLocation: t.enums(siteLocationsObj),
        indication: t.enums(studyCategoriesObj),
        irbName: t.maybe(t.Str),
        irbEmail: t.maybe(t.Str),
        compensationAmount: t.maybe(Currency),
        clinicaltrialsGovLink: t.maybe(t.Str),
        notes: t.maybe(t.Str),
      })
    }
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
      const { value } = validateResult

      const newValue = {
        irb_name: value.irbName,
        irb_email: value.irbEmail,
        compensation_amount: strToFloat(value.compensationAmount),
        clinicaltrials_gov_link: value.clinicaltrialsGovLink,
        notes: value.notes,
        studyaddress_id: value.siteLocation,
        study_category_id: value.indication,
        user_id: this.props.authorization.authData.userId,
      }

      this.props.submitOrderIRBAd(newValue)
    }

    this.setState({
      formOptions: newFormOptions,
      formValues: validateResult.value
    })
  }

  render () {
    const { isSaving, sites, studyCategories } = this.props

    return (
      <div className="irb-ad-creation-wrapper">
        {
          sites || studyCategories.isFetching ?
            <LoadingResults /> :
            <div className="col-md-offset-2 col-md-8">
              <form onSubmit={(ev) => this.handleSubmit(ev)}>
                <ReactTooltip type="error" />
                <Form
                  ref="form"
                  type={this.irbAdForm}
                  options={this.state.formOptions}
                  value={this.state.formValues}
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
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  isSaving: state.submittingOrderIRBAd,
  sites: state.sites,
  fetchingSites: state.fetchingSites,
  studyCategories: state.studyCategories,
})

const mapDispatchToProps = {
  fetchSites,
  fetchStudyCategories,
  submitOrderIRBAd,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderIRBAdCreation)
