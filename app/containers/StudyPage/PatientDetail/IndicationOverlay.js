/**
 * Created by mike on 10/21/16.
 */

import React from 'react';

class IndicationOverlay extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="select-indication-slide default-slide active">
        <div className="well jcf-list">
          <div className="search-holder">
            <input type="search" className="form-control keyword-search" id="search10" />
            <label htmlFor="search10" className="icomoon-icon_search2" />
          </div>
          <div className="jcf-overflow">
            <ul className="list-unstyled list select-indication">
              <li>Acne</li>
              <li>Back Pain</li>
              <li>Magraine </li>
              <li>Ring worm</li>
              <li>COPD</li>
              <li>Leg pain</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default IndicationOverlay;
