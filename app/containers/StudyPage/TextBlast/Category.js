/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import classNames from 'classnames';

class Category extends React.Component {

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
      <li>
        <span className="jcf-checkbox">
          <span className={classNames("checkbox", { "icomoon-icon_check": !checked })} />
          <input type="checkbox" name={name} onClick={onClick} />
        </span>
        {name}
      </li>
    );
  }
}

export default Category;
