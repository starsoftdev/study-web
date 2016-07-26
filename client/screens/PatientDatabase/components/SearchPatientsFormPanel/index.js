import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPatients, clearPatients, fetchIndications } from 'actions'
import SearchPatientsForm from 'forms/SearchPatients'
import ActivityIcon from 'components/ActivityIcon'
import './styles.less'

class SearchPatientsFormPanel extends React.Component {
  static propTypes = {
    fetchingPatients: PropTypes.bool,
    fetchingIndications: PropTypes.bool,
    indications: PropTypes.array,
    fetchPatients: PropTypes.func,
    clearPatients: PropTypes.func,
    fetchIndications: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.props.fetchIndications()
  }

  componentWillUnmount () {
    this.props.clearPatients()
  }

  handleSubmit (searchFilter) {
    this.props.fetchPatients(searchFilter)
  }

  render () {
    const { indications, fetchingPatients, fetchingIndications } = this.props
    const genderOptions = [ { label: 'All', value: 'All' }, { label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' } ]
    return (
      <div className="patients-search">
        <div className="search-form">
          <SearchPatientsForm loading={fetchingIndications} submitting={fetchingPatients} indications={indications} genderOptions={genderOptions} onSubmit={this.handleSubmit.bind(this)} />
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
  clearPatients,
  fetchIndications,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPatientsFormPanel)
