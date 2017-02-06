/**
 *
 * Input for react-select
 *
 */

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import Overlay from 'react-bootstrap/lib/Overlay';

export default class MultiSelectCheckbox extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    options: PropTypes.array,
    meta: PropTypes.object,
  }

  constructor(props) {
    super(props);
    let isAllSelected = true;
    _.forEach(this.props.options, (item) => {
      if (!item.value) {
        isAllSelected = false;
      }
    });

    this.state = {
      showIndicationPopover: false,
      options: this.props.options,
      nameFilter: null,
      searchTimer: null,
      isAllSelected,
    };


    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.onHideOverlay = this.onHideOverlay.bind(this);
    this.setItemState = this.setItemState.bind(this);
    this.initSearch = this.initSearch.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }

  componentWillMount() {
    const componentValues = [];
    _.forEach(this.props.options, (item) => {
      if (item.value) {
        componentValues.push(item);
      }
    });

    this.props.input.onChange(componentValues);
  }

  onHideOverlay() {
    this.setState({
      showIndicationPopover: false,
    });
  }

  setItemState(item, state) {
    const curStateOptions = _.clone(this.state.options);
    const componentValues = [];
    let isAllSelected = true;
    _.forEach(curStateOptions, (o, index) => {
      if (o.id === item.id) {
        curStateOptions[index].value = state;
      }
      if (!o.value) {
        isAllSelected = false;
      } else {
        componentValues.push(o);
      }
    });
    this.setState({
      options: curStateOptions,
      isAllSelected,
    });

    this.props.input.onChange(componentValues);
  }

  initSearch(e) {
    if (e && e.target) {
      if (this.state.searchTimer) {
        clearTimeout(this.state.searchTimer);
        this.setState({ searchTimer: null });
      }
      const value = e.target.value;
      const timerH = setTimeout(() => { this.setState({ nameFilter: value }); }, 500);
      this.setState({ searchTimer: timerH });
    }
  }

  toggleOverlay() {
    this.setState({
      showIndicationPopover: !this.state.showIndicationPopover,
    });
  }

  selectAll() {
    const state = !this.state.isAllSelected;
    const curStateOptions = _.clone(this.state.options);
    const componentValues = [];
    _.forEach(curStateOptions, (o, index) => {
      curStateOptions[index].value = state;
      if (o.value) {
        componentValues.push(o);
      }
    });
    this.setState({
      options: curStateOptions,
      isAllSelected: state,
    });

    this.props.input.onChange(componentValues);
  }

  render() {
    const { className, meta: { touched, error, active } } = this.props;
    const hasError = touched && error && !active;
    const errorClass = hasError ? 'has-error' : '';

    let options = _.clone(this.state.options);

    const selectedArr = _.filter(this.state.options, (o) => {
      if (this.state.nameFilter) {
        return (o.value && this.state.nameFilter === o.name);
      }
      return o.value;
    });

    if (this.state.nameFilter) {
      options = _.filter(this.state.options, (o) => (o.name.indexOf(this.state.nameFilter) !== -1));
    }

    return (
      <div className={className}>
        <div
          className="multi-select-checkbox"
          ref={(parent) => (
            this.parent = parent
          )}
        >
          <div
            className={`form-control multi-select-checkbox-input ${errorClass}`}
            ref={(target) => (
              this.target = target
            )}
            onClick={this.toggleOverlay}
          >
            Select Protocol
            <i className="caret-arrow" />
          </div>

          <Overlay
            show={this.state.showIndicationPopover}
            placement="bottom"
            container={this.parent}
            target={() => this.target}
            rootClose
            onHide={() => { this.onHideOverlay(); }}
          >
            <div className="multi-select-checkbox-dropdown-wrap">
              <div className="field-holder">
                <input onChange={(e) => this.initSearch(e, 'name')} type="search" className="multi-select-checkbox-dropdown-search-input form-control keyword-search" placeholder="Search" />
              </div>
              <div className="category">
                <div className="multi-select-checkbox-dropdown-list-row">
                  <span className={`jcf-checkbox ${this.state.isAllSelected ? 'jcf-checked' : 'jcf-unchecked'}`}>
                    <span
                      onClick={() => {
                        this.selectAll();
                      }}
                    ></span>
                  </span>
                  All
                </div>
                {
                  options.map((item, index) => (
                    <div className="multi-select-checkbox-dropdown-list-row" key={index} >
                      <span className={`jcf-checkbox ${item.value ? 'jcf-checked' : 'jcf-unchecked'}`}>
                        <span
                          onClick={() => (
                            this.setItemState(item, !item.value)
                          )}
                        ></span>
                      </span>
                      {item.name}
                    </div>
                  ))
                }
              </div>
            </div>
          </Overlay>
        </div>
        {(() => {
          if (selectedArr.length > 0) {
            return (
              <div className="multi-select-checkbox-selected-wrap">
                {
                  selectedArr.map((item, index) => (
                    <div className="multi-select-checkbox-selected-item-wrap" key={index} >
                      {item.name}
                      <a onClick={() => { this.setItemState(item, false); }} className="btn-remove"><i className="icomoon-icon_trash"></i></a>
                    </div>
                  ))
                }
              </div>
            );
          }
          return false;
        })()}
      </div>
    );
  }
}
