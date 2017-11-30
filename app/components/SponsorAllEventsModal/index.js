import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment-timezone';
import _ from 'lodash';

import CenteredModal from '../CenteredModal';

const AllEventsModal = ({ visible, events, date, handleCloseModal, sortBy, paginationOptions }) => {
  let sorted = events;

  if (paginationOptions.activeDirection && paginationOptions.activeSort) {
    const dir = ((paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');

    sorted = _.orderBy(events, [(o) => {
      if (paginationOptions.activeSort === 'patientName') {
        return o.numberName;
      } else if (paginationOptions.activeSort === 'time') {
        return o.data.time;
      }
      return false;
    }], [dir]);
  }

  return (
    <Modal dialogComponentClass={CenteredModal} show={visible} onHide={handleCloseModal} id="all-sponsor-patients-modal">
      <Modal.Header>
        <Modal.Title>{moment(date).format('dddd, MMMM DD, YYYY')}</Modal.Title>
        <a className="lightbox-close close" onClick={handleCloseModal}>
          <i className="icomoon-icon_close" />
        </a>
      </Modal.Header>
      <Modal.Body>
        <div className="scroll-holder jcf--scrollable">
          <div className="list-head clearfix">
            <div
              onClick={sortBy}
              data-sort="principalInvestigator"
              className={(paginationOptions.activeSort === 'principalInvestigator') ? `${paginationOptions.activeDirection} col principal-investigator` : 'col principal-investigator'}
            >
              Principal Investigator <i className="caret-arrow" />
            </div>
            <div
              onClick={sortBy}
              data-sort="patientName"
              className={(paginationOptions.activeSort === 'patientName') ? `${paginationOptions.activeDirection} col patient-name` : 'col patient-name'}
            >
              Patient <i className="caret-arrow" />
            </div>
            <div
              onClick={sortBy}
              data-sort="time"
              className={(paginationOptions.activeSort === 'time') ? `${paginationOptions.activeDirection} col time` : 'col time'}
            >
              Time <i className="caret-arrow" />
            </div>
          </div>
          <div className="patient-list">
            <div className="list-holder">
              <div className="list-unstyled">
                {
                  sorted.map((event, index) => (
                    <li key={index}>
                      <a className="btn btn-gray-outline lightbox-opener">
                        <span className="principal-investigator">{event.data.principalInvestigator || 'N/A'}</span>
                        <span className="patient-name">{event.numberName}</span>
                        <span className="time">{event.data.time.format('h:mm A (z)')}</span>
                      </a>
                    </li>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

AllEventsModal.propTypes = {
  visible: PropTypes.bool,
  events: PropTypes.array,
  date: PropTypes.object,
  handleCloseModal: PropTypes.func,
  handleEdit: PropTypes.func,
  setAllModalDeferred: PropTypes.func,
  sortBy: PropTypes.func,
  paginationOptions: PropTypes.object,
};

export default AllEventsModal;
