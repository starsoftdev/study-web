import React, { PropTypes } from 'react'

import './styles.less'

export default class LoadingResults extends React.Component {

  static propTypes = { showOnlyIcon: PropTypes.bool }
  static defaultProps = { showOnlyIcon: false }

  render () {
    if (this.props.showOnlyIcon) {
      return (
        <i className="fa fa-repeat fa-spin text-info" />
      )
    }

    return (
      <div className="container-fluid loading-wrapper">
        <div className="row">
          <div className="col-xs-12 text-center">
            <br />
            <br />
            <p>
              <i className="fa fa-repeat fa-spin fa-2x text-info" />
            </p>
            <p className="text-info">
              Loading
            </p>
          </div>
        </div>
      </div>
    )
  }
}
