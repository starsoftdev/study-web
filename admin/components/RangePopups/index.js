import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment-timezone';
import Modal from 'react-bootstrap/lib/Modal';
import { DateRangePicker } from 'react-date-range';
import _ from 'lodash';
import 'react-date-range/dist/styles.css';
import { defaultStaticRanges } from '../../../app/common/constants/dateRanges';
import CenteredModal from '../../components/CenteredModal';
import { getMomentFromDate } from '../../../app/utils/time';

export default class RangePopups extends Component {
  static propTypes = {
    studies: PropTypes.object,
    applyFilters: PropTypes.func.isRequired,
    manuallySetActiveTab: PropTypes.func.isRequired,
    changeAdminFilters: PropTypes.func.isRequired,
    fetchMediaTotalsForAdmin: PropTypes.func.isRequired,
    getCampaignsStats: PropTypes.func.isRequired,
    currentFilters: PropTypes.object,
    activeReportTab: PropTypes.string,
    exportMediaTotals: PropTypes.func,
    paginationOptions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      type: '',
      predefined : {
        startDate: moment().clone().subtract(30, 'days').toDate(),
        endDate: new Date(),
        key: 'selection',
      },
      selectedTime : {
        startDate: null,
        endDate: null,
      },
      endDateRange: {
        startDate: null,
        endDate: null,
      },
    };

    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined');
    this.changeRange = this.changeRange.bind(this);
    this.renderDateFooter = this.renderDateFooter.bind(this);
  }

  showPopup(ev, type) {
    ev.preventDefault();
    this.setState({ showPopup: true, type });
  }

  hidePopup(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ showPopup: false, type: '' });
  }

  changeRange(ev) {
    ev.preventDefault();
    const { changeAdminFilters, applyFilters, studies, getCampaignsStats, fetchMediaTotalsForAdmin, manuallySetActiveTab, currentFilters,
      exportMediaTotals, activeReportTab, paginationOptions } = this.props;
    const range = this.state.predefined;
    const startDate = getMomentFromDate(range.startDate).utc();
    let endDate = getMomentFromDate(range.endDate).utc();

    const offset = 0;
    const limit = 50;

    if (!endDate.isAfter(startDate)) {
      endDate = endDate.add(1, 'days');
    }
    const uiStartDate = startDate.clone().format('MM/DD/YY');
    const uiEndDate = endDate.clone().format('MM/DD/YY');

    this.setState({
      selectedTime: {
        startDate: uiStartDate,
        endDate: uiEndDate,
      },
    }, () => {
      const studyIdsArr = studies.details.map(s => s.study_id);
      const filters = _.cloneDeep(currentFilters);
      this.hidePopup();
      if (!studyIdsArr.length) {
        applyFilters(null, null, false);
      }

      if (this.state.type === 'statsDateRange') {
        manuallySetActiveTab(null);
        changeAdminFilters('startDate', startDate);
        changeAdminFilters('endDate', endDate);
        setTimeout(() => {
          fetchMediaTotalsForAdmin({ ...filters, startDate, endDate });
        }, 200);
      } else if (this.state.type === 'studyEndDateRange') {
        manuallySetActiveTab('studyEndDateRange');
        changeAdminFilters('startDate', startDate.toISOString());
        changeAdminFilters('endDate', endDate.toISOString());
        this.setState({
          endDateRange: {
            startDate: uiStartDate,
            endDate: uiEndDate,
          },
        });
        setTimeout(() => {
          getCampaignsStats();
        }, 200);
      } else if (this.state.type === 'downloadDateRange') {
        manuallySetActiveTab(null);
        changeAdminFilters('startDate', startDate);
        changeAdminFilters('endDate', endDate);
        setTimeout(() => {
          if (filters.startDate && filters.endDate && (filters.startDate !== startDate || filters.endDate !== endDate)) {
            fetchMediaTotalsForAdmin({ ...filters, startDate, endDate });
          }

          exportMediaTotals({
            ...filters,
            activeReportTab,
            startDate,
            endDate,
            limit: (paginationOptions.page > 0 ? limit * paginationOptions.page : limit),
            offset,
          });
        }, 200);
      }
    });
  }

  renderDateFooter() {
    const { predefined } = this.state;
    if (predefined.startDate) {
      const format = 'MMM D, YYYY';
      if (getMomentFromDate(predefined.startDate).isSameOrAfter(getMomentFromDate(predefined.endDate), 'day')) {
        return (
          <span className="time">
            {getMomentFromDate(predefined.startDate).format(format)}
          </span>
        );
      }
      return (
        <span className="time">
          {getMomentFromDate(predefined.startDate).format(format)} - {getMomentFromDate(predefined.endDate).format(format)}
        </span>
      );
    }
    return null;
  }

  handleChange(which, payload) {
    if (payload.selection) {
      this.setState({
        [which] : payload.selection,
      });
    }
  }

  render() {
    const { endDateRange } = this.state;
    const endDateRangeLabel = (endDateRange.startDate && endDateRange.endDate) ? `${endDateRange.startDate} - ${endDateRange.endDate}` : 'Study End Date Range';
    return (
      <div id="btnsPopupsHolder">
        <div className="col pull-right no-right-padding">
          <button type="button" className="btn btn-primary pull-right" onClick={(ev) => this.showPopup(ev, 'downloadDateRange')}>
            Download
          </button>
        </div>
        <div className="col pull-right">
          <button type="button" className="btn btn-primary pull-right" onClick={(ev) => this.showPopup(ev, 'studyEndDateRange')}>
            {endDateRangeLabel}
          </button>
        </div>
        <div className="col pull-right">
          <button type="button" className="btn btn-primary pull-right" onClick={(ev) => this.showPopup(ev, 'statsDateRange')}>
            Stats Date Range
          </button>
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
            <DateRangePicker
              onChange={this.handleChange}
              moveRangeOnFirstSelection={false}
              showMonthAndYearPickers={false}
              months={2}
              direction="horizontal"
              ranges={[this.state.predefined]}
              staticRanges={defaultStaticRanges}
              inputRanges={[]}
            />
            <div className="dateRange-helper">
              <div className="emit-border"><br /></div>
              <div className="right-part">
                <div className="btn-block text-right">
                  {this.renderDateFooter()}
                  <Button onClick={this.changeRange}>
                    submit
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
