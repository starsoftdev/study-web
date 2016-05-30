import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import TrialCardItem from './TrialCardItem'

import './styles.less'

export default class TrialList extends Component {

  static propTypes = {
    studies: PropTypes.array,
  }

  render () {
    const { studies } = this.props

    const listContents = studies.map((item, index) => (
      <TrialCardItem {...item} key={index} />
    ))

    if (studies.length > 0) {
      return (
        <div className="trial">
          <div className="container">
            <div className="row">
              {listContents}
            </div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = (state) => ({
  studies: state.studies,
})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrialList)
