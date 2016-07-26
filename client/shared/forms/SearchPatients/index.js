import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import './styles.less'
export const fields = ['name', 'includeIndication', 'excludeIndication', 'gender', 'ageFrom', 'ageTo', 'bmiFrom', 'bmiTo']

class SearchPatientsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    indications: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { name, includeIndication, excludeIndication, gender, ageFrom, ageTo, bmiFrom, bmiTo },
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
                <div className="col-sm-2">
                  <input className="form-control search-name" type="text" disabled={submitting || loading} placeholder="Search Name" {...name}/>
                </div>
                <div className="col-sm-2">
                  <label>Include Indication</label>
                  <span className="label-helper"> (Or) </span>
                  <div>
                    <Select
                      {...includeIndication}
                      options={indications}
                      multi={true}
                      joinValues={true}
                      disabled={submitting || loading}
                      onBlur={() => { includeIndication.onBlur(includeIndication) }}
                      >
                    </Select>
                  </div>
                </div>
                <div className="col-sm-2">
                  <label>Exclude Indication</label>
                  <div>
                    <Select
                      {...excludeIndication}
                      options={indications}
                      multi={true}
                      joinValues={true}
                      disabled={submitting || loading}
                      onBlur={() => { excludeIndication.onBlur(excludeIndication) }}
                      >
                    </Select>
                  </div>
                </div>
                <div className="col-sm-2">
                  <label>Gender</label>
                  <div>
                    <Select
                      {...gender}
                      options={genderOptions}
                      disabled={submitting || loading}
                      onBlur={() => { gender.onBlur(gender) }}
                      >
                    </Select>
                  </div>
                </div>
                <div className="col-sm-2">
                  <label>Age Range</label>
                  <div>
                    <input className="form-control age-from" type="text" disabled={submitting || loading} placeholder="From" {...ageFrom}/><span> - </span><input className="form-control age-to" type="text" disabled={submitting || loading} placeholder="To" {...ageTo}/>
                  </div>
                </div>
                <div className="col-sm-2">
                  <label>BMI Range</label>
                  <div>
                    <input className="form-control bmi-from" type="text" disabled={submitting || loading} placeholder="From" {...bmiFrom}/><span> - </span><input className="form-control bmi-to" type="text" disabled={submitting || loading} placeholder="To" {...bmiTo}/>
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
