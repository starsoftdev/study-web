import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';

import Input from 'components/Input';
import Button from 'react-bootstrap/lib/Button';
import ReactSelect from 'components/Input/ReactSelect';
import { defaultRanges, DateRange } from 'react-date-range';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from 'components/CenteredModal/index';

import moment from 'moment';
@reduxForm({ form: 'searchReports' })

export class ReportViewSearch extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    searchReports: PropTypes.func,
    formValues: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      searchTimer: null,
      showPopup: false,
      predefined : {
        startDate: moment().clone().subtract(30, 'days'),
        endDate: moment(),
      },
    };

    this.initSearch = this.initSearch.bind(this);

    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined');
    this.changeRange = this.changeRange.bind(this);
    this.renderDateFooter = this.renderDateFooter.bind(this);
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

  initSearch(e, name) {
    const params = this.props.formValues;
    if (e && e.target) {
      params[e.target.name] = e.target.value;
      if (this.state.searchTimer) {
        clearTimeout(this.state.searchTimer);
        this.setState({ searchTimer: null });
      }
      const timerH = setTimeout(() => { this.props.searchReports(params); }, 500);
      this.setState({ searchTimer: timerH });
    } else {
      params[name] = e;
      this.props.searchReports(params);
    }
  }

  changeRange(ev) {
    ev.preventDefault();
    const range = this.state.predefined;

    const startDate = range.startDate.utc().format('YYYY-MM-DD HH:mm:ss');
    const endDate = range.endDate.utc().format('YYYY-MM-DD HH:mm:ss');

    this.props.dispatch(change('searchReports', 'startDate', startDate));
    this.props.dispatch(change('searchReports', 'endDate', endDate));

    this.props.searchReports({ endDate, startDate });
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
    const testOptions = [
      {
        label: 'test1',
        value: 'test1',
      },
      {
        label: 'test2',
        value: 'test2',
      },
    ];

    const statusOptions = [
      {
        label: 'All',
        value: 'all',
      },
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Inactive',
        value: 'inactive',
      },
    ];

    return (
      <div className="search-controls form-search clearfix">
        <div className="btns-area pull-right full-width">
          {/* TODO: remove tmp styles */}
          <div className="col pull-right">
            <a disabled className="btn btn-primary lightbox-opener"><i className="icon-icon_download"></i> download</a>
          </div>
          <div className="col pull-right">
            <a disabled className="btn btn-primary lightbox-opener"><i className="icon-icon_creditcard"></i> add credits</a>
          </div>
          <div className="col pull-right">
            <a disabled className="btn btn-primary lightbox-opener">+ add site</a>
          </div>
          <div className="col pull-right">
            <a className="btn btn-primary lightbox-opener" onClick={this.showPopup}><i className="icomoon-icon_calendar"></i> Date Range</a>
          </div>
        </div>
        <div className="fields-holder full-width">
          <div className="search-area pull-left">
            <div className="has-feedback">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
                onChange={(e) => this.initSearch(e, 'name')}
              />
            </div>
          </div>
          <div className="pull-left custom-select">
            <Field
              name="status"
              component={ReactSelect}
              placeholder="Select Study Status"
              options={statusOptions}
              onChange={(e) => this.initSearch(e, 'status')}
            />
          </div>
          <div className="pull-left custom-select">
            <Field
              name="source"
              component={ReactSelect}
              placeholder="Select Source"
              options={testOptions}
              disabled
            />
          </div>
        </div>
        <Modal
          id="date-range"
          className="date-range-modal"
          dialogComponentClass={CenteredModal}
          show={this.state.showPopup}
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
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewSearch);
