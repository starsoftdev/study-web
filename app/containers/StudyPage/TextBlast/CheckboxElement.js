/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import classNames from 'classnames';

class CheckboxElement extends React.Component {

  static propTypes = {
    checked: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
  }
  
  render() {
    const { checked, name, onClick } = this.props;
    return (
      <li onClick={onClick}>
        <span className={classNames("jcf-checkbox", { "jcf-checked": checked })}>
          <span className="checkbox icomoon-icon_check" />
          <input type="checkbox" name={name} />
        </span>
        {name}
      </li>
    );
  }
}

export default CheckboxElement;
