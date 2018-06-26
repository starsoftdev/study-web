import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import _ from 'lodash';

import LoadingSpinner from '../../../components/LoadingSpinner';
import { translate } from '../../../../common/utilities/localization';

export class ReportViewTotals extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    reportsList: PropTypes.object,
    getPercentageObject: PropTypes.func,
    getMoreTotals: PropTypes.func,
    totals: PropTypes.object,
    openNotesModal: PropTypes.func,
    sources: PropTypes.array,
    dispositions: PropTypes.array,
    dispositionTotals: PropTypes.object,
    mediaSources: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      currentTab: 'mediaType',
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.handleSelectTab = this.handleSelectTab.bind(this);
    this.getTotalValues = this.getTotalValues.bind(this);
  }

  getTotalValues(currentTab) {
    let categories = currentTab === 'mediaType' ? this.props.sources : this.props.dispositions;
    let totals = currentTab === 'mediaType' ? this.props.totals : this.props.dispositionTotals;

    if (currentTab ===  'mediaName') {
      categories = this.props.mediaSources.details;
      totals = this.props.mediaSources;
    }

    return categories.map(cat => {
      let source = currentTab === 'mediaType' ? cat.id : cat.id - 1;
      let totalValues = {
        count_not_contacted: translate('sponsor.component.reportViewTotals.na'),
        dnq: translate('sponsor.component.reportViewTotals.na'),
        action_needed: translate('sponsor.component.reportViewTotals.na'),
        scheduled: translate('sponsor.component.reportViewTotals.na'),
        consented: translate('sponsor.component.reportViewTotals.na'),
        screen_failed: translate('sponsor.component.reportViewTotals.na'),
        randomized: translate('sponsor.component.reportViewTotals.na'),
        call_attempted: translate('sponsor.component.reportViewTotals.na'),
      };
      if (currentTab ===  'mediaName') {
        source = _.findIndex(categories, (o) => { return o.name === cat.name; });
      }
      if (totals.details[source]) {
        totalValues = {
          count_not_contacted: (totals.details[source].count_not_contacted || totals.details[source].count_not_contacted === 0) ? parseInt(totals.details[source].count_not_contacted) : translate('sponsor.component.reportViewTotals.na'),
          dnq: (totals.details[source].dnq || totals.details[source].dnq === 0) ? parseInt(totals.details[source].dnq) : translate('sponsor.component.reportViewTotals.na'),
          action_needed: (totals.details[source].action_needed || totals.details[source].action_needed === 0) ? parseInt(totals.details[source].action_needed) : translate('sponsor.component.reportViewTotals.na'),
          scheduled: (totals.details[source].scheduled || totals.details[source].scheduled === 0) ? parseInt(totals.details[source].scheduled) : translate('sponsor.component.reportViewTotals.na'),
          consented: (totals.details[source].consented || totals.details[source].consented === 0) ? parseInt(totals.details[source].consented) : translate('sponsor.component.reportViewTotals.na'),
          screen_failed: (totals.details[source].screen_failed || totals.details[source].screen_failed === 0) ? parseInt(totals.details[source].screen_failed) : translate('sponsor.component.reportViewTotals.na'),
          randomized: (totals.details[source].randomized || totals.details[source].randomized === 0) ? parseInt(totals.details[source].randomized) : translate('sponsor.component.reportViewTotals.na'),
          call_attempted: (totals.details[source].call_attempted || totals.details[source].call_attempted === 0) ? parseInt(totals.details[source].call_attempted) : translate('sponsor.component.reportViewTotals.na'),
        };

        let total = 0;
        _.forEach(totalValues, val => {
          if (val !== 'N/A') {
            total += parseInt(val);
          }
        });
        totalValues.total = total;
      }
      const percentage = this.props.getPercentageObject(totalValues);

      return {
        totals: totalValues,
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

  handleSelectTab = (tab) => {
    this.setState({ currentTab: tab });
  }

  renderCategory() {
    const { expanded, currentTab } = this.state;
    let cats = currentTab === 'mediaType' ? this.props.sources : this.props.dispositions;

    if (currentTab ===  'mediaName') {
      cats = this.props.mediaSources.details;
    }

    if (cats && cats.length > 0) {
      if (currentTab === 'mediaType' && !expanded) {
        return (<strong className="number media-type no-animation"><span>{(cats[0].name ? cats[0].name : cats[0].type)}</span></strong>);
      } else {
        return (
          <div>
            {
              cats.map(item => (<strong key={item.id} className="number media-type no-animation"><span>{(item.name ? item.name : item.type)}</span></strong>))
            }
          </div>
        );
      }
    }
    return (<div></div>);
  }

  renderValues(values, field) {
    const { expanded, currentTab } = this.state;
    if (values.length > 0) {
      if (currentTab === 'mediaType' && !expanded) {
        return (
          <strong className={classNames('number', { pointer: field === 'dnq' || field === 'action_needed' || field === 'screen_failed' })}>
            <span>
              { values[0].totals[field] }
              { field !== 'total' && <span className="small">{`(${values[0].percentage[`${field}_p`]}%)`}</span> }
            </span>
          </strong>
        );
      } else {
        return (
          <div>
            {
              values.map((value, index) => (
                <strong key={index} className={classNames('number', { pointer: field === 'dnq' || field === 'action_needed' || field === 'screen_failed' })}>
                  <span>
                    { value.totals[field] }
                    { field !== 'total' && <span className="small">{`(${value.percentage[`${field}_p`]}%)`}</span> }
                  </span>
                </strong>)
              )
            }
          </div>
        );
      }
    }
    return (<div></div>);
  }

  render() {
    const { currentTab } = this.state;
    const totalValues = this.getTotalValues(currentTab);
    let headingTitle;

    if (currentTab === 'mediaType') {
      headingTitle = 'headingMediaType';
    } else if (currentTab ===  'mediaName') {
      headingTitle = 'headingMediaName';
    } else {
      headingTitle = 'headingDisposition';
    }

    return (
      <div id="carousel-example-generic" className="carousel slide popup-slider">
        <ol className="carousel-indicators">
          <li className={classNames({ active: currentTab === 'mediaType' })} onClick={() => this.handleSelectTab('mediaType')}>
            {translate('sponsor.component.reportItem.mediaType')}
          </li>
          <li className={classNames('center-tab', { active: currentTab === 'mediaName' })} onClick={() => this.handleSelectTab('mediaName')}>
            {translate('sponsor.component.reportItem.mediaName')}
          </li>
          <li className={classNames({ active: currentTab === 'disposition' })} onClick={() => this.handleSelectTab('disposition')}>
            {translate('sponsor.component.reportItem.disposition')}
          </li>
        </ol>
        <div className="report-page-totals-container">
          {
            ((currentTab === 'mediaType' && this.props.totals.fetching) || (currentTab === 'disposition' && this.props.dispositionTotals.fetching)) && <div className="text-center report-page-total-loading-container"><LoadingSpinner showOnlyIcon /></div>
          }
          <ul className="list-inline list-stats">
            <li className="allcaps">
              <strong className="heading"><span>{translate(`sponsor.component.reportViewTotals.${headingTitle}`)}</span></strong>
              { this.renderCategory() }
            </li>
            <li>
              <strong className="heading"><span dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewTotals.headingNewPatient') }} /></strong>
              { this.renderValues(totalValues, 'count_not_contacted') }
            </li>
            <li>
              <strong className="heading"><span dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewTotals.headingCallTextAttempted') }} /></strong>
              { this.renderValues(totalValues, 'call_attempted') }
            </li>
            <li onClick={() => { this.props.openNotesModal(null, 'Not Qualified / Not Interested', 'DNQ'); }}>
              <strong className="heading"><span dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewTotals.headingNotInterested') }} /></strong>
              { this.renderValues(totalValues, 'dnq') }
            </li>
            <li onClick={() => { this.props.openNotesModal(null, 'Action Needed', 'ACTION NEEDED'); }}>
              <strong className="heading"><span dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewTotals.headingActionNeeded') }} /></strong>
              { this.renderValues(totalValues, 'action_needed') }
            </li>
            <li>
              <strong className="heading"><span>{translate('sponsor.component.reportViewTotals.headingScheduled')}</span></strong>
              { this.renderValues(totalValues, 'scheduled') }
            </li>
            <li>
              <strong className="heading"><span>{translate('sponsor.component.reportViewTotals.headingConsented')}</span></strong>
              { this.renderValues(totalValues, 'consented') }
            </li>
            <li onClick={() => { this.props.openNotesModal(null, 'Screen Failed', 'SCREEN FAILED'); }}>
              <strong className="heading"><span dangerouslySetInnerHTML={{ __html: translate('sponsor.component.reportViewTotals.headingScreenFailed') }} /></strong>
              { this.renderValues(totalValues, 'screen_failed') }
            </li>
            <li>
              <strong className="heading"><span>{translate('sponsor.component.reportViewTotals.headingRandomized')}</span></strong>
              { this.renderValues(totalValues, 'randomized') }
            </li>
            <li>
              <strong className="heading"><span>{translate('sponsor.component.reportViewTotals.headingTotal')}</span></strong>
              { this.renderValues(totalValues, 'total') }
            </li>
          </ul>
          {
            currentTab === 'mediaType' && <a className="see-more-btn" href="#" onClick={this.toggleExpand}>{this.state.expanded ? translate('sponsor.component.reportViewTotals.seeLess') : translate('sponsor.component.reportViewTotals.seeMore')}</a>
          }
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
)(ReportViewTotals);
