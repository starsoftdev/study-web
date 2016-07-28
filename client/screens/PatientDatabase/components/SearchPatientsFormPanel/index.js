import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPatients, fetchIndications } from 'actions'
import SearchPatientsForm from 'forms/SearchPatients'
import ActivityIcon from 'components/ActivityIcon'
import './styles.less'

class SearchPatientsFormPanel extends React.Component {
  static propTypes = {
    fetchingPatients: PropTypes.bool,
    fetchingIndications: PropTypes.bool,
    indications: PropTypes.array,
    fetchPatients: PropTypes.func,
    fetchIndications: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.props.fetchIndications()
  }

  handleSubmit (searchFilter) {
    let queryParams = _.omit(_.omitBy(searchFilter, _.isUndefined), 'selectedIndicationFilter')

    if (searchFilter.selectedIndicationFilter === 'include' && searchFilter.includeIndication) {
      queryParams.includeIndication = _.map(searchFilter.includeIndication, i => i.value).join(',')
    } else if (searchFilter.selectedIndicationFilter === 'exclude' && searchFilter.excludeIndication) {
      queryParams.excludeIndication = _.map(searchFilter.excludeIndication, i => i.value).join(',')
    }

    this.props.fetchPatients(queryParams)
  }

  render () {
    const { indications, fetchingPatients, fetchingIndications } = this.props
    const genderOptions = [ { label: 'All', value: 'All' }, { label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' } ]
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="patients-search">
            <div className="search-form">
              <SearchPatientsForm loading={fetchingIndications} submitting={fetchingPatients} indicationOptions={indications} genderOptions={genderOptions} onSubmit={this.handleSubmit.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  fetchingPatients: state.fetchingPatients,
  fetchingIndications: state.fetchingIndications,
  indications: state.indications,
})
const mapDispatchToProps = {
  fetchPatients,
  fetchIndications,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPatientsFormPanel)
