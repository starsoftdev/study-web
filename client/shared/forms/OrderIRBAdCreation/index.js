import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import _ from 'lodash'
import Select from 'react-select'
import 'react-select/less/default.less'

import { submitOrderIRBAd, fetchSites, fetchStudyCategories } from 'actions'
import { isValidCurrency } from 'utils/number'
import './styles.less'

export const fields = [ 'siteLocation', 'indication', 'irbName', 'irbEmail', 'compensationAmount', 'clinicaltrialsGovLink', 'notes' ]

const validate = values => {
  const errors = {}

  if (!values.siteLocation) {
    errors.siteLocation = 'Required'
  }
  if (!values.indication) {
    errors.indication = 'Required'
  }
  if (values.irbEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.irbEmail)) {
    errors.irbEmail = 'Invalid email address'
  }
  if (values.compensationAmount!==undefined && !isValidCurrency(values.compensationAmount)) {
    errors.compensationAmount = 'Invalid current format'
  }

  return errors
}

class OrderIRBAdCreationForm extends React.Component {
  static propTypes = {
    fetchingSites: PropTypes.bool,
    sites: PropTypes.array,
    studyCategories: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
  }

  render () {
    const {
      fields: { siteLocation, indication, irbName, irbEmail, compensationAmount, clinicaltrialsGovLink, notes },
      handleSubmit,
      fetchingSites,
      sites,
      studyCategories,
      } = this.props

    const siteLocationOptions = sites.map(s => {
      return {
        label: s.name,
        value: s.id
      }
    })
    const indicationOptions = studyCategories.studyCategories.map(sc => {
      return {
        label: sc.name,
        value: sc.id
      }
    })

    return (
			<form action="#" className="form-study row" onSubmit={handleSubmit}>

				<div className="col-xs-6 form-holder">

					<div className="form-fields">
						<div className="field-row">
							<strong className="label required"><label htmlFor="site-location">SITE LOCATION</label></strong>
							<div className="field">
                <Select
                  {...siteLocation}
                  options={siteLocationOptions}
                  placeholder="Select Site Location"
                  disabled={fetchingSites}
                  className="data-search"
                  onBlur={() => { siteLocation.onBlur(siteLocation) }}
                />
							</div>
						</div>

						<div className="field-row">
							<strong className="label required"><label htmlFor="indication">INDICATION</label></strong>
							<div className="field">
                <Select
                  {...indication}
                  options={indicationOptions}
                  placeholder="Select Indication"
                  disabled={studyCategories.isFetching}
                  className="data-search"
                  onBlur={() => { indication.onBlur(indication) }}
                />
							</div>
						</div>

						<div className="field-row">
							<strong className="label"><label htmlFor="irb-name">IRB NAME </label></strong>
							<div className="field">
								<input type="text" id="irb-name" className="form-control" {...irbName} />
							</div>
						</div>

						<div className="field-row">
							<strong className="label"><label htmlFor="irb-email">IRB EMAIL </label></strong>
							<div className="field">
								<input type="email" id="irb-email" className="form-control" {...irbEmail} />
							</div>
						</div>

						<div className="field-row">
							<strong className="label"><label htmlFor="compensation-amount">COMPENSATION AMOUNT</label></strong>
							<div className="field">
								<input type="text" id="compensation-amount" className="form-control" {...compensationAmount} />
							</div>
						</div>

						<div className="field-row">
							<strong className="label"><label htmlFor="gov-link">CLINICALTRIALS.GOV LINK</label></strong>
							<div className="field">
								<input type="text" id="gov-link" className="form-control" {...clinicaltrialsGovLink} />
							</div>
						</div>

						<div className="field-row">
							<strong className="label"><label htmlFor="upload-blinded-protpcol">UPLOAD BLINDED<br /> PROTOCOL</label></strong>
							<div className="field">
								<label htmlFor="upload-blinded-protpcol" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn" ></label>
								<input type="file" id="upload-blinded-protpcol" />
							</div>
						</div>

						<div className="field-row textarea">
							<strong className="label"><label htmlFor="notes">NOTES</label></strong>
							<div className="field">
								<textarea className="form-control" id="notes" {...notes}></textarea>
							</div>
						</div>

					</div>

					<div className="thanks-msg text-center">
						<strong className="title">Thank you very much</strong>
						<p>your information has successfully been submitted</p>
					</div>

				</div>

				<div className="fixed-block">
          <div className="fixed-block-holder">
						<div className="order-summery">
							<div className="head">
								<h3>ORDER SUMMARY</h3>
							</div>
              <input type="submit" className="btn btn-default" value="submit" />
            </div>
          </div>
				</div>
			</form>
    )
  }
}

export default reduxForm({
  form: 'orderIrbAdCreation',
  fields,
  validate
})(OrderIRBAdCreationForm)
