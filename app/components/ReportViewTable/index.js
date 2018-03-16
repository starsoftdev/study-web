import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';
import LoadingSpinner from '../../components/LoadingSpinner';

@reduxForm({ form: 'reportListForm' })

export class ReportViewTable extends React.Component {
  static propTypes = {
    reportsList: PropTypes.object,
    getPercentageObject: PropTypes.func,
    setActiveSort: PropTypes.func,
    sortReportsSuccess: PropTypes.func,
    paginationOptions: PropTypes.object,
    formTableValues: PropTypes.object,
    currentUser: PropTypes.object,
    totals: PropTypes.object,
    loadReports: PropTypes.func,
    openNotesModal: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      hoveredRowIndex: null,
      isFixedBottomScroll: false,
      fixedScrollWidth: false,
      fixedScrollContainerWidth: 2236,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleBodyScroll = this.handleBodyScroll.bind(this);
    this.sortBy = this.sortBy.bind(this);

    this.mouseOverRow = this.mouseOverRow.bind(this);
    this.mouseOutRow = this.mouseOutRow.bind(this);

    this.loadItems = this.loadItems.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleBodyScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleBodyScroll);
  }

  handleScroll(event) {
    const scrollLeft = event.target.scrollLeft;
    this.rightDiv.scrollLeft = scrollLeft;
    this.rightDivHeader.scrollLeft = scrollLeft;
    this.rightDivParentHeader.scrollLeft = scrollLeft;
  }

  handleBodyScroll(event) {
    const scrollingElement = event.target.scrollingElement;
    const scrollTop = scrollingElement ? scrollingElement.scrollTop : document.documentElement.scrollTo;
    const scrollHeight = scrollingElement ? scrollingElement.scrollHeight : document.documentElement.scrollHeight;

    if ((window.innerHeight + scrollTop < 990) || (scrollHeight - window.innerHeight - scrollTop < 80)) {
      if (this.state.isFixedBottomScroll) {
        this.setState({ isFixedBottomScroll: false });
      }
    } else if (!this.state.isFixedBottomScroll || this.state.fixedScrollWidth !== this.tableRight.clientWidth) {
      this.setState({ isFixedBottomScroll: true, fixedScrollWidth: this.tableRight.clientWidth, fixedScrollContainerWidth: this.tableRightElement.clientWidth });
    }
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);

    this.props.loadReports(true, sort, direction);
  }

  mouseOverRow(e, index) {
    this.setState({ hoveredRowIndex: index });
  }

  mouseOutRow() {
    this.setState({ hoveredRowIndex: null });
  }

  loadItems() {
    if (!this.props.reportsList.fetching) {
      this.props.loadReports(false);
    }
  }

  render() {
    const { reportsList } = this.props;

    const inActive = this.props.totals.details.total_inactive ? parseInt(this.props.totals.details.total_inactive) : 0;
    const active = this.props.totals.details.total_active ? parseInt(this.props.totals.details.total_active) : 0;
    const total = inActive + active;

    const leftPartTable = reportsList.details.map((item, index) => {
      const landingHref = item.url ? `/${item.study_id}-${item.url.toLowerCase().replace(/ /ig, '-')}` : '';
      const piName = (item.principalinvestigatorname) ? item.principalinvestigatorname : 'N/A';
      const tooltip = (
        <Tooltip id={`tooltip-id-${index}`} className="sponsor-report-tooltip">
          {`${item.study_id} - ${item.site_name}`}
        </Tooltip>
      );

      return (
        <tr
          onMouseOver={(e) => this.mouseOverRow(e, index)}
          onMouseOut={this.mouseOutRow}
          onFocus={(e) => this.mouseOverRow(e, index)}
          onBlur={this.mouseOutRow}
          key={index}
          className={(this.state.hoveredRowIndex === index) ? 'active-table-row' : ''}
        >
          <td></td>
          <td>
            <OverlayTrigger placement="top" overlay={tooltip}>
              <a target="_blank" href={landingHref} className="tooltip-element">{`${piName}`}</a>
            </OverlayTrigger>
          </td>
          <td>{item.level}</td>
          <td>
            <span className={item.is_active ? 'button on' : 'button off'}>{item.is_active ? 'ON' : 'OFF'}</span>
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
          <td className="level_date_from">{item.levelDateFrom}</td>
          <td className="level_date_to">{item.levelDateTo}</td>
          <td className="last_login_time">{ (item.last_login_time ? moment(item.last_login_time).tz(item.timezone).format('MM/DD/YY [at] h:mm A') : '')}</td>
          <td className="count_total">{item.count_total}</td>
          <td className="count_not_contacted"><span className="text">{item.count_not_contacted || 0}<span className="small">{`(${percentage.count_not_contacted_p}%)`}</span></span></td>
          <td className="call_attempted"><span className="text">{item.call_attempted || 0}<span className="small">{`(${percentage.call_attempted_p}%)`}</span></span></td>
          <td className="dnq"><span className="text" onClick={() => { this.props.openNotesModal(item.study_id, 'Not Qualified / Not Interested', 'DNQ'); }}>{item.dnq || 0}<span className="small">{`(${percentage.dnq_p}%)`}</span></span></td>
          <td className="action_needed"><span className="text" onClick={() => { this.props.openNotesModal(null, 'Action Needed', 'ACTION NEEDED'); }}>{item.action_needed || 0}<span className="small">{`(${percentage.action_needed_p}%)`}</span></span></td>
          <td className="scheduled"><span className="text">{item.scheduled || 0}<span className="small">{`(${percentage.scheduled_p}%)`}</span></span></td>
          <td className="consented"><span className="text">{item.consented || 0}<span className="small">{`(${percentage.consented_p}%)`}</span></span></td>
          <td className="screen_failed"><span className="text" onClick={() => { this.props.openNotesModal(null, 'Screen Failed', 'SCREEN FAILED'); }}>{item.screen_failed || 0}<span className="small">{`(${percentage.screen_failed_p}%)`}</span></span></td>
          <td className="randomized"><span className="text">{item.randomized || 0}<span className="small">{`(${percentage.randomized_p}%)`}</span></span></td>
          <td className="outbound_text">{item.outbound_text || 0}</td>
          <td className="inbound_text">{item.inbound_text || 0}</td>
          <td className="unread_text">{item.unread_text || 0}</td>
          <td className="outbound_emails">{item.outbound_emails || 0}</td>
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
                    <th className="default-cursor">#<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="principalinvestigatorfirstname" className={`th ${(this.props.paginationOptions.activeSort === 'principalinvestigatorfirstname') ? this.props.paginationOptions.activeDirection : ''}`}>PRINCIPAL INVESTIGATOR <i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="level" className={`th ${(this.props.paginationOptions.activeSort === 'level') ? this.props.paginationOptions.activeDirection : ''}`}>LISTING <i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="is_active" className={`th ${(this.props.paginationOptions.activeSort === 'is_active') ? this.props.paginationOptions.activeDirection : ''}`}>STATUS <i className="caret-arrow" /></th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="table-right">
              <div
                className="table-right-inner"
                onScroll={this.handleScroll}
                ref={(rightDivHeader) => {
                  this.rightDivHeader = rightDivHeader;
                }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th onClick={this.sortBy} data-sort="level_date_from" className={`level_date_from th ${(this.props.paginationOptions.activeSort === 'level_date_from') ? this.props.paginationOptions.activeDirection : ''}`}>START DATE <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="level_date_to" className={`level_date_to th ${(this.props.paginationOptions.activeSort === 'level_date_to') ? this.props.paginationOptions.activeDirection : ''}`}>END DATE <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="last_login_time" className={`last_login_time th ${(this.props.paginationOptions.activeSort === 'last_login_time') ? this.props.paginationOptions.activeDirection : ''}`}>LAST LOGIN <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="count_total" className={`count_total th ${(this.props.paginationOptions.activeSort === 'count_total') ? this.props.paginationOptions.activeDirection : ''}`}>REFERRALS <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="count_not_contacted" className={`count_not_contacted th ${(this.props.paginationOptions.activeSort === 'count_not_contacted') ? this.props.paginationOptions.activeDirection : ''}`}>NOT CONTACTED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="call_attempted" className={`call_attempted th ${(this.props.paginationOptions.activeSort === 'call_attempted') ? this.props.paginationOptions.activeDirection : ''}`}>CALL ATTEMPTED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="dnq" className={`dnq th ${(this.props.paginationOptions.activeSort === 'dnq') ? this.props.paginationOptions.activeDirection : ''}`}>DNQ <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="action_needed" className={`action_needed th ${(this.props.paginationOptions.activeSort === 'action_needed') ? this.props.paginationOptions.activeDirection : ''}`}>ACTION NEEDED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="scheduled" className={`scheduled th ${(this.props.paginationOptions.activeSort === 'scheduled') ? this.props.paginationOptions.activeDirection : ''}`}>SCHEDULED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="consented" className={`consented th ${(this.props.paginationOptions.activeSort === 'consented') ? this.props.paginationOptions.activeDirection : ''}`}>CONSENTED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="screen_failed" className={`screen_failed th ${(this.props.paginationOptions.activeSort === 'screen_failed') ? this.props.paginationOptions.activeDirection : ''}`}>SCREEN FAILED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="randomized" className={`randomized th ${(this.props.paginationOptions.activeSort === 'randomized') ? this.props.paginationOptions.activeDirection : ''}`}>RANDOMIZED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="outbound_text" className={`outbound_text th ${(this.props.paginationOptions.activeSort === 'outbound_text') ? this.props.paginationOptions.activeDirection : ''}`}>TEXT SENT <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="inbound_text" className={`inbound_text th ${(this.props.paginationOptions.activeSort === 'inbound_text') ? this.props.paginationOptions.activeDirection : ''}`}>TEXT RECEIVED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="unread_text" className={`unread_text th ${(this.props.paginationOptions.activeSort === 'unread_text') ? this.props.paginationOptions.activeDirection : ''}`}>UNREAD TEXT <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="outbound_emails" className={`outbound_emails th ${(this.props.paginationOptions.activeSort === 'outbound_emails') ? this.props.paginationOptions.activeDirection : ''}`}>EMAIL SENT <i className="caret-arrow" /></th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </Sticky>
        <InfiniteScroll
          className="reports"
          pageStart={0}
          loadMore={this.loadItems}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={<div className="text-center"><LoadingSpinner showOnlyIcon /></div>}
        >
          <div className="table-area">
            <div className="table-left">
              <table className="table">
                <tbody>
                  {leftPartTable}
                </tbody>
              </table>
            </div>
            <div
              className="table-right"
              ref={(tableRight) => {
                this.tableRight = tableRight;
              }}
            >
              <div className="scroll-holder jcf-scrollable">
                <div
                  className="table-inner"
                  onScroll={this.handleScroll}
                  ref={(rightDivParentHeader) => {
                    this.rightDivParentHeader = rightDivParentHeader;
                  }}
                >
                  <table
                    className="table"
                    ref={(tableRightElement) => {
                      this.tableRightElement = tableRightElement;
                    }}
                  >
                    <tbody>
                      {rightPartTable}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                onScroll={this.handleScroll}
                ref={(rightDiv) => {
                  this.rightDiv = rightDiv;
                }}
                style={{ width: (this.state.fixedScrollWidth || 'auto') }}
                className={classNames('table-scroll-wrap', (this.state.isFixedBottomScroll ? 'table-scroll-wrap-fixed' : ''))}
              >
                <div className="table-scroll-container" style={{ width: (this.state.fixedScrollContainerWidth || 2236) }} />
              </div>
            </div>
          </div>
        </InfiniteScroll>
        { this.props.reportsList.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div> }
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewTable);
