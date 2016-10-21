/**
 * Created by mike on 10/21/16.
 */

import React from 'react';

class IndicationOverlay extends React.Component {
  static propTypes = {
    indications: React.PropTypes.array,
    submitAddIndication: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    patient: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(indication) {
    const { submitAddIndication, onClose, patient } = this.props;
    submitAddIndication(patient.id, indication);
    onClose();
  }

  render() {
    const { indications } = this.props;
    return (
      <div className="select-indication-slide default-slide active">
        <div className="well jcf-list">
          <div className="search-holder">
            <input type="search" className="form-control keyword-search" id="search10" />
            <label htmlFor="search10" className="icomoon-icon_search2" />
          </div>
          <div className="jcf-overflow">
            <ul className="list-unstyled list select-indication">
              {indications.map(indication => (
                <li
                  key={indication.id}
                  onClick={() => {
                    this.onClick(indication);
                  }}
                >
                  {indication.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default IndicationOverlay;
