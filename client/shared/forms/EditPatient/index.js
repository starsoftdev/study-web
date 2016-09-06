import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import './styles.less'
export const fields = [ 'firstName', 'lastName', 'email', 'phone', 'indication', 'age', 'gender', 'bmi', 'status', 'source' ]

class EditPatientForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    indicationOptions: PropTypes.array.isRequired,
    genderOptions: PropTypes.array.isRequired,
    patientCategoryOptions: PropTypes.array.isRequired,
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
      fields: { firstName, lastName, email, phone, indication, age, gender, bmi, status, source },
      indicationOptions,
      genderOptions,
      patientCategoryOptions,
      sourceOptions,
      handleSubmit,
      submitting,
      loading,
      } = this.props

    return (
      <form className="form-edit-patient form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-3 control-label">NAME</label>
          <div className="col-sm-9">
            <div className="row">
              <div className="col-sm-6">
                <input type="text" className="form-control" disabled={submitting || loading} {...firstName} />
              </div>
              <div className="col-sm-6">
                <input type="text" className="form-control" disabled={submitting || loading} {...lastName} />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">EMAIL</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" disabled={submitting || loading} {...email} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">PHONE</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" disabled={submitting || loading} {...phone} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">INDICATION</label>
          <div className="col-sm-9">
            <Select
              {...indication}
              options={indicationOptions}
              placeholder="--Select--"
              disabled={submitting || loading}
              onBlur={() => { indication.onBlur(indication) }}
              />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">AGE</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" disabled={submitting || loading} {...age} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">GENDER</label>
          <div className="col-sm-9">
            <Select
              {...gender}
              options={genderOptions}
              placeholder="--Select--"
              disabled={submitting || loading}
              onBlur={() => { gender.onBlur(gender) }}
              />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">BMI</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" disabled={submitting || loading} {...bmi} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">STATUS</label>
          <div className="col-sm-9">
            <Select
              {...status}
              options={patientCategoryOptions}
              placeholder="--Select--"
              disabled={submitting || loading}
              onBlur={() => { status.onBlur(status) }}
              />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">SOURCE</label>
          <div className="col-sm-9">
            <Select
              {...source}
              options={sourceOptions}
              placeholder="--Select--"
              disabled={submitting || loading}
              onBlur={() => { source.onBlur(source) }}
              />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-default pull-right" disabled={submitting || loading}>
              {submitting
                ? <span>Saving...</span>
                : <span>UPDATE</span>
              }
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'editPatient',
  fields
})(EditPatientForm)
