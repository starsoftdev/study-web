import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import ActivityIcon from 'components/ActivityIcon'
export const fields = [ 'file' ]

class ImportFileForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { file },
      handleSubmit,
      } = this.props

    return (
      <form className="form-import-file" onSubmit={handleSubmit}>
        <div className="import-file">
          <div className="row form-group">
            <label className="col-sm-3 control-label">
              <span className="pull-right">Select File</span>
            </label>
            <div className="col-sm-9">
              <input type="file" {...file} value={undefined} />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-success pull-right">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'importFile',
  fields
})(ImportFileForm)
