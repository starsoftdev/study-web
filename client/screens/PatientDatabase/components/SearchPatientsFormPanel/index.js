import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPatients, fetchIndications, fetchPatientCategories, fetchSources } from 'actions'
import SearchPatientsForm from 'forms/SearchPatients'
import ActivityIcon from 'components/ActivityIcon'

class SearchPatientsFormPanel extends React.Component {
  static propTypes = {
    fetchingPatients: PropTypes.bool,
    fetchingIndications: PropTypes.bool,
    fetchingPatientCategories: PropTypes.bool,
    fetchingSources: PropTypes.bool,
    indications: PropTypes.array,
    patientCategories: PropTypes.array,
    sources: PropTypes.array,
    fetchPatients: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchPatientCategories: PropTypes.func,
    fetchSources: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.props.fetchIndications()
    this.props.fetchPatientCategories()
    this.props.fetchSources()
  }

  handleSubmit (searchFilter) {
    let queryParams = _.omit(_.omitBy(searchFilter, _.isUndefined), [ 'includeIndication', 'excludeIndication' ])

    if (searchFilter.includeIndication) {
      queryParams.includeIndication = _.map(searchFilter.includeIndication, i => i.value).join(',')
    }

    if (searchFilter.excludeIndication) {
      queryParams.excludeIndication = _.map(searchFilter.excludeIndication, i => i.value).join(',')
    }

    this.props.fetchPatients(queryParams)
  }

  render () {
    const { indications, patientCategories, sources, fetchingPatients, fetchingIndications, fetchingPatientCategories, fetchingSources } = this.props
    const indicationOptions = _.map(indications, indicationIterator => {
      return {
        label: indicationIterator.name,
        value: indicationIterator.id,
      }
    })
    const genderOptions = [ { label: 'All', value: 'All' }, { label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' } ]
    const patientCategoryOptions = _.map(patientCategories, patientCategoryIterator => {
      return {
        label: patientCategoryIterator.name,
        value: patientCategoryIterator.id,
      }
    })
    const sourceOptions = _.map(sources, sourceIterator => {
      return {
        label: sourceIterator.type,
        value: sourceIterator.id,
      }
    })

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="patients-search">
            <div className="form-search">
              <SearchPatientsForm loading={fetchingIndications || fetchingPatientCategories || fetchingSources}
                                  submitting={fetchingPatients} indicationOptions={indicationOptions} genderOptions={genderOptions}
                                  statusOptions={patientCategoryOptions} sourceOptions={sourceOptions}
                                  onSubmit={this.handleSubmit.bind(this)} />
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
  fetchingPatientCategories: state.fetchingPatientCategories,
  fetchingSources: state.fetchingSources,
  indications: state.indications,
  patientCategories: state.patientCategories,
  sources: state.sources,
})
const mapDispatchToProps = {
  fetchPatients,
  fetchIndications,
  fetchPatientCategories,
  fetchSources,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPatientsFormPanel)
