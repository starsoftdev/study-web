import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import FieldError from './FieldError';
import classnames from 'classnames';
const styles = require('./styles/TextArea');

class TextArea extends Component {

  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = { value: '', error: '' };
    this.handleChange = this.handleChange.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  state = {
    value: this.props.value
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  handleChange(event) {
    const newValue = this.props.filter
      ? this.props.filter(event.target.value)
      : event.target.value;
    this.setState({ value: newValue });
  }

  getValue() {
    return this.state.value;
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
    const classes = [];
    attr.id = attr.id || this.props.name;
    const value = this.state.value;
    const hasError = !(this.state.error === undefined || this.state.error.length === 0);
    classes.push('form-group');

    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (hasError) {
      classes.push('has-error has-feedback');
    }

    return (
      <div className={classes.join(' ')} data-field-error={hasError}>
        <label className="control-label" htmlFor={attr.id}>{this.props.label}</label>
        <textarea
          className={classnames(styles['textarea'], "form-control")}
          value={value}
          onChange={this.handleChange}
          {...attr} />
        <FieldError message={this.state.error} />
        {!hasError
          ? <span></span>
          : <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
        }
      </div>
    );
  }
}

export default TextArea;
