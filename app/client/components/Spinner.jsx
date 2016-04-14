const styles = require('./styles/Spinner');
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Spinner extends Component {
  render() {
    return (
      <div className={styles['spinner']}>
        <div className={styles["bounce1"]}></div>
        <div className={styles["bounce2"]}></div>
        <div className={styles["bounce3"]}></div>
      </div>
    );
  }
}
