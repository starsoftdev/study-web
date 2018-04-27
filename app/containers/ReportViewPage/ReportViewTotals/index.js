import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class ReportViewTotals extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    reportsList: PropTypes.object,
    getPercentageObject: PropTypes.func,
    getMoreTotals: PropTypes.func,
    totals: PropTypes.object,
    openNotesModal: PropTypes.func,
    sources: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.renderMediaType = this.renderMediaType.bind(this);
  }

  getTotalValues(props) {
    return props.sources.map(sourceObj => {
      let totals = {
        count_not_contacted: 'N/A',
        dnq: 'N/A',
        action_needed: 'N/A',
        scheduled: 'N/A',
        consented: 'N/A',
        screen_failed: 'N/A',
        randomized: 'N/A',
        call_attempted: 'N/A',
      };
      const source = sourceObj.id;
      if (props.totals.details[source]) {
        totals = {
          count_not_contacted: (props.totals.details[source].count_not_contacted || props.totals.details[source].count_not_contacted === 0) ? parseInt(props.totals.details[source].count_not_contacted) : 'N/A',
          dnq: (props.totals.details[source].dnq || props.totals.details[source].dnq === 0) ? parseInt(props.totals.details[source].dnq) : 'N/A',
          action_needed: (props.totals.details[source].action_needed || props.totals.details[source].action_needed === 0) ? parseInt(props.totals.details[source].action_needed) : 'N/A',
          scheduled: (props.totals.details[source].scheduled || props.totals.details[source].scheduled === 0) ? parseInt(props.totals.details[source].scheduled) : 'N/A',
          consented: (props.totals.details[source].consented || props.totals.details[source].consented === 0) ? parseInt(props.totals.details[source].consented) : 'N/A',
          screen_failed: (props.totals.details[source].screen_failed || props.totals.details[source].screen_failed === 0) ? parseInt(props.totals.details[source].screen_failed) : 'N/A',
          randomized: (props.totals.details[source].randomized || props.totals.details[source].randomized === 0) ? parseInt(props.totals.details[source].randomized) : 'N/A',
          call_attempted: (props.totals.details[source].call_attempted || props.totals.details[source].call_attempted === 0) ? parseInt(props.totals.details[source].call_attempted) : 'N/A',
        };
      }
      const percentage = props.getPercentageObject(totals);

      return {
        totals,
        percentage,
      };
    });
  }

  toggleExpand(e) {
    e.preventDefault();
    if (!this.state.expanded) {
      this.props.getMoreTotals();
    }
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  renderMediaType() {
    const { expanded } = this.state;
    const { sources } = this.props;

    if (sources && sources.length > 0) {
      if (!expanded) {
        return (<strong className="number"><span>{sources[0].type}</span></strong>);
      } else {
        return (
          <div>
            {
              sources.map(item => (<strong key={item.id} className="number"><span>{item.type}</span></strong>))
            }
          </div>
        );
      }
    }
    return (<div></div>);
  }

  renderValues(values, field) {
    const { expanded } = this.state;
    if (values.length > 0) {
      if (!expanded) {
        return (<strong className="number"><span>{values[0].totals[field]}<span className="small">{`(${values[0].percentage[`${field}_p`]}%)`}</span></span></strong>);
      } else {
        return (
          <div>
            {
              values.map((value, index) => (<strong key={index} className="number"><span>{value.totals[field]}<span className="small">{`(${value.percentage[`${field}_p`]}%)`}</span></span></strong>))
            }
          </div>
        );
      }
    }
    return (<div></div>);
  }

  render() {
    const totalValues = this.getTotalValues(this.props);
    return (
      <div className="report-page-totals-container">
        {this.props.totals.fetching && <div className="text-center report-page-total-loading-container"><LoadingSpinner showOnlyIcon /></div>}
        <ul className="list-inline list-stats">
          <li>
            <strong className="heading"><span>MEDIA TYPE</span></strong>
            { this.renderMediaType() }
          </li>
          <li>
            <strong className="heading"><span>NEW<br /> PATIENT</span></strong>
            { this.renderValues(totalValues, 'count_not_contacted') }
          </li>
          <li>
            <strong className="heading"><span>CALL / TEXT<br /> ATTEMPTED</span></strong>
            { this.renderValues(totalValues, 'call_attempted') }
          </li>
          <li onClick={() => { this.props.openNotesModal(null, 'Not Qualified / Not Interested', 'DNQ'); }}>
            <strong className="heading"><span>DNQ / NOT<br /> INTERESTED</span></strong>
            { this.renderValues(totalValues, 'dnq') }
          </li>
          <li onClick={() => { this.props.openNotesModal(null, 'Action Needed', 'ACTION NEEDED'); }}>
            <strong className="heading"><span>ACTION NEEDED</span></strong>
            { this.renderValues(totalValues, 'action_needed') }
          </li>
          <li>
            <strong className="heading"><span>SCHEDULED</span></strong>
            { this.renderValues(totalValues, 'scheduled') }
          </li>
          <li>
            <strong className="heading"><span>CONSENTED</span></strong>
            { this.renderValues(totalValues, 'consented') }
          </li>
          <li onClick={() => { this.props.openNotesModal(null, 'Screen Failed', 'SCREEN FAILED'); }}>
            <strong className="heading"><span>SCREEN<br /> FAILED</span></strong>
            { this.renderValues(totalValues, 'screen_failed') }
          </li>
          <li>
            <strong className="heading"><span>RANDOMIZED</span></strong>
            { this.renderValues(totalValues, 'randomized') }
          </li>
        </ul>
        <a className="see-more-btn" href="#" onClick={this.toggleExpand}>{this.state.expanded ? 'See less' : 'See more'}</a>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewTotals);
