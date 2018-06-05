import React, { Component } from 'react';
import { PieChart } from 'react-d3';


export class AdminHome extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const pieData1 = [
      { label: 'RED', value: 40, percent: 40, color: '#dd0000' },
      { label: 'YELLOW', value: 30, percent: 30, color: '#f9ce15' },
      { label: 'GREEN', value: 20, percent: 20, color: '#7dbc00' },
      { label: 'PURPLE', value: 10, percent: 10, color: '#873fbd' },
    ];

    const pieData2 = [
      { label: 'TIER 1', value: 40, percent: 40, color: '#00afef' },
      { label: 'TIER 2', value: 30, percent: 30, color: '#f78e1e' },
      { label: 'TIER 3', value: 20, percent: 20, color: '#a0cf67' },
      { label: 'TIER 4', value: 10, percent: 10, color: '#949ca1' },
    ];

    return (
      <div id="statsBox">
        <div className="section section1">
          <ul>
            <li><strong>Last 24 hours:</strong> 100</li>
            <li><strong>Campaign Total:</strong> 200</li>
            <li><strong>Grand Total:</strong> 700</li>
          </ul>
        </div>
        <div className="section section2">
          <ul className="half">
            <li><strong className="color red">RED:</strong> 40 (40%)</li>
            <li><strong className="color yellow">Yellow:</strong> 30 (30%)</li>
            <li><strong className="color green">Green:</strong> 20 (20%)</li>
            <li><strong className="color purple">Purple:</strong> 10 (10%)</li>
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
            <li><strong className="tier1">Tier 1:</strong> 40 (40%)</li>
            <li><strong className="tier2">Tier 2:</strong> 30 (30%)</li>
            <li><strong className="tier3">Tier 3:</strong> 20 (20%)</li>
            <li><strong className="tier4">Tier 4:</strong> 10 (10%)</li>
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

export default AdminHome;
