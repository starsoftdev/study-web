/**
*
 * Proposals Form
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';
import { defaultRanges, DateRange } from 'react-date-range';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../CenteredModal/index';
import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';

const mapStateToProps = createStructuredSelector({});

@reduxForm({ form: 'ProposalForm' })
@connect(mapStateToProps)
class TableSearchForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    createPdf: PropTypes.func,
    changeRange: PropTypes.func,
    search: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.createPdf = this.createPdf.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined');
    this.renderDateFooter = this.renderDateFooter.bind(this);

    this.state = {
      showPopup: false,
      rangePicker : {},
      linked : {},
      datePicker : null,
      firstDayOfWeek : null,
      predefined : {},
    };
  }

  handleChange(which, payload) {
    this.setState({
      [which] : payload,
    });
  }

  showPopup(ev) {
    ev.preventDefault();
    this.setState({ showPopup: true });
  }

  hidePopup(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ showPopup: false });
  }

  createPdf(ev) {
    ev.preventDefault();
    this.props.createPdf();
  }

  changeRange(ev) {
    ev.preventDefault();
    const range = this.state.predefined;
    this.props.search(range, 'range');
    this.hidePopup();
  }

  renderDateFooter() {
    const { predefined } = this.state;
    if (predefined.startDate) {
      const format = 'MMM D, YYYY';
      if (predefined.startDate.isSameOrAfter(predefined.endDate, 'day')) {
        return (
          <span className="time">
            {moment(predefined.startDate).format(format)}
          </span>
        );
      }
      return (
        <span className="time">
          {moment(predefined.startDate).format(format)} - {moment(predefined.endDate).format(format)}
        </span>
      );
    }
    return null;
  }

  render() {
    const { siteLocations } = this.props;
    const state = this.state;
    return (
      <form
        className="form-search clearfix"
      >
        <div className="btns-area pull-right">
          <div className="col pull-right">
            <button
              className="btn btn-primary pull-right"
              onClick={this.createPdf}
            >
              <i className="icomoon-icon_download" /> DOWNLOAD
            </button>
          </div>

          <div className="col pull-right">
            <a
              className="btn btn-primary lightbox-opener"
              onClick={this.showPopup}
            >
              <i className="icomoon-icon_calendar" /> DATE RANGE
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="field">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                type="search"
                component={Input}
                id="search"
                name="search"
                placeholder="Search"
                onChange={(event) => this.props.search(event, 'search')}
              />
            </div>
          </div>
          <div className="pull-left custom-select">
            <Field
              name="site"
              component={ReactSelect}
              placeholder="Select Site Location"
              options={siteLocations}
              className="field"
              onChange={(event) => this.props.search(event, 'site')}
            />
          </div>
        </div>
        <Modal
          id="date-range"
          className="date-range-modal"
          show={state.showPopup}
          dialogComponentClass={CenteredModal}
          onHide={this.hidePopup}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>Date Range</Modal.Title>
            <a className="lightbox-close close" onClick={this.hidePopup}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <DateRange
              theme={{
                DateRange: {
                  display: 'inline-grid',
                },
              }}
              linkedCalendars
              ranges={defaultRanges}
              startDate={this.state.predefined.startDate ? this.state.predefined.startDate : moment()}
              endDate={this.state.predefined.endDate ? this.state.predefined.endDate : moment().add(1, 'M')}
              onInit={this.handleChange}
              onChange={this.handleChange}
            />
            <div className="dateRange-helper">
              <div className="emit-border"><br /></div>
              <div className="right-part">
                <div className="btn-block text-right">
                  {this.renderDateFooter()}
                  <Button onClick={this.changeRange}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

export default TableSearchForm;
