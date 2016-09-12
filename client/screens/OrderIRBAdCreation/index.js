import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _ from 'lodash'

import LoadingResults from 'components/LoadingResults'
import OrderIRBAdCreationForm from 'forms/OrderIRBAdCreation'
import { submitOrderIRBAd, fetchSites, fetchStudyCategories } from 'actions'

import './styles.less'

import { strToFloat } from 'utils/number'

class OrderIRBAdCreation extends React.Component {
  static propTypes = {
    authorization: PropTypes.object,
    isSaving: PropTypes.bool,
    fetchingSites: PropTypes.bool,
    sites: PropTypes.array,
    studyCategories: PropTypes.object,
    submitOrderIRBAd: PropTypes.func,
    fetchSites: PropTypes.func,
    fetchStudyCategories: PropTypes.func,
  }

  componentDidMount () {
    const { authorization, fetchSites, fetchStudyCategories } = this.props

    fetchSites(authorization.authData)
    fetchStudyCategories()
  }

  handleSubmit (value) {
    const newValue = {
      ...value,
      compensationAmount: strToFloat(value.compensationAmount),
      stripeId: 1      // hard-coded for now
    }

    this.props.submitOrderIRBAd(newValue)
  }

  render () {
    const {
      isSaving,
      fetchingSites,
      sites,
      studyCategories
    } = this.props

    return (
      <div className="container-fluid">
        <section className="study-portal">
          <h2 className="main-heading">ORDER IRB AD CREATION</h2>
          {
            isSaving ?
            <LoadingResults /> :
            <OrderIRBAdCreationForm
              onSubmit={this.handleSubmit.bind(this)}
              fetchingSites={fetchingSites}
              sites={sites}
              studyCategories={studyCategories} />
          }
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  isSaving: state.submittingOrderIRBAd,
  sites: state.sites,
  fetchingSites: state.fetchingSites,
  studyCategories: state.studyCategories,
})

const mapDispatchToProps = {
  fetchSites,
  fetchStudyCategories,
  submitOrderIRBAd,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderIRBAdCreation)
