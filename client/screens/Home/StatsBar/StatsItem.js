import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const StatsItem = ({ data }) => {
  return (
		<div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 center-wrapper">
			<div className="stats-item">
				<div className="stats-header">
					<span className="description">{data.headerLabel}</span>
					<span className="value">{data.headerValue}</span>
				</div>
				<div className="stats-row">
					<span className="description">{data.firstLabel}</span>
					<span className="value">{data.firstValue}</span>
				</div>
				<div className="stats-row">
					<span className="description">{data.secondLabel}</span>
					<span className="value">{data.secondValue}</span>
				</div>
			</div>
		</div>
	)
}

StatsItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default StatsItem
