import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import ActivityIcon from 'components/ActivityIcon'
export const fields = [ 'name', 'piFirstName', 'piLastName', 'phone', 'address', 'city', 'state', 'zip' ]

class EditSiteForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { name, piFirstName, piLastName, phone, address, city, state, zip },
      handleSubmit,
      submitting,
      } = this.props

    return (
      <form className="form-edit-site form-horizontal" onSubmit={handleSubmit}>
        <div className="edit-site">
          <div className="form-group">
            <label className="col-sm-3 control-label">NAME</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" disabled={submitting} {...name} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">PRINCIPAL INVESTIGATOR</label>
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-6">
                  <input type="text" className="form-control" disabled={submitting} placeholder="First Name" {...piFirstName} />
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control" disabled={submitting} placeholder="Last Name" {...piLastName} />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">PHONE</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" disabled={submitting} {...phone} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">ADDRESS</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" disabled={submitting} {...address} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">CITY</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" disabled={submitting} {...city} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">STATE / PROVINCE</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" disabled={submitting} {...state} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">POSTAL CODE</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" disabled={submitting} {...zip} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-success pull-right" disabled={submitting}>
                {submitting
                  ? <span><ActivityIcon /></span>
                  : <span>SUBMIT</span>
                }
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'editSite',
  fields
})(EditSiteForm)
