import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _ from 'lodash'

import LoadingResults from 'components/LoadingResults'
import OrderIRBAdCreationForm from 'forms/OrderIRBAdCreation'
import { submitOrderIRBAd, fetchSites, fetchStudyCategories } from 'actions'

import './styles.less'

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

  handleSubmit (ev) {
    ev.preventDefault()
    /*
    const validateResult = this.refs.form.validate()
    let newFormOptions = _.cloneDeep(irbAdOptions)

    if (validateResult.errors.length > 0) {
      for (let err of validateResult.errors) {
        _.set(newFormOptions, `fields.${err.path[0]}.attrs.data-tip`, err.message)
      }
    }
    else {
      const { value } = validateResult

      const newValue = {
        irb_name: value.irbName,
        irb_email: value.irbEmail,
        compensation_amount: strToFloat(value.compensationAmount),
        clinicaltrials_gov_link: value.clinicaltrialsGovLink,
        notes: value.notes,
        studyaddress_id: value.siteLocation,
        study_category_id: value.indication,
        user_id: this.props.authorization.authData.userId,
      }

      this.props.submitOrderIRBAd(newValue)
    }

    this.setState({
      formOptions: newFormOptions,
      formValues: validateResult.value
    })
    */
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
              onSubmit={this.handleSubmit}
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
