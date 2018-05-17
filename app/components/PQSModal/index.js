/**
*
* PQSModal
*
*/

import React from 'react';
import moment from 'moment';
import { defaultRanges, DateRange } from 'react-date-range';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import PQSStatsForm from '../../components/PQSStatsForm';
import CenteredModal from '../../components/CenteredModal/index';
import { translate } from '../../../common/utilities/localization';

class PQSModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    closePQSModal: React.PropTypes.func.isRequired,
    openPQSModal: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
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

    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined');
    this.renderDateFooter = this.renderDateFooter.bind(this);
    this.changeRange = this.changeRange.bind(this);
  }

  showPopup(ev) {
    ev.preventDefault();
    this.setState({ showPopup: true }, () => {
      this.props.closePQSModal();
    });
  }

  hidePopup(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ showPopup: false }, () => {
      this.props.openPQSModal();
    });
  }

  handleChange(which, payload) {
    this.setState({
      [which] : payload,
    });
  }

  changeRange(ev) {
    ev.preventDefault();
    const range = this.state.predefined;

    const uiStartDate = range.startDate.utc().format(translate('sponsor.component.PQSModal.defaultDateMask'));
    const uiEndDate = range.endDate.utc().format(translate('sponsor.component.PQSModal.defaultDateMask'));

    this.setState({
      selectedTime: {
        startDate: uiStartDate,
        endDate: uiEndDate,
      },
    }, () => {
      this.hidePopup();
      this.props.openPQSModal();
    });
  }

  renderDateFooter() {
    const { predefined } = this.state;
    if (predefined.startDate) {
      const format = translate('sponsor.component.PQSModal.specialDateMask');
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
    const { selectedTime, predefined } = this.state;
    let startDate = (predefined.startDate) ? predefined.startDate : moment();
    let endDate = (predefined.endDate) ? predefined.endDate : moment().add(1, 'M');
    if (selectedTime.startDate && selectedTime.endDate) {
      startDate = moment().clone().subtract(30, 'days');
      endDate = moment();
    }
    return (
      <div>
        <Modal dialogComponentClass={CenteredModal} dialogClassName={'pqs-stats-modal'} show={this.props.showModal} onHide={this.props.closePQSModal}>
          <Modal.Header>
            <Modal.Title>{translate('sponsor.component.PQSModal.title')}</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closePQSModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <PQSStatsForm showPopup={this.showPopup} selectedTime={selectedTime} />
          </Modal.Body>
        </Modal>
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
            <Modal.Title>{translate('sponsor.component.PQSModal.dateRange')}</Modal.Title>
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
                    {translate('sponsor.component.PQSModal.submit')}
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

export default PQSModal;
