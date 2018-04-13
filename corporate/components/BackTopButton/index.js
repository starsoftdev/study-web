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
          <use href="#pc-svgicon-arrow-up"></use>
        </svg>
      </ScrollUp>
    );
  }
}
