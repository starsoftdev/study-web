/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import inViewport from 'in-viewport';

import studyKikLogo from '../../../assets/images/logo.svg';

export class TrialsArticle extends Component {
  static propTypes = {
    index: PropTypes.number,
    trial: PropTypes.object,
    addr: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
  }

  componentDidMount() {
    this.watcher = inViewport(this.article, this.setVisible);
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    console.log(this.props);
    const { index, addr, trial } = this.props;
    const landingHref = `/${trial.study_id}-${trial.location.toLowerCase().replace(/ /ig, '-')}`;

    return (
      <article
        key={index}
        className="col-xs-6 col-lg-3 col-md-4 post"
        data-view="zoomIn"
        ref={(article) => { this.article = article; }}
      >
        <a target="_blank" href={landingHref}>
          <div className="img-holder">
            <img
              src={trial.image || studyKikLogo}
              width="854"
              height="444"
              alt="description"
              className={classNames('img-responsive', { placeholder: !trial.image })}
            />
          </div>
          <div className="info">
            <h4>{trial.name}</h4>
            {addr &&
            <address>
              <i className="icon-map-marker"></i> {addr}
            </address>
            }
            <p className="distance">
              <i className="icon-car"></i> {trial.distance} Miles
            </p>
            <span className="tel">
              <i className="icon-phone"></i> {trial.phone_number}
            </span>
          </div>
          <div className="desc">
            <p>
              {trial.description}
            </p>
          </div>
          <div className="btn-holder">
            <span className="btn btn-default">Learn More</span>
          </div>
        </a>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  push: (path) => dispatch(push(path)),
});

export default connect(null, mapDispatchToProps)(TrialsArticle);
