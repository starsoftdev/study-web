/**
 * Back To Top Button
 */

import React, { Component } from 'react';
import ScrollUp from 'react-scroll-up';

import './styles.less';

export default class BackToTopButton extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <ScrollUp showUnder={160} style={{ right: 25, bottom: 55, zIndex: 999 }}>
        <svg viewBox="0 0 216 216" className="btn-back-top">
          <g id="pc-svgicon-arrow-up">
            <path d="M9.5,150.9c4.4,5.4,12.3,6.1,17.6,1.9L108,86.8l80.8,65.9c5.4,4.4,13.3,3.6,17.6-1.9c1.9-2.3,2.7-5,2.7-7.9 c0-3.8-1.6-7.3-4.6-9.8l-88.6-72.3c-2.3-1.9-5.1-2.7-7.9-2.7c-2.7,0-5.7,0.9-7.9,2.7l-88.7,72.3C6,137.5,5.1,145.4,9.5,150.9z"></path>
          </g>
        </svg>
      </ScrollUp>
    );
  }
}
