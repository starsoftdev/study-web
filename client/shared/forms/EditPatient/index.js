import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import './styles.less'
export const fields = [ 'firstName', 'lastName', 'email', 'phone', 'indication', 'age', 'gender', 'bmi', 'status', 'source' ]

class EditPatientForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    selectedPatient: PropTypes.object.isRequired,
    indicationOptions: PropTypes.array.isRequired,
    genderOptions: PropTypes.array.isRequired,
    patientCategoryOptions: PropTypes.array.isRequired,
    infoSourceOptions: PropTypes.array.isRequired,
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
      selectedPatient,
      indicationOptions,
      genderOptions,
      patientCategoryOptions,
      infoSourceOptions,
      handleSubmit,
      submitting,
      loading,
      } = this.props

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="edit-patient">
          <div className="form-group">
            <label className="col-sm-4 control-label">NAME</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" disabled={submitting || loading} {...firstName} />
            </div>
            <div className="col-sm-4">
              <input type="text" className="form-control" disabled={submitting || loading} {...lastName} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">EMAIL</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" disabled={submitting || loading} {...email} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">PHONE</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" disabled={submitting || loading} {...phone} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">INDICATION</label>
            <div className="col-sm-8">
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
            <label className="col-sm-4 control-label">AGE</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" disabled={submitting || loading} {...age} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">GENDER</label>
            <div className="col-sm-8">
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
            <label className="col-sm-4 control-label">BMI</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" disabled={submitting || loading} {...bmi} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">STATUS</label>
            <div className="col-sm-8">
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
            <label className="col-sm-4 control-label">SOURCE</label>
            <div className="col-sm-8">
              <Select
                {...source}
                options={infoSourceOptions}
                placeholder="--Select--"
                disabled={submitting || loading}
                onBlur={() => { source.onBlur(source) }}
                />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-default pull-right">UPDATE</button>
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
