/**
*
* PQSStatsForm
*
*/

import React from 'react';
import moment from 'moment';
import { defaultRanges, DateRange } from 'react-date-range';
import { reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import CenteredModal from '../CenteredModal/index';

@reduxForm({ form: 'pqsStatsForm', validate: null })
class PQSStatsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      testSitesStats: [
        { name: 'placeholder #1' },
        { name: 'placeholder #2' },
        { name: 'placeholder #3' },
        { name: 'placeholder #4' },
        { name: 'placeholder #5' },
        { name: 'placeholder #6' },
        { name: 'placeholder #7' },
        { name: 'placeholder #8' },
        { name: 'placeholder #9' },
        { name: 'placeholder #10' },
        { name: 'placeholder #11' },
        { name: 'placeholder #12' },
        { name: 'placeholder #13' },
        { name: 'placeholder #14' },
        { name: 'placeholder #15' },
        { name: 'placeholder #16' },
        { name: 'placeholder #17' },
        { name: 'placeholder #18' },
        { name: 'placeholder #19' },
        { name: 'placeholder #20' },
      ],
      showPopup: false,
      predefined : {
        startDate: moment().clone().subtract(30, 'days'),
        endDate: moment(),
      },
      selectedTime : {
        startDate: null,
        endDate: null,
      },
    };

    this.download = this.download.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined');
    this.renderDateFooter = this.renderDateFooter.bind(this);
    this.changeRange = this.changeRange.bind(this);
  }

  download() {
    // ..
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

  handleChange(which, payload) {
    this.setState({
      [which] : payload,
    });
  }

  changeRange(ev) {
    ev.preventDefault();
    const range = this.state.predefined;

    const uiStartDate = range.startDate.utc().format('MM/DD/YY');
    const uiEndDate = range.endDate.utc().format('MM/DD/YY');

    this.setState({
      selectedTime: {
        startDate: uiStartDate,
        endDate: uiEndDate,
      },
    }, () => {
      this.hidePopup();
    });
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
    const { selectedTime, predefined, testSitesStats } = this.state;

    const timeButtonText = (selectedTime.startDate && selectedTime.endDate) ? `${selectedTime.startDate} - ${selectedTime.endDate}` : 'Date Range';
    let startDate = (predefined.startDate) ? predefined.startDate : moment();
    let endDate = (predefined.endDate) ? predefined.endDate : moment().add(1, 'M');
    if (selectedTime.startDate && selectedTime.endDate) {
      startDate = moment().clone().subtract(30, 'days');
      endDate = moment();
    }
    const sitesStatsListContents = testSitesStats.map((item, index) => (
      <tr key={index}>
        <td className="site">
          {item.name}
        </td>
        <td className="first values">
          N/A
        </td>
        <td className="values">
          N/A
        </td>
        <td className="values">
          N/A
        </td>
        <td className="values">
          N/A
        </td>
        <td className="values">
          N/A
        </td>
      </tr>
    ));

    return (
      <form>
        <div className="total-stats">
          <div className="item">
            <span className="counter">
              N/A
            </span>
            <span className="item-label prescreened">
              Total Prescreened
            </span>
          </div>
          <div className="item">
            <span className="counter">
              N/A
            </span>
            <span className="item-label successful">
              Successful <br />Transfer
            </span>
          </div>
          <div className="item">
            <span className="counter">
              N/A
            </span>
            <span className="item-label unsuccessful">
              Unsuccessful <br />Transfer
            </span>
          </div>
          <div className="item">
            <span className="counter">
              N/A
            </span>
            <span className="item-label duration">
              Total Call <br />Duration
            </span>
          </div>
          <div className="item">
            <span className="counter">
              N/A
            </span>
            <span className="item-label mins-special">
              Mins
            </span>
            <span className="item-label duration">
              Total Call <br />Duration
            </span>
          </div>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-primary download pull-left" onClick={this.showPopup}>
            <i className="icomoon-icon_calendar" />
            &nbsp;{timeButtonText}
          </button>
          <button type="button" className="btn btn-primary download pull-left margin-left" onClick={this.download}>
            <i className="icomoon-icon_download" />
            &nbsp;Download
          </button>
        </div>
        <div className="main-stats-table">
          <table className="table">
            <thead>
              <tr>
                <th className="site">
                  <span>SITE NAME</span>
                </th>
                <th className="values">
                  <span>Total Prescreened</span>
                </th>
                <th className="values">
                  <span>Successful Transfer</span>
                </th>
                <th className="values">
                  <span>Unsuccessful Transfer</span>
                </th>
                <th className="values">
                  <span>Incoming calls</span>
                </th>
                <th className="values">
                  <span>Total Call Duration</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sitesStatsListContents.length > 0 && sitesStatsListContents}
            </tbody>
          </table>
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
              linkedCalendars
              ranges={defaultRanges}
              startDate={startDate}
              endDate={endDate}
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

export default PQSStatsForm;
