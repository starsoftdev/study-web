import _ from 'lodash';
import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';
import ReactTooltip from 'react-tooltip';
import Toggle from '../../../components/Input/Toggle';
import LoadingSpinner from '../../../components/LoadingSpinner';
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
    currentUser: PropTypes.object,
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
    if (!this.props.changeProtocolStatusProcess.saving) {
      this.props.changeProtocolStatus({ status, studyId });
    }
  }


  render() {
    const { reportsList } = this.props;

    const total = reportsList.details.length;
    let inActive = 0;
    let active = 0;

    const leftPartTable = reportsList.details.map((item, index) => {
      if (item.is_active) {
        active++;
      } else {
        inActive++;
      }
      const landingHref = item.url ? `/${item.study_id}-${item.url.toLowerCase().replace(/ /ig, '-')}` : '';
      return (
        <tr
          onMouseOver={(e) => this.mouseOverRow(e, index)}
          onMouseOut={this.mouseOutRow}
          onFocus={(e) => this.mouseOverRow(e, index)}
          onBlur={this.mouseOutRow}
          key={index}

          className={(this.state.hoveredRowIndex === index) ? 'active-table-row' : ''}
        >
          <td>
            <span data-for={`site-id-${index}`} data-tip={item.site_name} className="tooltip-element">{item.site_id}</span>
            <ReactTooltip id={`site-id-${index}`} type="info" class="tooltipClass" delayHide={500} effect="solid" />
          </td>
          <td>
            <a data-for={`study-id-${index}`} target="_blank" data-tip={item.study_id} href={landingHref} className="tooltip-element">{`${item.principalinvestigatorfirstname} ${item.principalinvestigatorlastname}`}</a>
            <ReactTooltip id={`study-id-${index}`} type="info" class="tooltipClass" delayHide={500} effect="solid" />
          </td>
          <td>{item.level}</td>
          <td>
            <div className="relative-element">
              <Toggle
                name={`status_${item.site_id}_${item.study_id}`}
                meta={{ touched:false, error:false, active:false }}
                input={{ value: item.is_active, onChange: (value) => { this.changeStatus(value, item.study_id); } }}
                disabled
              />
            </div>
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
          <td>{ (item.last_login_time ? moment(item.last_login_time).tz(item.timezone).format('MM/DD/YY [at] h:mm A') : '')}</td>
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
                    <th onClick={this.sortBy} data-sort="site_name" className={`th ${(this.props.paginationOptions.activeSort === 'site_name') ? this.props.paginationOptions.activeDirection : ''}`}>SITE # <i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="principalinvestigatorfirstname" className={`th ${(this.props.paginationOptions.activeSort === 'principalinvestigatorfirstname') ? this.props.paginationOptions.activeDirection : ''}`}>PRINCIPAL INVESTIGATOR <i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="level" className={`th ${(this.props.paginationOptions.activeSort === 'level') ? this.props.paginationOptions.activeDirection : ''}`}>EXPOSURE LEVEL <i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="is_active" className={`th ${(this.props.paginationOptions.activeSort === 'is_active') ? this.props.paginationOptions.activeDirection : ''}`}>STATUS <i className="caret-arrow" /></th>
                    <th>CREDITs <i className="caret-arrow" /></th>
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
                      <th onClick={this.sortBy} data-sort="level_date_from" className={`th ${(this.props.paginationOptions.activeSort === 'level_date_from') ? this.props.paginationOptions.activeDirection : ''}`}>START DATE <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="level_date_to" className={`th ${(this.props.paginationOptions.activeSort === 'level_date_to') ? this.props.paginationOptions.activeDirection : ''}`}>END DATE <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="last_login_time" className={`th ${(this.props.paginationOptions.activeSort === 'last_login_time') ? this.props.paginationOptions.activeDirection : ''}`}>LAST LOGIN <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="count_total" className={`th ${(this.props.paginationOptions.activeSort === 'count_total') ? this.props.paginationOptions.activeDirection : ''}`}>REFERRALS <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="count_contacted" className={`th ${(this.props.paginationOptions.activeSort === 'count_contacted') ? this.props.paginationOptions.activeDirection : ''}`}>CONTACTED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="count_not_contacted" className={`th ${(this.props.paginationOptions.activeSort === 'count_not_contacted') ? this.props.paginationOptions.activeDirection : ''}`}>NOT CONTACTED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="dnq" className={`th ${(this.props.paginationOptions.activeSort === 'dnq') ? this.props.paginationOptions.activeDirection : ''}`}>DNQ <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="scheduled" className={`th ${(this.props.paginationOptions.activeSort === 'scheduled') ? this.props.paginationOptions.activeDirection : ''}`}>SCHEDULED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="consented" className={`th ${(this.props.paginationOptions.activeSort === 'consented') ? this.props.paginationOptions.activeDirection : ''}`}>CONSENTED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="screen_failed" className={`th ${(this.props.paginationOptions.activeSort === 'screen_failed') ? this.props.paginationOptions.activeDirection : ''}`}>SCREEN FAILED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="randomized" className={`th ${(this.props.paginationOptions.activeSort === 'randomized') ? this.props.paginationOptions.activeDirection : ''}`}>RANDOMIZED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="outbound_text" className={`th ${(this.props.paginationOptions.activeSort === 'outbound_text') ? this.props.paginationOptions.activeDirection : ''}`}>TEXT SENT <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="inbound_text" className={`th ${(this.props.paginationOptions.activeSort === 'inbound_text') ? this.props.paginationOptions.activeDirection : ''}`}>TEXT RECEIVED <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="unread_text" className={`th ${(this.props.paginationOptions.activeSort === 'unread_text') ? this.props.paginationOptions.activeDirection : ''}`}>UNREAD TEXT <i className="caret-arrow" /></th>
                      <th onClick={this.sortBy} data-sort="outbound_emails" className={`th ${(this.props.paginationOptions.activeSort === 'outbound_emails') ? this.props.paginationOptions.activeDirection : ''}`}>EMAIL SENT <i className="caret-arrow" /></th>
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
        { this.props.reportsList.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div> }
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
