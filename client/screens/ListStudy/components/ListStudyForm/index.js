import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-router'
import t from 'tcomb-form'
import ReactTooltip from 'react-tooltip'
import Select2 from 'react-select2-wrapper'
import _ from 'lodash'

import { fetchSiteLocations, fetchStudyCategories,
  fetchStudyLevels, fetchAvailNumbers, saveStudy } from 'actions'
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
//console.log(t.form.Form.templates)
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

const exposureLevelObj = {
  'Diamond Listing': 'Diamond Listing: $3,059',
  'Platinum Listing': 'Platinum Listing: $1,559',
  'Gold Listing': 'Gold Listing: $559',
  'Silver Listing': 'Silver Listing: $209',
  'Bronze Listing': 'Bronze Listing: $59'
}

const leadSourcehObj = {
  '1': 'TV',
  '2': 'Radio',
  '3': 'Print',
  '4': 'Digital',
  '5': 'Other'
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
    savedStudy: PropTypes.array,
    availNumbers: PropTypes.object,
    fetchSiteLocations: PropTypes.func,
    fetchStudyCategories: PropTypes.func,
    fetchStudyLevels: PropTypes.func,
    fetchAvailNumbers: PropTypes.func,
    saveStudy: PropTypes.func
  }

  source_counter = 1

  order = [
    'siteLocation',
    'recruitmentPhone',
    'indication',
    'uploadStudyAd',
    'protocolNumber',
    'sponsorName',
    'sponsorEmail',
    'croName',
    'croEmail',
    'irbName',
    'irbEmail',
    'exposureLevel',
    'campaignLength',
    'patientMessagingSuite',
    'callTracking',
    'leadSource',
    'availNumbers',
    'addLeadSource',
    'startDate',
    'notes'
  ]

  studyValues = {
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
    callTracking: false,
    leadSource: null,
    availNumbers: null,
    addLeadSource: null,
    start_date: null,
    notes: null
  }

  studyOptions = {
    order: this.order,
    auto: 'none',
    config: {
      // for each of lg md sm xs you can specify the columns width
      horizontal: {
        md: [ 4, 8 ]
      }
    },
    fields: {
      siteLocation: {
        label: 'SITE LOCATION *',
        template: select2Template,
        nullOption: {
          value: '',
          text: 'Select Site Location'
        }
      },
      recruitmentPhone: {
        label: 'RECRUITMENT PHONE *'
      },
      indication: {
        label: 'INDICATION *',
        nullOption: {
          value: '',
          text: 'Select Indication'
        }
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
      /*patientMessagingSuite: {
       label: 'PATIENT MESSAGING SUITE: $247'
       },*/
      callTracking: {
        label: 'CALL TRACKING: $247'
      },
      leadSource: {
        label: 'LEAD SOURCE  *',
        nullOption: {
          value: '',
          text: 'Select Lead Source'
        },
        attrs: {
          className: ''
        }
      },
      availNumbers: {
        label: 'PHONE NUMBER *',
        nullOption: {
          value: '',
          text: 'Select Number'
        },
        attrs: {
          className: ''
        }
      },
      addLeadSource: {
        template: () => {
          let scope = this
          function addLeadSource (ev) {
            ev.preventDefault()
            let formOptions = _.clone(scope.state.formOptions)
            let formValues = _.clone(scope.state.formValues)
            let studyFormOptions = scope.studyFormOptions
            let index = (scope.source_counter === 1)
              ? scope.order.indexOf('availNumbers') : scope.order.indexOf('availNumbers_' + (scope.source_counter - 1))

            scope.order.splice(index + 1, 0, 'leadSource_' + scope.source_counter)
            scope.order.splice(index + 2, 0, 'availNumbers_' + scope.source_counter)
            formOptions.order = scope.order
            formValues['leadSource_' + scope.source_counter] = null
            formValues['availNumbers_' + scope.source_counter] = null
            studyFormOptions['leadSource_' + scope.source_counter] = t.enums(leadSourcehObj)
            if (scope.props.availNumbers.avail.length > 0) {
              let availOptions = {}
              let i = 0

              for (let avail of scope.props.availNumbers.avail) {
                availOptions[i] = avail.phoneNumber
                i++
              }

              studyFormOptions['availNumbers_' + scope.source_counter] = t.enums(availOptions)
            } else {
              studyFormOptions['availNumbers_' + scope.source_counter] = t.enums({})
            }
            formOptions.fields['leadSource_' + scope.source_counter] = _.cloneDeep(scope.state.formOptions.fields.leadSource)
            formOptions.fields['availNumbers_' + scope.source_counter] = _.cloneDeep(scope.state.formOptions.fields.availNumbers)
            scope.setState({
              formOptions,
              formValues,
              studyForm: t.struct(studyFormOptions)
            })

            scope.source_counter++
          }

          return (
            <div className="form-group form-group-depth-1">
              <div className="col-md-offset-4 col-md-8" onClick={function (evt) { addLeadSource(evt) }}>
                <span className="add-lead-source">Add Lead Source</span>
              </div>
            </div>)
        }
      },
      startDate: {
        label: 'START DATE  *'
      },
      notes: {
        label: 'NOTES'
      }
    }
  }

  state = {
    formOptions: this.studyOptions,
    formValues: this.studyValues,
    studyForm: null
  }

  setStudyForm (options, next) {
    this.studyFormOptions = options
    this.setState({
      studyForm: t.struct(options)
    }, () => {
      if (next) {
        next()
      }
    })
  }

  componentDidMount () {}

  componentWillMount () {
    const { fetchSiteLocations, fetchStudyCategories, fetchStudyLevels } = this.props

    fetchSiteLocations()
    fetchStudyCategories()
    fetchStudyLevels()
  }

  componentWillReceiveProps (nextProps) {
    const { siteLocations, studyCategories, studyLevels, savedStudy, availNumbers } = nextProps

    if (siteLocations.isFetching || studyCategories.isFetching || studyLevels.isFetching || availNumbers.isFetching) {
      //this.studyForm = null
      //..
    } else {
      const siteLocationsObj = objectFromArray(siteLocations.siteLocations, 'id', 'name')
      const studyCategoriesObj = objectFromArray(studyCategories.studyCategories, 'id', 'name')
      const studyLevelsObj = objectFromStudyLevels(studyLevels.studyLevels, 'id')

      let options = this.studyFormOptions || {
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
      }

      if (availNumbers.avail.length > 0) {
        let availOptions = {}
        let i = 0

        for (let avail of availNumbers.avail) {
          availOptions[i] = avail.phoneNumber
          i++
        }

        options.availNumbers = t.enums(availOptions)
      }

      this.setStudyForm(options)
    }
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const { saveStudy } = this.props
    const validateResult = this.refs.form.validate()
    let formOptions = _.clone(this.state.formOptions)
    let authData = this.props.authorization.authData
    if (validateResult.errors.length > 0) {
      for (let err of validateResult.errors) {
        _.set(formOptions, `fields.${err.path[0]}.attrs.data-tip`, err.message)
      }
    }
    else {
      const { value } = validateResult
      let sources = [], sourceCounter = this.source_counter, i

      for (i = 0; i < sourceCounter; i++) {
        if (i === 0) {
          sources.push({
            id: value.leadSource,
            name: leadSourcehObj[value.leadSource],
            call_number_info: this.props.availNumbers.avail[value.availNumbers] || null
          })
        } else {
          sources.push({
            id: value['leadSource_' + i],
            name: leadSourcehObj[value['leadSource_' + i]],
            call_number_info: this.props.availNumbers.avail[value['availNumbers_' + i]] || null
          })
        }
      }

      const newValue = {
        siteLocation: value.siteLocation,
        recruitmentPhone: value.recruitmentPhone,
        indication: value.indication,
        protocolNumber: value.protocolNumber,
        sponsorName: value.sponsorName,
        sponsorEmail: value.sponsorEmail,
        croName: value.croName,
        croEmail: value.croEmail,
        irbName: value.irbName,
        irbEmail: value.irbEmail,
        exposureLevel: value.exposureLevel,
        campaignLength: value.campaignLength,
        // patientMessagingSuite: value.patientMessagingSuite,
        callTracking: value.callTracking,
        leadSource: sources,
        availNumbers: this.props.availNumbers.avail[value.availNumbers],
        startDate: value.startDate,
        notes: value.notes
      }
      //value.uploadStudyAd.uploadFile()

      if (authData) {
        saveStudy(authData, null, newValue)
      } else {
        console.error('need auth')
      }
    }
  }

  onChange (value) {
    const { comp } = this.ctx.context
    const { fetchAvailNumbers } = comp.props
    const formOptions = comp.state.formOptions

    if (value.callTracking !== comp.state.formValues.callTracking) {
      if (value.callTracking) {
        comp.studyFormOptions.leadSource = t.enums(leadSourcehObj)
        comp.studyFormOptions.addLeadSource = t.maybe(t.Str)
        comp.setStudyForm(comp.studyFormOptions, () => {
          fetchAvailNumbers({
            country: 'US',
            areaCode: '510',
            contains: '151055****'
          })
        })
      } else {
        delete comp.studyFormOptions['leadSource']
        delete comp.studyFormOptions['availNumbers']
        delete comp.studyFormOptions['addLeadSource']
        value.availNumbers = value.leadSource = null
        comp.setStudyForm(comp.studyFormOptions)
      }
    }

    comp.setState({
      formOptions,
      formValues: value
    })
  }

  render () {
    const { isSaving, siteLocations, studyCategories, studyLevels, savedStudy, availNumbers } = this.props
    return (
      <div className="irb-ad-creation-wrapper">
        {
          siteLocations.isFetching || studyCategories.isFetching || studyLevels.isFetching || availNumbers.isFetching ?
            <LoadingResults /> :
            <div className="col-md-offset-2 col-md-8">
              <form onSubmit={(ev) => this.handleSubmit(ev)}>
                <ReactTooltip type="error" />
                <Form
                  ref="form"
                  type={this.state.studyForm}
                  options={this.state.formOptions}
                  value={this.state.formValues}
                  context={{ comp: this }}
                  onChange={this.onChange}
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
  isSaving: state.savingStudy,
  siteLocations: state.siteLocations,
  studyCategories: state.studyCategories,
  studyLevels: state.studyLevels,
  availNumbers: state.availNumbers,
  savedStudy: state.savedStudy,
  saveStudy: state.saveStudy
})

const mapDispatchToProps = {
  fetchAvailNumbers,
  fetchSiteLocations,
  fetchStudyCategories,
  fetchStudyLevels,
  saveStudy
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudyForm)
