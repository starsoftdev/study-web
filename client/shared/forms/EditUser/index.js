import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import ActivityIcon from 'components/ActivityIcon'
export const fields = [ 'firstName', 'lastName', 'email', 'site', 'purchase', 'reward' ]

class EditUserForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    siteOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    submitting: PropTypes.bool.isRequired,
    removing: PropTypes.bool,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { firstName, lastName, email, site, purchase, reward },
      siteOptions,
      handleSubmit,
      onRemove,
      submitting,
      removing,
      } = this.props

    let clientRolePanel = null

    if (site.value === 0) {
      clientRolePanel = (
        <div>
          <div className="form-group">
            <label className="col-sm-3 control-label">PURCHASE</label>
            <div className="col-sm-9">
              <input type="checkbox" disabled={submitting || removing} {...purchase} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">REWARD</label>
            <div className="col-sm-9">
              <input type="checkbox" disabled={submitting || removing} {...reward} />
            </div>
          </div>
        </div>
      )
    }

    return (
      <form className="form-edit-user form-horizontal" onSubmit={handleSubmit}>
        <div className="edit-user">
          <div className="form-group">
            <label className="col-sm-3 control-label">NAME</label>
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-6">
                  <input type="text" className="form-control" disabled={submitting || removing} {...firstName} />
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control" disabled={submitting || removing} {...lastName} />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">EMAIL</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" disabled={submitting || removing} {...email} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">SITE LOCATION</label>
            <div className="col-sm-9">
              <Select
                {...site}
                options={siteOptions}
                placeholder="Select Site Location"
                disabled={submitting || removing}
                onBlur={() => { site.onBlur(site) }}
                />
            </div>
          </div>
          {clientRolePanel}
          <div className="form-group">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-success pull-right" disabled={submitting || removing}>
                {submitting
                  ? <span><ActivityIcon /></span>
                  : <span>SUBMIT</span>
                }
              </button>
              {onRemove &&
                <button type="button" className="btn btn-default pull-right" disabled={submitting || removing} onClick={onRemove}>
                  {removing
                    ? <span><ActivityIcon /></span>
                    : <span>REMOVE</span>
                  }
                </button>
              }
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'editUser',
  fields
})(EditUserForm)
