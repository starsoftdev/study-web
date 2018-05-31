import React, { PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import { bindActionCreators } from 'redux';
import { actions as toastrActions } from 'react-redux-toastr';
import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { defaultStaticRanges } from '../../common/constants/dateRanges';
import { STATUS_ALL, STATUS_ACTIVE, STATUS_INACTIVE } from '../../containers/ReportViewPage/constants';
import { getMomentFromDate } from '../../utils/time';
import CenteredModal from '../CenteredModal/index';
import ReactSelect from '../Input/ReactSelect';
import Input from '../Input/index';
import { exportStudies } from '../../containers/ReportViewPage/actions';
import { getItem } from '../../utils/localStorage';
import {
  selectSocket,
} from '../../containers/GlobalNotifications/selectors';
import { translate } from '../../../common/utilities/localization';

@reduxForm({ form: 'searchReports' })

export class ReportViewSearch extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    searchReports: PropTypes.func,
    exportStudies: PropTypes.func,
    formValues: PropTypes.object,
    currentUser: PropTypes.object,
    reportsList: PropTypes.object,
    socket: React.PropTypes.any,
    toastrActions: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      socketBinded: false,
      searchTimer: null,
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

    this.initSearch = this.initSearch.bind(this);

    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined');
    this.changeRange = this.changeRange.bind(this);
    this.renderDateFooter = this.renderDateFooter.bind(this);
    this.download = this.download.bind(this);
    this.select = this.select.bind(this);

    this.downloadNotes = false;
  }

  componentWillReceiveProps() {
    const { currentUser, socket } = this.props;

    if (socket && this.state.socketBinded === false) {
      this.setState({ socketBinded: true }, () => {
        socket.on('notifySponsorReportReady', (data) => {
          const authToken = getItem('auth_token');
          if (currentUser.roleForSponsor && data.url && currentUser.roleForSponsor.id === data.sponsorRoleId && authToken === data.authToken) {
            setTimeout(() => { this.props.toastrActions.remove('loadingToasterForExportStudies'); }, 1000);
            location.replace(data.url);
          }
        });
      });
    }
  }

  handleChange(which, payload) {
    if (payload.selection) {
      this.setState({
        [which] : payload.selection,
      });
    }
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
    const startDate = getMomentFromDate(range.startDate).utc();
    let endDate = getMomentFromDate(range.endDate).utc();

    if (!endDate.isAfter(startDate)) {
      endDate = endDate.add(1, 'days');
    }
    const uiStartDate = startDate.format(translate('sponsor.component.reportViewSearch.defaultDateMask'));
    const uiEndDate = endDate.format(translate('sponsor.component.reportViewSearch.defaultDateMask'));

    this.props.dispatch(change('searchReports', 'startDate', startDate.format(translate('sponsor.component.reportViewSearch.dateAndTimeMask'))));
    this.props.dispatch(change('searchReports', 'endDate', endDate.format(translate('sponsor.component.reportViewSearch.dateAndTimeMask'))));

    this.setState({
      selectedTime: {
        startDate: uiStartDate,
        endDate: uiEndDate,
      },
    }, () => {
      this.props.searchReports({ endDate, startDate });
      this.hidePopup();
    });
  }

  download() {
    const { exportStudies, currentUser, formValues } = this.props;
    const protocolNumber = this.props.location.query.protocol || null;
    const indication = this.props.location.query.indication || null;
    const cro = this.props.location.query.cro || null;
    const messaging = this.props.location.query.messaging || null;

    let filters = {
      includeNotes: this.downloadNotes,
      sponsorRoleId: currentUser.roleForSponsor.id,
      protocol: protocolNumber,
      indication,
      cro,
      messaging,
      timezone: currentUser.timezone,
    };
    filters = _.assign(filters, this.props.formValues, formValues);

    exportStudies(filters);
    this.downloadNotes = false;
  }

  select(ev) {
    this.downloadNotes = ev;
    this.download();
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

  render() {
    const { selectedTime } = this.state;
    const statusOptions = [
      {
        label: translate('common.constants.all'),
        value: STATUS_ALL,
      },
      {
        label: translate('sponsor.component.reportViewSearch.active'),
        value: STATUS_ACTIVE,
      },
      {
        label: translate('sponsor.component.reportViewSearch.inactive'),
        value: STATUS_INACTIVE,
      },
    ];

    const timeButtonText = (selectedTime.startDate && selectedTime.endDate) ? `${selectedTime.startDate} - ${selectedTime.endDate}` : translate('sponsor.component.reportViewSearch.dateRange');

    return (
      <div className="search-controls form-search clearfix">
        <div className="btns-area pull-right full-width">
          <div className="col pull-right">
            <SplitButton
              bsStyle="primary"
              title={translate('sponsor.component.reportViewSearch.download')}
              id="split-button-basic"
              onClick={this.download}
            >
              <MenuItem eventKey={false} onSelect={this.select}>
                {translate('sponsor.component.reportViewSearch.withoutNotes')}
              </MenuItem>
              <MenuItem eventKey onSelect={this.select}>
                {translate('sponsor.component.reportViewSearch.withNotes')}
              </MenuItem>
            </SplitButton>
          </div>
          <div className="col pull-right">
            <a className="btn btn-primary lightbox-opener" onClick={this.showPopup}><i className="icomoon-icon_calendar" /> {timeButtonText}</a>
          </div>
        </div>
        <div className={(selectedTime.startDate && selectedTime.endDate) ? 'date-selected fields-holder full-width' : 'fields-holder full-width'}>
          <div className="search-area pull-left">
            <div className="has-feedback">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder={translate('sponsor.component.reportViewSearch.placeholderSearch')}
                className="keyword-search"
                onChange={(e) => this.initSearch(e, 'name')}
              />
            </div>
          </div>
          <div className="pull-left custom-select">
            <Field
              name="status"
              component={ReactSelect}
              placeholder={translate('sponsor.component.reportViewSearch.placeholderStatus')}
              options={statusOptions}
              clearable={false}
              onChange={(e) => this.initSearch(e, 'status')}
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
                    {translate('sponsor.component.reportViewSearch.submit')}
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

const mapStateToProps = createStructuredSelector({
  socket: selectSocket(),
});

function mapDispatchToProps(dispatch) {
  return {
    exportStudies: (payload) => dispatch(exportStudies(payload)),
    toastrActions: bindActionCreators(toastrActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewSearch);
