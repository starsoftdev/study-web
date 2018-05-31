/**
 * Created by jay on 05/29/18.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectValues, selectSyncErrors } from '../../../common/selectors/form.selector';
import { selectCurrentUser } from '../../App/selectors';
import CalendarWidget from './CalendarWidget';

import { SchedulePatientModalType } from '../../../common/constants';


const formName = 'CallCenterPatientPage.Calendar';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  formValues: selectValues(formName),
  formSyncErrors: selectSyncErrors(formName),
});

@connect(mapStateToProps)

class CalendarSection extends React.Component {
  static propTypes = {
    studyId: React.PropTypes.any,
    patient: React.PropTypes.object,
    sites: React.PropTypes.array,
    currentSite: React.PropTypes.object,
    active: React.PropTypes.bool.isRequired,
    currentUser: React.PropTypes.object,
  };

  handleShowAll = (visible, events, date) => {
    this.setState({
      showAll: {
        visible,
        events: events || this.state.showAll.events,
        date: date || this.state.showAll.date,
      },
    });
  }

  handleModalVisibility = (modalType, data) => {
    if (modalType !== SchedulePatientModalType.HIDDEN) {
      this.selectedCellInfo = data;
    } else if (this.state.allModalDeferred) {
      this.handleShowAll(true);
      this.setState({
        allModalDeferred: false,
      });
    }

    this.setState({
      modalType,
    });
  }

  render() {
    const { active, currentUser, sites, currentSite, patient } = this.props;
    return (
      <div className={`item emails-info ${active ? 'active' : ''}`}>
        {<CalendarWidget
          currentUser={currentUser}
          sites={sites}
          currentSite={currentSite}
          patient={patient}
          schedules={[]}
          handleOpenModal={this.handleModalVisibility}
          handleShowAll={this.handleShowAll}
          ref={(c) => { this.calendarWidget = c; }}
        />}
      </div>
    );
  }
}

export default CalendarSection;
