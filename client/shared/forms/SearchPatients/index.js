import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import './styles.less'
export const fields = [ 'name', 'includeIndication', 'excludeIndication', 'gender', 'status', 'source', 'ageFrom', 'ageTo', 'bmiFrom', 'bmiTo' ]

class SearchPatientsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    indicationOptions: PropTypes.array.isRequired,
    genderOptions: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    sourceOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { name, includeIndication, excludeIndication, gender, status, source, ageFrom, ageTo, bmiFrom, bmiTo },
      indicationOptions,
      genderOptions,
      statusOptions,
      sourceOptions,
      handleSubmit,
      submitting,
      loading,
      } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className="search-patients">
          <div className="row">
            <div className="col-sm-10">
              <div className="row form-group">
                <div className="col-sm-3">
                  <label>Name</label>
                  <div>
                    <input className="form-control search-name" type="text" disabled={submitting || loading} placeholder="Search Name" {...name} />
                  </div>
                </div>
                <div className="col-sm-3">
                  <label>Include Indication</label>
                  <div>
                    <Select
                      {...includeIndication}
                      options={indicationOptions}
                      placeholder="Search..."
                      multi
                      joinValues
                      disabled={submitting || loading}
                      onBlur={() => { includeIndication.onBlur(includeIndication) }}
                      />
                  </div>
                </div>
                <div className="col-sm-3">
                  <label>Exclude Indication</label>
                  <div>
                    <Select
                      {...excludeIndication}
                      options={indicationOptions}
                      placeholder="Search..."
                      multi
                      joinValues
                      disabled={submitting || loading}
                      onBlur={() => { excludeIndication.onBlur(excludeIndication) }}
                      />
                  </div>
                </div>
                <div className="col-sm-3">
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
              <div className="row form-group">
                <div className="col-sm-3">
                  <label>Status</label>
                  <div>
                    <Select
                      {...status}
                      options={statusOptions}
                      placeholder="Select"
                      disabled={submitting || loading}
                      onBlur={() => { status.onBlur(status) }}
                      />
                  </div>
                </div>
                <div className="col-sm-3">
                  <label>Source</label>
                  <div>
                    <Select
                      {...source}
                      options={sourceOptions}
                      placeholder="Select"
                      disabled={submitting || loading}
                      onBlur={() => { source.onBlur(source) }}
                      />
                  </div>
                </div>
                <div className="col-sm-3">
                  <label>Age Range</label>
                  <div>
                    <input className="form-control age-from" type="text" disabled={submitting || loading} placeholder="From" {...ageFrom} /><span> - </span><input className="form-control age-to" type="text" disabled={submitting || loading} placeholder="To" {...ageTo} />
                  </div>
                </div>
                <div className="col-sm-3">
                  <label>BMI Range</label>
                  <div>
                    <input className="form-control bmi-from" type="text" disabled={submitting || loading} placeholder="From" {...bmiFrom} /><span> - </span><input className="form-control bmi-to" type="text" disabled={submitting || loading} placeholder="To" {...bmiTo} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-success btn-search">Search</button>
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
