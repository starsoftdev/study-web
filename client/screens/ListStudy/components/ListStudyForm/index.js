import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import t from 'tcomb-form'
import ReactTooltip from 'react-tooltip'
import Select2 from 'react-select2-wrapper'
import _ from 'lodash'

import { submitListStudy, fetchSiteLocations, fetchStudyCategories, fetchStudyLevels } from 'actions'
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
console.log(t.form.Form.templates)
const select2Template = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    return (
      <Select2
        data={locals.options}
        className="form-control"
        name={locals.attrs.name}
        id={locals.attrs.id}
        onChange={function (evt) { locals.onChange(evt.target.value) }}
      />
    )
  }
})


// let select2Template = function (locals) {
//   console.log(locals)
//   return (
//     <div className={'form-group form-group-depth-1 form-group-' + locals.attrs.name}>
//       <label htmlFor={locals.attrs.id} className="col-md-4 control-label">{locals.label}</label>
//       <div className="col-md-8">
//         <Select2
//           data={locals.options}
//           options={{
//             placeholder: 'Select Site Location',
//           }}
//           className="form-control"
//           name={locals.attrs.name}
//           id={locals.attrs.id}
//           onChange={function (evt) { locals.onChange(evt.target.value) }}
//         />
//       </div>
//     </div>
//   )
// }

const studyValues = {
  site_id: null,
  recruitment_phone: null,
  indication: null,
  protocol_number: null,
  sponsor_name: null,
  sponsor_email: null,
  cro_name: null,
  cro_email: null,
  irb_name: null,
  irb_email: null,
  exposure_level: null,
  campaign_length: null,
  // patientMessagingSuite: null,
  // callTracking: null,
  start_date: null,
  notes: null
}

const studyOptions = {
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
      template: select2Template,
      nullOption: {
        value: '',
        text: 'Select Site Location'
      },
    },
    recruitmentPhone: {
      label: 'RECRUITMENT PHONE *'
    },
    indication: {
      label: 'INDICATION *',
      nullOption: {
        value: '',
        text: 'Select Indication'
      },
    },
    uploadStudyAd: {
      type: 'file',
      label: 'UPLOAD STUDY AD'
    },
    protocolNumber: {
      label: 'PROTOCOL NUMBER *'
    },
    sponsorName: {
      label: 'SPONSOR NAME *'
    },
    sponsorEmail: {
      label: 'SPONSOR EMAIL'
    },
    croName: {
      label: 'CRO NAME'
    },
    croEmail: {
      label: 'CRO EMAIL'
    },
    irbName: {
      label: 'IRB NAME'
    },
    irbEmail: {
      label: 'IRB EMAIL'
    },
    exposureLevel: {
      label: 'EXPOSURE LEVEL *',
      nullOption: {
        value: '',
        text: 'Select Exposure Level'
      }
    },
    campaignLength: {
      label: 'CAMPAIGN LENGTH *',
      nullOption: {
        value: '',
        text: 'Select Campaign Length'
      }
    },
    patientMessagingSuite: {
      label: 'PATIENT MESSAGING SUITE: $247'
    },
    callTracking: {
      label: 'CALL TRACKING: $247'
    },
    startDate: {
      label: 'START DATE  *'
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


function objectFromStudyLevels (arr, key) {
  let obj = {}
  for (let item of arr) {
    obj[item[key]] = item['type'] + ' - ' + item['price']
  }

  return obj
}

class ListStudyForm extends React.Component {
  static propTypes = {
    authorization: PropTypes.object,
    isSaving: PropTypes.bool,
    siteLocations: PropTypes.object,
    studyLevels: PropTypes.object,
    studyCategories: PropTypes.object,
    submitListStudy: PropTypes.func,
    savedStudy: PropTypes.object,
    fetchSiteLocations: PropTypes.func,
    fetchStudyCategories: PropTypes.func,
    fetchStudyLevels: PropTypes.func,
  }

  state = {
    formOptions: studyOptions,
    formValues: studyValues,
  }

  componentWillMount () {
    const { fetchSiteLocations, fetchStudyCategories, fetchStudyLevels } = this.props

    fetchSiteLocations()
    fetchStudyCategories()
    fetchStudyLevels()
  }

  componentWillReceiveProps (nextProps) {
    const { siteLocations, studyCategories, studyLevels, savedStudy } = nextProps
    console.log('saved study')
    console.log(savedStudy)
    if (siteLocations.isFetching || studyCategories.isFetching || studyLevels.isFetching) {
      this.studyForm = null
    }
    else {
      const siteLocationsObj = objectFromArray(siteLocations.siteLocations, 'id', 'name')
      const studyCategoriesObj = objectFromArray(studyCategories.studyCategories, 'id', 'name')
      const studyLevelsObj = objectFromStudyLevels(studyLevels.studyLevels, 'id')
      const exposureLevelObj = {
        'Diamond Listing': 'Diamond Listing: $3,059',
        'Platinum Listing': 'Platinum Listing: $1,559',
        'Gold Listing': 'Gold Listing: $559',
        'Silver Listing': 'Silver Listing: $209',
        'Bronze Listing': 'Bronze Listing: $59'
      }
      const campaignLengthObj = {
        '1': '1 Month',
        '2': '2 Months',
        '3': '3 Months',
        '4': '4 Months',
        '5': '5 Months',
        '6': '6 Months',
        '7': '7 Months',
        '8': '8 Months',
        '9': '9 Months',
        '10': '10 Months',
        '11': '11 Months',
        '12': '12 Months'
      }

      this.studyForm = t.struct({
        siteLocation: t.enums(siteLocationsObj),
        recruitmentPhone: t.Str,
        indication: t.enums(studyCategoriesObj),
        uploadStudyAd: t.maybe(t.form.File),
        protocolNumber: t.Str,
        sponsorName: t.Str,
        sponsorEmail: t.maybe(t.Str),
        croName: t.maybe(t.Str),
        croEmail: t.maybe(t.Str),
        irbName: t.maybe(t.Str),
        irbEmail: t.maybe(t.Str),
        exposureLevel: t.enums(studyLevelsObj),
        campaignLength: t.enums(campaignLengthObj),
        patientMessagingSuite: t.maybe(t.Bool),
        callTracking: t.maybe(t.Bool),
        startDate: t.Date,
        notes: t.maybe(t.Str)
      })
    }
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const validateResult = this.refs.form.validate()
    let newFormOptions = _.cloneDeep(studyOptions)
    console.log(validateResult)
    console.log(newFormOptions)
    if (validateResult.errors.length > 0) {
      for (let err of validateResult.errors) {
        _.set(newFormOptions, `fields.${err.path[0]}.attrs.data-tip`, err.message)
      }
    }
    else {
      const { value } = validateResult
      const newValue = {
        site_id: value.siteLocation,
        recruitment_phone: value.recruitmentPhone,
        indication: value.indication,
        protocol_number: value.protocolNumber,
        sponsor_name: value.sponsorName,
        sponsor_email: value.sponsorEmail,
        cro_name: value.croName,
        cro_email: value.croEmail,
        irb_name: value.irbName,
        irb_email: value.irbEmail,
        exposure_level: value.exposureLevel,
        campaign_length: value.campaignLength,
        // patientMessagingSuite: value.patientMessagingSuite,
        // callTracking: value.callTracking,
        start_date: value.startDate,
        notes: value.notes
      }
      console.log(value)
      console.log(newValue)
      value.uploadStudyAd.uploadFile()
      // this.props.submitListStudy(newValue)
    }

    this.setState({
      formOptions: newFormOptions,
      formValues: validateResult.value
    })
  }

  render () {
    const { isSaving, siteLocations, studyCategories, studyLevels, savedStudy } = this.props

    return (
      <div className="irb-ad-creation-wrapper">
        {
          siteLocations.isFetching || studyCategories.isFetching || studyLevels.isFetching ?
            <LoadingResults /> :
            <div className="col-md-offset-2 col-md-8">
              <form onSubmit={(ev) => this.handleSubmit(ev)}>
                <ReactTooltip type="error" />
                <Form
                  ref="form"
                  type={this.studyForm}
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
  isSaving: state.submittingListStudy,
  siteLocations: state.siteLocations,
  studyCategories: state.studyCategories,
  studyLevels: state.studyLevels,
  savedStudy: state.savedStudy
})

const mapDispatchToProps = {
  fetchSiteLocations,
  fetchStudyCategories,
  fetchStudyLevels,
  submitListStudy,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudyForm)
