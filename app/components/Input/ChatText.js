/**
 *
 * Radio for react-select
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

class ChatText extends React.Component {
  componentDidMount() {
  }

  render() {
    const { input, name, className, placeholder, maxLength, disabled, noLimit } = this.props;
    return (
      <div className="chat-text">
        <textarea
          {...input}
          name={name}
          className={classNames(className)}
          placeholder={placeholder}
          value={input.value}
          maxLength={maxLength}

          disabled={disabled}
        />
        {
          !noLimit &&
          <span className="remaining-counter">
            {parseInt(maxLength) - input.value.length}
          </span>
        }
      </div>
    );
  }
}

ChatText.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  noLimit: PropTypes.bool,
  maxLength: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ChatText;
