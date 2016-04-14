import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FieldError from './FieldError';
import _ from 'lodash';

class Input extends Component {

  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    extraClasses: PropTypes.string,
    value: PropTypes.string,
    filter: PropTypes.string,
    validator: PropTypes.array,
    attr: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    value: this.props.value
  }

  // Updates once User data arrives from backend.
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  handleChange(event) {
    const newValue = this.props.filter
      ? this.props.filter(event.target.value)
      : event.target.value;
    this.setState({ value: newValue });
  }

  validate() {
    if (this.props.validator && _.isArray(this.props.validator)) {
      for (let i = 0; i < this.props.validator.length; i++) {
        if (!this.props.validator[i].fn.call(undefined, this.state.value)) {
          this.setState({ error: this.props.validator[i].message });
          return false;
        }
      }
    }
    this.setState({ error: '' });
    return true;
  }

  render() {
    const attr = this.props.attr || {};
    const type = attr.type || 'text';
    const classes = [];
    attr.id = attr.id || this.props.name;
    const value = this.state.value;
    const hasError = !(this.state.error === undefined || this.state.error.length === 0);
    classes.push('form-group');

    if (this.props.extraClasses) {
      classes.push(this.props.extraClasses);
    }

    if (hasError) {
      classes.push('has-error');
    }

    return (
      <div className={classnames(classes)} data-field-error={hasError}>
        <label className="control-label" htmlFor={attr.id}>{this.props.label}</label>
        <input type={type}
          className="form-control"
          value={value}
          onChange={this.handleChange}
          {...attr} />
        <FieldError message={this.state.error} />
        {!hasError
          ? <span></span>
          : <span className="glyphicon glyphicon-remove form-control-feedback"
            aria-hidden="true"></span>
        }
      </div>
    );
  }
}

export default Input;
