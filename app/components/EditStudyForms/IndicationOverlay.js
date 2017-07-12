/**
 * Created by mike on 10/21/16.
 */

import React from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import Input from '../../components/Input/index';

class IndicationOverlay extends React.Component {
  static propTypes = {
    indications: React.PropTypes.array,
    selectIndication: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    study: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      indicationFilter: '',
      study: props.study,
    };
    this.onClick = this.onClick.bind(this);
    this.setIndicationFilter = this.setIndicationFilter.bind(this);
    this.compareIndication = this.compareIndication.bind(this);
  }

  onClick(indication) {
    const { selectIndication, onClose } = this.props;
    const { study } = this.state;
    selectIndication(study.id, indication);
    onClose();
  }

  setIndicationFilter(event) {
    this.setState({
      indicationFilter: event.target.value,
    });
  }

  compareIndication(indication) {
    const { study: { indicationTags }, indicationFilter } = this.state;
    if (indicationFilter !== '') {
      const indicationName = _.toLower(indication.name);
      const lowerIndicationFilter = _.toLower(indicationFilter);
      if (!_.startsWith(indicationName, lowerIndicationFilter)) {
        return false;
      }
    }
    for (const currentIndication of indicationTags) {
      if (indication.id === currentIndication.id) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { indications } = this.props;
    const filteredIndications = indications.filter(this.compareIndication);

    return (
      <div className="select-indication-slide default-slide active">
        <div className="well jcf-list">
          <div className="search-holder">
            <Field
              type="search"
              name="search"
              id="indication-filter"
              component={Input}
              className="keyword-search"
              placeholder="Search"
              onChange={this.setIndicationFilter}
            />
            <label htmlFor="indication-filter" className="icomoon-icon_search2" />
          </div>
          <div className="jcf-overflow">
            <ul className="list-unstyled list select-indication">
              {filteredIndications.map(indication => (
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
