import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';

export class ReportViewTable extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.rightDiv.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.rightDiv.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    console.log(444);
    const scrollLeft = event.target.scrollLeft;

    console.log(scrollLeft);
    console.log(555);
    this.rightDivHeader.scrollLeft = scrollLeft;
  }


  render() {
    const items = [
      {
        site: 'ASDF123',
        principal: 'Jacob Smith',
        level: 'Platinum',
        isActive: true,
        credits: 150,
        startDate: '01/01/16',
        endDate: '01/01/16',
        lastLogin: '01/01/16',
        referrals: 120,
        contacted: 100,
        notContacted: 20,
        dnq: 10,
        scheduled: 20,
        consented: 20,
        screenFailed: 30,
        randomized: 40,
        textSend: 10,
        textReceived: 20,
        unreadText: 20,
        emailSent: 40,
      },
    ];

    for (let i = 0; i < 7; i++) {
      items.push(items[0]);
    }

    const leftPartTable = items.map((item, index) => ((
      <tr key={index}>
        <td>{item.site}</td>
        <td>
          <span className="name" data-placement="top" data-toggle="tooltip" title="" data-original-title="Palmer Tech">{item.principal}</span>
        </td>
        <td>{item.level}</td>
        <td>
          <label className="check-switcher" htmlFor="status-platinum">
            <span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="status-platinum" /></span>
            <span data-off="OFF" data-on="ON" className="text"></span>
            <div className="tooltip custom top">
              <div className="tooltop-arrow"></div>
              <div className="tooltop-inner" data-active="Activated" data-deactive="Deactivated"></div>
            </div>
          </label>
        </td>
        <td>
          <span className="number">{item.credits}</span>
          <a href="#add-credits" className="lightbox-opener btn-plus">+</a>
        </td>
      </tr>
    )));

    const rightPartTable = items.map((item, index) => ((
      <tr className="" key={index}>
        <td>{item.startDate}</td>
        <td>{item.endDate}</td>
        <td><span className="time">05/15/16 at <span className="small">12:30 PM</span></span></td>
        <td>{item.referrals}</td>
        <td><span className="text">1000<span className="small">(75%)</span></span></td>
        <td><span className="text">233<span className="small">(25%)</span></span></td>
        <td><span className="text">500<span className="small">(54%)</span></span></td>
        <td><span className="text">100<span className="small">(23%)</span></span></td>
        <td><span className="text">50<span className="small">(5%)</span></span></td>
        <td><span className="text">34<span className="small">(6%)</span></span></td>
        <td><span className="text">12<span className="small">(2%)</span></span></td>


        <td>2</td>
        <td>3</td>
        <td>0</td>
        <td>2</td>
      </tr>
    )));

    return (
      <StickyContainer className="table-holder clearfix view-report-table fixed-table scroll-fixed">
        <Sticky className="report-view-fixed-header">
          <header className="fixed-table-head fixed-position fixed-table-head-relative">
            <h2 className="pull-left" >STUDY STATUS</h2>
            <div className="text-right text-uppercase links">
              <span className="active">ACTIVE <span className="number">43</span></span>
              <span className="inactive">INACTIVE <span className="number">29</span></span>
              <span className="counter">TOTAL <span className="number">72</span></span>
            </div>
          </header>
          <div className="report-view-header-container">
            <div className="table-left pull-left">
              <table className="table">
                <thead>
                <tr>
                  <th>SITE # <i className="caret-arrow"></i></th>
                  <th>PRINCIPAL INVESTIGATOR <i className="caret-arrow"></i></th>
                  <th>EXPOSURE LEVEL <i className="caret-arrow"></i></th>
                  <th>STATUS <i className="caret-arrow"></i></th>
                  <th>CREDITs <i className="caret-arrow"></i></th>
                </tr>
                </thead>
              </table>
            </div>
            <div className="table-right">
              <div className="table-right-inner"
                ref={(rightDivHeader) => {
                  this.rightDivHeader = rightDivHeader;
                }}
              >
                <table className="table">
                  <thead>
                  <tr>
                    <th>START DATE <i className="caret-arrow"></i></th>
                    <th>END DATE <i className="caret-arrow"></i></th>
                    <th>LAST LOGIN <i className="caret-arrow"></i></th>
                    <th>REFERRALS <i className="caret-arrow"></i></th>
                    <th>CONTACTED <i className="caret-arrow"></i></th>
                    <th>NOT CONTACTED <i className="caret-arrow"></i></th>
                    <th>DNQ <i className="caret-arrow"></i></th>
                    <th>SCHEDULED <i className="caret-arrow"></i></th>
                    <th>CONSENTED <i className="caret-arrow"></i></th>
                    <th>SCREEN FAILED <i className="caret-arrow"></i></th>
                    <th>RANDOMIZED <i className="caret-arrow"></i></th>
                    <th>TEXT SENT <i className="caret-arrow"></i></th>
                    <th>TEXT RECEIVED <i className="caret-arrow"></i></th>
                    <th>UNREAD TEXT <i className="caret-arrow"></i></th>
                    <th>EMAIL SENT <i className="caret-arrow"></i></th>
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

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewTable);
