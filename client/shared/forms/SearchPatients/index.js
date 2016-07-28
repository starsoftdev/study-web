import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import './styles.less'
export const fields = [ 'name', 'selectedIndicationFilter', 'includeIndication', 'excludeIndication', 'gender', 'ageFrom', 'ageTo', 'bmiFrom', 'bmiTo' ]

class SearchPatientsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    indications: PropTypes.object.isRequired,
    genderOptions: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { name, selectedIndicationFilter, includeIndication, excludeIndication, gender, ageFrom, ageTo, bmiFrom, bmiTo },
      indications,
      genderOptions,
      handleSubmit,
      submitting,
      loading,
      } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className="search-patients">
          <div className="row">
            <div className="col-sm-10">
              <div className="row">
                <div className="col-sm-4 form-group">
                  <label>Name</label>
                  <div>
                    <input className="form-control search-name" type="text" disabled={submitting || loading} placeholder="Search Name" {...name} />
                  </div>
                </div>
                <div className="col-sm-4 form-group">
                  <label>Age Range</label>
                  <div>
                    <input className="form-control age-from" type="text" disabled={submitting || loading} placeholder="From" {...ageFrom} /><span> - </span><input className="form-control age-to" type="text" disabled={submitting || loading} placeholder="To" {...ageTo} />
                  </div>
                </div>
                <div className="col-sm-4 form-group">
                  <label>BMI Range</label>
                  <div>
                    <input className="form-control bmi-from" type="text" disabled={submitting || loading} placeholder="From" {...bmiFrom} /><span> - </span><input className="form-control bmi-to" type="text" disabled={submitting || loading} placeholder="To" {...bmiTo} />
                  </div>
                </div>
                <div className="col-sm-4 form-group">
                  <label>
                    <input type="radio" {...selectedIndicationFilter} value="include" checked={selectedIndicationFilter.value === 'include'} className="indication-filter-selector" />
                    Include Indication
                  </label>
                  <span className="label-helper"> (Or) </span>
                  <div>
                    <Select
                      {...includeIndication}
                      options={indications}
                      placeholder="Search..."
                      multi
                      joinValues
                      disabled={submitting || loading || selectedIndicationFilter.value !== 'include'}
                      onBlur={() => { includeIndication.onBlur(includeIndication) }}
                      />
                  </div>
                </div>
                <div className="col-sm-4 form-group">
                  <label>
                    <input type="radio" {...selectedIndicationFilter} value="exclude" checked={selectedIndicationFilter.value === 'exclude'} className="indication-filter-selector" />
                    Exclude Indication
                  </label>
                  <div>
                    <Select
                      {...excludeIndication}
                      options={indications}
                      placeholder="Search..."
                      multi
                      joinValues
                      disabled={submitting || loading || selectedIndicationFilter.value !== 'exclude'}
                      onBlur={() => { excludeIndication.onBlur(excludeIndication) }}
                      />
                  </div>
                </div>
                <div className="col-sm-4 form-group">
                  <label>Gender</label>
                  <div>
                    <Select
                      {...gender}
                      options={genderOptions}
                      placeholder="Select"
                      disabled={submitting || loading}
                      onBlur={() => { gender.onBlur(gender) }}
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-default btn-search">Search</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'searchPatients',
  fields
})(SearchPatientsForm)
