import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import rd3 from 'react-d3';

import { translate } from '../../../../common/utilities/localization';

const PieChart = rd3.PieChart;
const BarChart = rd3.BarChart;

export class ReportViewInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    reportsList: PropTypes.object,
    totals: PropTypes.object,
    openPQSModal: PropTypes.func,
    patientSignUps: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      barChartWidth: null,
      barChartHeight: null,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    console.log('handleResize');

    if (window.innerWidth >= 1870) {
      this.setState({
        barChartWidth: 260,
        barChartHeight: 110,
      });
    } else if (window.innerWidth < 1870 && window.innerWidth > 1390) {
      this.setState({
        barChartWidth: 220,
        barChartHeight: 105,
      });
    } else {
      this.setState({
        barChartWidth: 200,
        barChartHeight: 100,
      });
    }
  }

  render() {
    let totals = {
      textSent: translate('sponsor.component.reportViewInfo.na'),
      textReceived: translate('sponsor.component.reportViewInfo.na'),
      unreadText: translate('sponsor.component.reportViewInfo.na'),
      emailSent: translate('sponsor.component.reportViewInfo.na'),
      count_today: translate('sponsor.component.reportViewInfo.na'),
      count_yesterday: translate('sponsor.component.reportViewInfo.na'),
    };

    if (this.props.totals.details[this.props.totals.source]) {
      totals = {
        textSent: (this.props.totals.details[this.props.totals.source].outbound_text || this.props.totals.details[this.props.totals.source].outbound_text === 0) ? parseInt(this.props.totals.details[this.props.totals.source].outbound_text) : translate('sponsor.component.reportViewInfo.na'),
        textReceived: (this.props.totals.details[this.props.totals.source].inbound_text || this.props.totals.details[this.props.totals.source].inbound_text === 0) ? parseInt(this.props.totals.details[this.props.totals.source].inbound_text) : translate('sponsor.component.reportViewInfo.na'),
        unreadText: (this.props.totals.details[this.props.totals.source].unread_text || this.props.totals.details[this.props.totals.source].unread_text === 0) ? parseInt(this.props.totals.details[this.props.totals.source].unread_text) : translate('sponsor.component.reportViewInfo.na'),
        emailSent: (this.props.totals.details[this.props.totals.source].outbound_emails || this.props.totals.details[this.props.totals.source].outbound_emails === 0) ? parseInt(this.props.totals.details[this.props.totals.source].outbound_emails) : translate('sponsor.component.reportViewInfo.na'),

        count_today: this.props.patientSignUps.today,
        count_yesterday: this.props.patientSignUps.yesterday,
      };
    }

    const pieData = [
      { label: 'TODAY', value: (this.props.patientSignUps.today || 0), color: '#cf2a27' },
      { label: 'YESTERDAY', value: (this.props.patientSignUps.yesterday || 0), color: '#9900FF' },
    ];

    const barData = [
      {
        label: 'Text Sent',
        values: [{ x: 'Text Sent', y: (totals.textSent === translate('sponsor.component.reportViewInfo.na') ? 0 : totals.textSent), color: '#e06666' }, { x: 'Text Received', y: (totals.textReceived === translate('sponsor.component.reportViewInfo.na') ? 0 : totals.textReceived), color: '#6aa84f' },
          { x: 'Unread Text', y: (totals.unreadText === translate('sponsor.component.reportViewInfo.na') ? 0 : totals.unreadText), color: '#45818e' }, { x: 'Email Sent', y: (totals.emailSent === translate('sponsor.component.reportViewInfo.na') ? 0 : totals.emailSent), color: '#cf2a27' }],
      },
    ];

    console.log(322, this.state);

    return (
      <div className="infoarea row" id="sponsor-report-infoarea">
        <div className="col-xs-6">
          <div className="box table-box">
            <div className="report-view-box-holder">
              <div className="textbox">
                <h2 className="view-header" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.signUps') }} />
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="report-view-box-holder">
              <ul className="list-inline text-center list-activities alt">
                <li className="red">
                  <strong className="number">{totals.count_today}</strong>
                  <span className="sub-title report-font-fix">{translate('sponsor.component.reportViewInfo.today')}</span>
                </li>
                <li className="purple">
                  <strong className="number">{totals.count_yesterday}</strong>
                  <span className="sub-title report-font-fix">{translate('sponsor.component.reportViewInfo.yesterday')}</span>
                </li>
                <li className="pink">
                  <strong className="number">{this.props.patientSignUps.total}</strong>
                  <span className="sub-title report-font-fix">{translate('sponsor.component.reportViewInfo.total')}</span>
                </li>
                <li>
                  <PieChart
                    data={pieData}
                    width={80}
                    height={80}
                    radius={40}
                    innerRadius={0}
                    sectorBorderColor="white"
                    showOuterLabels={false}
                    showInnerLabels={false}
                    colors={(data) => data.color}
                    colorAccessor={(data) => data}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="box table-box">
            <div className="report-view-box-holder">
              <div className="textbox">
                <h2 className="view-header" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.messages') }} />
              </div>
            </div>
          </div>
          <div className="box table-box">
            <div className="report-view-box-holder">
              <ul className="list-inline text-center list-activities alt">
                <li className="red3">
                  <strong className="number">{totals.textSent}</strong>
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.textSent') }} />
                </li>
                <li className="green4">
                  <strong className="number">{totals.textReceived}</strong>
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.textReceived') }} />
                </li>
                <li className="cyan4">
                  <strong className="number">{totals.unreadText}</strong>
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.textUnread') }} />
                </li>
                <li className="purple3">
                  <strong className="number">{totals.emailSent}</strong>
                  <span className="sub-title report-font-fix" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewInfo.emailSent') }} />
                </li>
                <li>
                  <BarChart
                    data={barData}
                    width={this.state.barChartWidth}
                    height={this.state.barChartHeight}
                    colorAccessor={(data) => data}
                    colors={(data) => (data.color)}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewInfo);
