/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import classNames from 'classnames';

class EmailSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { active } = this.props;
    return (
      <div className={classNames('item emails-info', { active })}>
        Coming soon
      </div>
    );
  }
}

export default EmailSection;
