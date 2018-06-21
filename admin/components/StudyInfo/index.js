import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

import { defaultStaticRanges } from '../../../app/common/constants/dateRanges';
import CenteredModal from '../../components/CenteredModal';

import ReactSelect from '../../components/Input/ReactSelect';
import { getMomentFromDate } from '../../../app/utils/time';

@reduxForm({
  form: 'adminInfoFilter',
  enableReinitialize: true,
})
export default class StudyInfo extends Component {
  static propTypes = {
    totals: PropTypes.object,
    updateFilters: PropTypes.func.isRequired,
    setDates: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      predefined : {
        startDate: moment().clone().subtract(30, 'days').toDate(),
        endDate: new Date(),
        key: 'selection',
      },
      selectedTime : {
        startDate: null,
        endDate: null,
      },
    };

    this.goToStudyStatsPage = this.goToStudyStatsPage.bind(this);
    this.goToStudyEditPage = this.goToStudyEditPage.bind(this);
    this.campaignChanged = this.campaignChanged.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined');
    this.changeRange = this.changeRange.bind(this);
    this.renderDateFooter = this.renderDateFooter.bind(this);
  }

  goToStudyStatsPage(studyId) {
    browserHistory.push(`/admin/studyStats/${studyId}`);
  }

  goToStudyEditPage(studyId) {
    browserHistory.push(`/admin/studies/${studyId}/edit`);
  }

  campaignChanged(val) {
    const { updateFilters } = this.props;
    updateFilters('campaign', val);
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

  changeRange(ev) {
    ev.preventDefault();
    const { setDates } = this.props;
    const range = this.state.predefined;
    const startDate = getMomentFromDate(range.startDate).utc();
    let endDate = getMomentFromDate(range.endDate).utc();

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
      this.hidePopup();
      setDates(startDate.toISOString(), endDate.toISOString());
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
    const { totals } = this.props;

    const maxCampaignCount = totals && totals.details ? parseInt(totals.details.max_campaign_count) : 0;

    let campaignOptions = [];
    for (let i = 1; i <= maxCampaignCount; i++) {
      campaignOptions.push({ label: i.toString(), value: i.toString() });
    }
    if (totals && totals.details && totals.details.current_campaign_count > 0) {
      campaignOptions.push({ label: 'Current', value: 'current' });
    }

    campaignOptions = campaignOptions.reverse();

    return (
      <div id="infoSection">
        <div className="head">
          <h2 className="pull-left">
            <span>Active: 2</span>
            <span>Inactive: 0</span>
            <span>Total: 2</span>
          </h2>
          <div className="btns pull-right">
            <form className="admin-info-filter">
              <div className="select pull-left">
                <Field
                  name="campaign-search"
                  className="campaign-search"
                  component={ReactSelect}
                  placeholder="Select Campaign"
                  searchPlaceholder="Search"
                  searchable
                  options={campaignOptions}
                  customSearchIconClass="icomoon-icon_search2"
                  onChange={this.campaignChanged}
                />
              </div>
              <Button bsStyle="primary" className="pull-left" onClick={this.showPopup}>
                <i className="icomoon-icon_calendar" />
                &nbsp;Date Range
              </Button>
            </form>
          </div>
        </div>
        <div className="tiles">
          <section>
            <div className="part study clickable" onClick={() => this.goToStudyEditPage(10001)}>
              <div className="title">study</div>
              <ul>
                <li>#</li>
                <li>STUDY NUMBER:</li>
                <li>STATUS: ON</li>
                <li>PROTOCOL:</li>
                <li>SPONSOR:</li>
                <li>CRO:</li>
                <li>INDICATION:</li>
                <li>PERCENTAGE:</li>
                <li>COLOR:</li>
              </ul>
            </div>
            <div className="part info clickable" onClick={() => this.goToStudyEditPage(10001)}>
              <div className="title">info</div>
              <ul>
                <li>SITE LOCATION:</li>
                <li>SITE NUMBER:</li>
                <li>ADDRESS:</li>
                <li>PAGE VIEWS:</li>
                <li>UNREAD TEXTS:</li>
                <li>AO:</li>
                <li>BD:</li>
                <li>CC:</li>
              </ul>
            </div>
            <div className="part campaign clickable" onClick={() => this.goToStudyEditPage(10001)}>
              <div className="title">campaign</div>
              <ul>
                <li>EXPOSURE LEVEL:</li>
                <li>TIER:</li>
                <li>GOAL:</li>
                <li>CAMPAIGN NUMBER:</li>
                <li>START DATE:</li>
                <li>END DATE:</li>
                <li>TOTAL DAYS:</li>
                <li>DAYS LEFT:</li>
                <li>CENTRAL:</li>
                <li>PQS:</li>
              </ul>
            </div>
            <div className="part stat clickable" onClick={() => this.goToStudyStatsPage(10001)}>
              <div className="title">stats</div>
              <ul>
                <li>LAST 24 HOURS:</li>
                <li>CAMPAIGN TOTAL:</li>
                <li>GRAND TOTAL:</li>
                <li>NEW PATIENT:</li>
                <li>CALL / TEXT ATTEMPTED:</li>
                <li>DNQ / NOT INTERESTED:</li>
                <li>ACTION NEEDED:</li>
                <li>SCHEDULED:</li>
                <li>CONSENTED:</li>
                <li>SCREEN FAILED:</li>
                <li>RANDOMIZED:</li>
              </ul>
            </div>
          </section>
          <section>
            <div className="part study clickable" onClick={() => this.goToStudyEditPage(10002)}>
              <div className="title">study</div>
              <ul>
                <li>#</li>
                <li>STUDY NUMBER:</li>
                <li>STATUS: ON</li>
                <li>PROTOCOL:</li>
                <li>SPONSOR:</li>
                <li>CRO:</li>
                <li>INDICATION:</li>
                <li>PERCENTAGE:</li>
                <li>COLOR:</li>
              </ul>
            </div>
            <div className="part info clickable" onClick={() => this.goToStudyEditPage(10001)}>
              <div className="title">info</div>
              <ul>
                <li>SITE LOCATION:</li>
                <li>SITE NUMBER:</li>
                <li>ADDRESS:</li>
                <li>PAGE VIEWS:</li>
                <li>UNREAD TEXTS:</li>
                <li>AO:</li>
                <li>BD:</li>
                <li>CC:</li>
              </ul>
            </div>
            <div className="part campaign clickable" onClick={() => this.goToStudyEditPage(10001)}>
              <div className="title">campaign</div>
              <ul>
                <li>EXPOSURE LEVEL:</li>
                <li>TIER:</li>
                <li>GOAL:</li>
                <li>CAMPAIGN NUMBER:</li>
                <li>START DATE:</li>
                <li>END DATE:</li>
                <li>TOTAL DAYS:</li>
                <li>DAYS LEFT:</li>
                <li>CENTRAL:</li>
                <li>PQS:</li>
              </ul>
            </div>
            <div className="part stat clickable" onClick={() => this.goToStudyStatsPage(10002)}>
              <div className="title">stats</div>
              <ul>
                <li>LAST 24 HOURS:</li>
                <li>CAMPAIGN TOTAL:</li>
                <li>GRAND TOTAL:</li>
                <li>NEW PATIENT:</li>
                <li>CALL / TEXT ATTEMPTED:</li>
                <li>DNQ / NOT INTERESTED:</li>
                <li>ACTION NEEDED:</li>
                <li>SCHEDULED:</li>
                <li>CONSENTED:</li>
                <li>SCREEN FAILED:</li>
                <li>RANDOMIZED:</li>
              </ul>
            </div>
          </section>
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
