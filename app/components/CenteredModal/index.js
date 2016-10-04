/**
 * Created by mike on 10/4/16.
 */

import React from 'react';
import classNames from 'classnames';

import './styles.less';

class CenteredModal extends React.Component {
  static propTypes = {
    /**
     * A css class to apply to the Modal dialog DOM node.
     */
    className: React.PropTypes.string,
    children: React.PropTypes.array.isRequired,
    dialogClassName: React.PropTypes.string,
    style: React.PropTypes.object,
  };

  componentDidMount() {
  }

  render() {
    const { dialogClassName, className, style, children, ...props } =
      this.props;

    return (
      <div
        {...props}
        tabIndex="-1"
        style={style}
        className={classNames(className, 'modal modal-frame')}
      >
        <div className={classNames(dialogClassName, 'modal-medium modal-dialog')}>
          <div className="modal-content" role="document">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default CenteredModal;
