//@ts-check
import * as React from 'react';
import * as PropTypes from 'prop-types';

import './LandingSurvey.less';

export default class LandingSurvey extends React.PureComponent {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
  }

  /** @type HTMLIFrameElement */
  frameRef = null;

  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = e => {
    if (e.data === 'SURVEY_COMPLETE') {
      this.props.onComplete();
    }
  }

  setFrameRef = e => this.frameRef = e;

  render() {
    return (
      <div className="LandingSurvey">
        <div className="frame-container">
          <iframe
            src={this.props.uri}
            ref={this.setFrameRef}
            width="100%"
            height="100%"
            frameBorder="false"
            sandbox="allow-forms allow-same-origin allow-scripts"
          />
        </div>
        <div className="modal-overlay" />
      </div>
    );
  }
}
