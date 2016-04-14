const styles = require('./styles/TopBar');
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

const TopBar = (props) => {
  return (
    <div className={styles.base} style={props.customStyle}>
      <Link className={styles['nav-item']} activeClassName={styles.active}
        to="/login">Login</Link>
      <div className={classnames(styles['logout-container'], styles['nav-item'])}>
        <Link className={classnames(styles.logout)} to="/logout">Logout</Link>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  children: PropTypes.node,
  customStyle: PropTypes.object
};

export default TopBar;
