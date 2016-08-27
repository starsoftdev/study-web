import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import ActivityIcon from 'components/ActivityIcon'
import './styles.less'
export const fields = [ 'name' ]

class SearchByNameForm extends Component {
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
      fields: { name },
      handleSubmit,
      submitting,
      } = this.props

    return (
      <form className="form-search-by-name" onSubmit={handleSubmit}>
        <div className="search-by-name">
          <div className="form-group">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search name..." disabled={submitting} {...name} />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-default" disabled={submitting}>
                  {submitting
                    ? <span><ActivityIcon /></span>
                    : <span>Go</span>
                  }
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'searchByName',
  fields
})(SearchByNameForm)
