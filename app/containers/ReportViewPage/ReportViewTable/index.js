import React, { PropTypes } from 'react';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';
import Toggle from '../../../components/Input/Toggle';
import { selectChangeProtocolStatusProcess } from '../selectors';

@reduxForm({ form: 'reportListForm' })

export class ReportViewTable extends React.Component {
  static propTypes = {
    reportsList: PropTypes.object,
    getPercentageObject: PropTypes.func,
    setActiveSort: PropTypes.func,
    sortReportsSuccess: PropTypes.func,
    paginationOptions: PropTypes.object,
    formTableValues: PropTypes.object,
    changeProtocolStatus: PropTypes.func,
    changeProtocolStatusProcess: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      hoveredRowIndex: null,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.sortBy = this.sortBy.bind(this);

    this.mouseOverRow = this.mouseOverRow.bind(this);
    this.mouseOutRow = this.mouseOutRow.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  componentDidMount() {
    this.rightDiv.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.rightDiv.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const scrollLeft = event.target.scrollLeft;

    this.rightDivHeader.scrollLeft = scrollLeft;
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';
    const defaultSort = 'count_index';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);

    const dir = ((direction === 'down') ? 'desc' : 'asc');
    const sortedPatients = _.orderBy(this.props.reportsList.details, [function (o) {
      return o[sort || defaultSort];
    }], [dir]);
    this.props.sortReportsSuccess(sortedPatients);
  }

  mouseOverRow(e, index) {
    this.setState({ hoveredRowIndex: index });
  }

  mouseOutRow() {
    this.setState({ hoveredRowIndex: null });
  }

  changeStatus(status, studyId) {
    console.log(this.props.changeProtocolStatusProcess);
    if (!this.props.changeProtocolStatusProcess.saving) {
      this.props.changeProtocolStatus({ status, studyId });
    }
  }


  render() {
    const { reportsList } = this.props;

    const items = [
      {
        call_attempted: '1',
        consented: '1',
        count_contacted: '4',
        count_not_contacted: '4',
        count_total: '8',
        current_level: null,
        currrent_date_from: null,
        currrent_date_to: null,
        dnq: '1',
        inbound_text: '4',
        is_active: true,
        next_date_from: '2017-01-31T22:00:00.000Z',
        next_date_to: '2017-02-28T22:00:00.000Z',
        next_level: 'Ruby',
        outbound_emails: 0,
        outbound_text: '3',
        past_date_from: null,
        past_date_to: null,
        past_level: null,
        principal_investigator_active: '1',
        principal_investigator_inactive: '1',
        principalinvestigatorfirstname: 'Kosta',
        principalinvestigatorlastname: 'Petrov',
        randomized: '0',
        scheduled: '0',
        screen_failed: '0',
        site_id: 1,
        study_id: 1,
        unread_text: '0',
      },
    ];

    for (let i = 0; i < 7; i++) {
      items.push(items[0]);
    }

    const total = reportsList.details.length;
    let inActive = 0;
    let active = 0;

    const leftPartTable = reportsList.details.map((item, index) => {
      if (item.is_active) {
        active++;
      } else {
        inActive++;
      }

      return (
        <tr
          onMouseOver={(e) => this.mouseOverRow(e, index)}
          onMouseOut={this.mouseOutRow}
          onFocus={(e) => this.mouseOverRow(e, index)}
          onBlur={this.mouseOutRow}
          key={index}

          className={(this.state.hoveredRowIndex === index) ? 'active-table-row' : ''}
        >
          <td>{item.site_name}</td>
          <td>
            <span className="name" data-placement="top" data-toggle="tooltip" title="" data-original-title="Palmer Tech">{`${item.principalinvestigatorfirstname} ${item.principalinvestigatorlastname}`}</span>
          </td>
          <td>{item.level}</td>
          <td>
            <Toggle
              name={`status_${item.site_id}_${item.study_id}`}
              meta={{ touched:false, error:false, active:false }}
              input={{ value: item.is_active, onChange: (value) => { this.changeStatus(value, item.study_id); } }}
            />
          </td>
          <td>
            <span className="number">{item.customer_credits || 0}</span>
            <a disabled className="btn lightbox-opener btn-plus">+</a>
          </td>
        </tr>
      );
    }

    );

    const rightPartTable = reportsList.details.map((item, index) => {
      const percentage = this.props.getPercentageObject(item);

      return (
        <tr
          onMouseOver={(e) => this.mouseOverRow(e, index)}
          onMouseOut={this.mouseOutRow}
          onFocus={(e) => this.mouseOverRow(e, index)}
          onBlur={this.mouseOutRow}
          key={index}

          className={(this.state.hoveredRowIndex === index) ? 'active-table-row' : ''}
        >
          <td>{item.levelDateFrom}</td>
          <td>{item.levelDateTo}</td>
          <td>{ (item.last_login_time ? moment.utc(item.last_login_time).tz('EST').format('MM/DD/YY [at] HH:mm A') : '')}</td>
          <td>{item.count_total}</td>
          <td><span className="text">{item.count_contacted}<span className="small">{`(${percentage.count_contacted_p}%)`}</span></span></td>
          <td><span className="text">{item.count_not_contacted}<span className="small">{`(${percentage.count_not_contacted_p}%)`}</span></span></td>
          <td><span className="text">{item.dnq}<span className="small">{`(${percentage.dnq_p}%)`}</span></span></td>
          <td><span className="text">{item.scheduled}<span className="small">{`(${percentage.scheduled_p}%)`}</span></span></td>
          <td><span className="text">{item.consented}<span className="small">{`(${percentage.consented_p}%)`}</span></span></td>
          <td><span className="text">{item.screen_failed}<span className="small">{`(${percentage.screen_failed_p}%)`}</span></span></td>
          <td><span className="text">{item.randomized}<span className="small">{`(${percentage.randomized_p}%)`}</span></span></td>


          <td>{item.outbound_text}</td>
          <td>{item.inbound_text}</td>
          <td>{item.unread_text}</td>
          <td>{item.outbound_emails}</td>
        </tr>
      );
    }
    );

    return (
      <StickyContainer className="table-holder clearfix view-report-table fixed-table scroll-fixed">
        <Sticky className="report-view-fixed-header">
          <header className="fixed-table-head fixed-position fixed-table-head-relative">
            <h2 className="pull-left" >STUDY STATUS</h2>
            <div className="text-right text-uppercase links">
              <span className="active">ACTIVE <span className="number">{active}</span></span>
              <span className="inactive">INACTIVE <span className="number">{inActive}</span></span>
              <span className="counter">TOTAL <span className="number">{total}</span></span>
            </div>
          </header>
          <div className="report-view-header-container">
            <div className="table-left pull-left">
              <table className="table">
                <thead>
                  <tr>
                    <th onClick={this.sortBy} data-sort="site_name" className={`th ${(this.props.paginationOptions.activeSort === 'site_name') ? this.props.paginationOptions.activeDirection : ''}`}>SITE # <i className="caret-arrow"></i></th>
                    <th onClick={this.sortBy} data-sort="principalinvestigatorfirstname" className={`th ${(this.props.paginationOptions.activeSort === 'principalinvestigatorfirstname') ? this.props.paginationOptions.activeDirection : ''}`}>PRINCIPAL INVESTIGATOR <i className="caret-arrow"></i></th>
                    <th onClick={this.sortBy} data-sort="level" className={`th ${(this.props.paginationOptions.activeSort === 'level') ? this.props.paginationOptions.activeDirection : ''}`}>EXPOSURE LEVEL <i className="caret-arrow"></i></th>
                    <th onClick={this.sortBy} data-sort="is_active" className={`th ${(this.props.paginationOptions.activeSort === 'is_active') ? this.props.paginationOptions.activeDirection : ''}`}>STATUS <i className="caret-arrow"></i></th>
                    <th>CREDITs <i className="caret-arrow"></i></th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="table-right">
              <div
                className="table-right-inner"
                ref={(rightDivHeader) => {
                  this.rightDivHeader = rightDivHeader;
                }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th onClick={this.sortBy} data-sort="level_date_from" className={`th ${(this.props.paginationOptions.activeSort === 'level_date_from') ? this.props.paginationOptions.activeDirection : ''}`}>START DATE <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="level_date_to" className={`th ${(this.props.paginationOptions.activeSort === 'level_date_to') ? this.props.paginationOptions.activeDirection : ''}`}>END DATE <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="last_login_time" className={`th ${(this.props.paginationOptions.activeSort === 'last_login_time') ? this.props.paginationOptions.activeDirection : ''}`}>LAST LOGIN <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="count_total" className={`th ${(this.props.paginationOptions.activeSort === 'count_total') ? this.props.paginationOptions.activeDirection : ''}`}>REFERRALS <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="count_contacted" className={`th ${(this.props.paginationOptions.activeSort === 'count_contacted') ? this.props.paginationOptions.activeDirection : ''}`}>CONTACTED <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="count_not_contacted" className={`th ${(this.props.paginationOptions.activeSort === 'count_not_contacted') ? this.props.paginationOptions.activeDirection : ''}`}>NOT CONTACTED <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="dnq" className={`th ${(this.props.paginationOptions.activeSort === 'dnq') ? this.props.paginationOptions.activeDirection : ''}`}>DNQ <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="scheduled" className={`th ${(this.props.paginationOptions.activeSort === 'scheduled') ? this.props.paginationOptions.activeDirection : ''}`}>SCHEDULED <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="consented" className={`th ${(this.props.paginationOptions.activeSort === 'consented') ? this.props.paginationOptions.activeDirection : ''}`}>CONSENTED <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="screen_failed" className={`th ${(this.props.paginationOptions.activeSort === 'screen_failed') ? this.props.paginationOptions.activeDirection : ''}`}>SCREEN FAILED <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="randomized" className={`th ${(this.props.paginationOptions.activeSort === 'randomized') ? this.props.paginationOptions.activeDirection : ''}`}>RANDOMIZED <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="outbound_text" className={`th ${(this.props.paginationOptions.activeSort === 'outbound_text') ? this.props.paginationOptions.activeDirection : ''}`}>TEXT SENT <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="inbound_text" className={`th ${(this.props.paginationOptions.activeSort === 'inbound_text') ? this.props.paginationOptions.activeDirection : ''}`}>TEXT RECEIVED <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="unread_text" className={`th ${(this.props.paginationOptions.activeSort === 'unread_text') ? this.props.paginationOptions.activeDirection : ''}`}>UNREAD TEXT <i className="caret-arrow"></i></th>
                      <th onClick={this.sortBy} data-sort="outbound_emails" className={`th ${(this.props.paginationOptions.activeSort === 'outbound_emails') ? this.props.paginationOptions.activeDirection : ''}`}>EMAIL SENT <i className="caret-arrow"></i></th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </Sticky>
        <div className="table-area">
          <div className="table-left pull-left">
            <table className="table">
              <tbody>
                {leftPartTable}
              </tbody>
            </table>
          </div>
          <div
            className="table-right"
            ref={(rightDiv) => {
              this.rightDiv = rightDiv;
            }}
          >
            <table className="table">
              <tbody>
                {rightPartTable}
              </tbody>
            </table>
          </div>
        </div>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  changeProtocolStatusProcess: selectChangeProtocolStatusProcess(),
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewTable);
