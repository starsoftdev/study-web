import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import logoImg from 'assets/images/sample-study.jpg'

export default class TrialCardItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
  }

  render () {
    return (
      <div className="trial-card-container">
        <div className="trial-card-img">
          <Link to={`/studies/${this.props.id}`}>
            <img src={logoImg} />
          </Link>
        </div>

        <Link to={`/studies/${this.props.id}`}>
          <h4 className="blue">{this.props.name} – Location: Jamaica, NY</h4>
        </Link>

        <p>{this.props.description}</p>
      </div>
    )
  }
}
