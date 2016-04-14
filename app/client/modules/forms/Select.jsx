'use strict';

import React, { Component, PropTypes } from 'react'
import FieldError from './FieldError'
import R from 'ramda'

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '', error: '' }
  }

  state = {
    value: this.props.value
  }

  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    extraClasses: PropTypes.string
  }

  // Updates once User data arrives from backend.
  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  handleChange(event) {
    const newValue = this.props.filter
      ? this.props.filter(event.target.value)
      : event.target.value
    this.setState({ value: newValue})
  }

  validate() {
    if (this.props.validator && R.isArrayLike(this.props.validator)) {
      for (let i = 0; i < this.props.validator.length; i++) {
        if (!this.props.validator[i].fn.call(undefined, this.state.value)) {
          this.setState({ error: this.props.validator[i].message })
          return false
        }
      }
    }
    this.setState({ error: '' })
    return true
  }

  render() {
    const attr = this.props.attr || {}
    const classes = []
    const options = this.props.options
    attr.id = attr.id || this.props.name
    const value = this.state.value
    const hasError = !(this.state.error === undefined || this.state.error.length === 0)
    classes.push('form-group')

    if (this.props.extraClasses) {
      classes.push(this.props.extraClasses)
    }

    if (hasError) {
      classes.push('has-error has-feedback')
    }

    return (
      <div className={classes.join(' ')} data-field-error={hasError}>
        <label className="control-label" htmlFor={attr.id}>{this.props.label}</label>
        <select
          className='form-control'
          value={value}
          onChange={this.handleChange.bind(this)}
          {...attr}>
          <option value='' key='empty'>Select Option</option>
          {options.map((option) => {
            return (
              <option value={option.key}
                key={option.key}>{option.value}</option>
            );
          })}
        </select>
        <FieldError message={this.state.error} />
        {!hasError
          ? <span></span>
          : <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
        }
      </div>
    )
  }
}

export default Select;