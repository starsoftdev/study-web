/* eslint-disable no-multi-spaces */

import React, { Component, PropTypes } from 'react';
import { PieChart } from 'react-d3';
import { isEqual } from 'lodash';


export class StatsBox extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    totals: PropTypes.object,
    campaingSelected: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps) {
    const equal = isEqual(nextProps.totals.details, this.props.totals.details);
    return !equal;
  }

  render() {
    const { totals, campaingSelected } = this.props;
    const details = totals.details || {};

    const redCount = parseInt(details.total_red) || 0;
    const yellowCount = parseInt(details.total_yellow) || 0;
    const greenCount = parseInt(details.total_green) || 0;
    const purpleCount = parseInt(details.total_purple) || 0;

    const colorsTotal = redCount + yellowCount + greenCount + purpleCount;

    const redPercent = redCount ? ((redCount / colorsTotal) * 100).toFixed(2) : 0;
    const yellowPercent = yellowCount ? ((yellowCount / colorsTotal) * 100).toFixed(2) : 0;
    const greenPercent = greenCount ? ((greenCount / colorsTotal) * 100).toFixed(2) : 0;
    const purplePercent = purpleCount ? ((purpleCount / colorsTotal) * 100).toFixed(2) : 0;

    const tier1Count = parseInt(details.total_tier_one) || 0;
    const tier2Count = parseInt(details.total_tier_two) || 0;
    const tier3Count = parseInt(details.total_tier_three) || 0;
    const tier4Count = parseInt(details.total_tier_four) || 0;

    const tiersTotal = tier1Count + tier2Count + tier3Count + tier4Count;

    const tier1Percent = tier1Count ? ((tier1Count / tiersTotal) * 100).toFixed(2) : 0;
    const tier2Percent = tier2Count ? ((tier2Count / tiersTotal) * 100).toFixed(2) : 0;
    const tier3Percent = tier3Count ? ((tier3Count / tiersTotal) * 100).toFixed(2) : 0;
    const tier4Percent = tier4Count ? ((tier4Count / tiersTotal) * 100).toFixed(2) : 0;

    const pieData1 = [
      { label: 'RED',    value: redCount,    percent: redPercent, color: '#dd0000' },
      { label: 'YELLOW', value: yellowCount, percent: yellowPercent, color: '#f9ce15' },
      { label: 'GREEN',  value: greenCount,  percent: greenPercent, color: '#7dbc00' },
      { label: 'PURPLE', value: purpleCount, percent: purplePercent, color: '#873fbd' },
    ];

    const pieData2 = [
      { label: 'TIER 1', value: tier1Count, percent: tier1Percent, color: '#00afef' },
      { label: 'TIER 2', value: tier2Count, percent: tier2Percent, color: '#f78e1e' },
      { label: 'TIER 3', value: tier3Count, percent: tier3Percent, color: '#a0cf67' },
      { label: 'TIER 4', value: tier4Count, percent: tier4Percent, color: '#949ca1' },
    ];

    console.log('details', details);

    return (
      <div id="statsBox">
        <div className="section section1">
          <ul>
            <li><strong>Last 24 hours:</strong> {details.total_today || 0}</li>
            <li><strong>Campaign Total:</strong> {campaingSelected ? (details.total_campaign || 0) : 'N/A'}</li>
            <li><strong>Grand Total:</strong> {details.total_grand || 0}</li>
          </ul>
        </div>
        <div className="section section2">
          <ul className="half">
            {
              pieData1.map((data, index) => {
                const colorClass = data.label.toLowerCase();
                return (
                  <li key={index}>
                    <strong className={`color ${colorClass}`}>{data.label}: </strong>
                    <span className="number">{data.value} <span>({`${data.percent}%`})</span></span>
                  </li>
                );
              })
            }
          </ul>
          <div className="chart">
            <PieChart
              data={pieData1} b
              width={180}
              height={180}
              radius={90}
              innerRadius={0}
              sectorBorderColor="white"
              showOuterLabels={false}
              showInnerLabels={false}
              colors={(data) => data.color}
              colorAccessor={(data) => data}
            />
          </div>
        </div>
        <div className="section section2">
          <ul className="half">
            {
              pieData2.map((data, index) => {
                return (
                  <li key={index}>
                    <strong className={`tier${(index + 1)}`}>{data.label}: </strong>
                    <span className="number">{data.value} <span>({`${data.percent}%`})</span></span>
                  </li>
                );
              })
            }
          </ul>
          <div className="chart">
            <PieChart
              data={pieData2}
              width={180}
              height={180}
              radius={90}
              innerRadius={0}
              sectorBorderColor="white"
              showOuterLabels={false}
              showInnerLabels={false}
              colors={(data) => data.color}
              colorAccessor={(data) => data}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StatsBox;
