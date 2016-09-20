import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import StudyFetcher from './components/StudyFetcher'
import FilterStudyPatients from '../../shared/forms/FilterStudyPatients'
import StudyStats from './components/StudyStats'
import StudyPatients from './components/StudyPatients'

import './styles.less'

class Study extends React.Component {
  static propTypes = {
    campaigns: PropTypes.array,
    fetchingPatients: PropTypes.bool,
    fetchStudyPatients: PropTypes.func,
    patients: PropTypes.array,
    sources: PropTypes.array,
    study: PropTypes.object,
  }

  componentDidMount () {
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (searchFilter) {
    this.props.fetchStudyPatients(searchFilter)
  }

  render () {
    const { fetchingPatients, patients, campaigns, sources, study } = this.props
    const pageTitle = `${study.name} - StudyKIK`

    let campaignOptions = _.map(campaigns, campaign => {
      return {
        label: campaign.name,
        value: campaign.id,
      }
    })
    campaignOptions.unshift({ label: 'All', value: 0 })
    let sourceOptions = _.map(sources, source => {
      return {
        label: source.name,
        value: source.id,
      }
    })
    sourceOptions.unshift({ label: 'All', value: 0 })

    return (
      <DocumentTitle title={pageTitle}>
        <div className="container-fluid">
          <section className="individual-study">
            <header className="main-head">
              <h2 className="main-heading">{study.name}</h2>
              <p>
                <span className="info-cell">Location: Seattle, WA</span>
                <span className="info-cell">Sponsor: Motang</span>
                <span className="info-cell">Protocol: YM12345</span>
              </p>
            </header>
            <FilterStudyPatients campaignOptions={campaignOptions} sourceOptions={sourceOptions} handleSubmit={this.handleSubmit} />
            <StudyStats />
            <StudyPatients patients={patients} />
          </section>
        </div>
      </DocumentTitle>
    )
  }
}

class WithStudy extends React.Component {
  static propTypes = {
    params: PropTypes.object,
  }

  render () {
    // Need to convert the params `:id` into number
    const studyId = parseInt(this.props.params.id, 10)
    return (
      <StudyFetcher studyId={studyId}>
        {(study) => <Study study={study} {...this.props} />}
      </StudyFetcher>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.fetchingStudy,
})
const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithStudy)
