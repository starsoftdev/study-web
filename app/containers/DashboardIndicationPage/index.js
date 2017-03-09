/*
 *
 * DashboardIndicationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DashboardIndicationSearch } from './DashboardIndicationSearch/index';
import { DashboardIndicationTable } from './DashboardIndicationTable';
import { fetchIndications, fetchLevels, addLevel, addIndication } from './actions';
import { selectIndications, selectLevels, selectDashboardAddLevelProcess, selectDashboardAddIndicationProcess } from './selectors';

export class DashboardIndicationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fetchIndications: PropTypes.func,
    fetchLevels: PropTypes.func,
    indications: PropTypes.object,
    levels: PropTypes.object,
    addLevel: PropTypes.func,
    addIndication: PropTypes.func,
    addLevelProcess: PropTypes.object,
    addIndicationProcess: PropTypes.object,
  };

  componentWillMount() {
    this.props.fetchIndications();
    this.props.fetchLevels();
  }

  render() {
    const { indications, levels, addLevel, addIndication, addLevelProcess, addIndicationProcess } = this.props;
    return (
      <div className="container-fluid dashboard-indication">
        <h2 className="main-heading">Indication</h2>

        <DashboardIndicationSearch
          addLevel={addLevel}
          addIndication={addIndication}
          addLevelProcess={addLevelProcess}
          addIndicationProcess={addIndicationProcess}
          levels={levels}
        />
        <DashboardIndicationTable indications={indications} levels={levels} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  indications: selectIndications(),
  levels: selectLevels(),
  addLevelProcess: selectDashboardAddLevelProcess(),
  addIndicationProcess: selectDashboardAddIndicationProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchIndications: () => dispatch(fetchIndications()),
    fetchLevels: () => dispatch(fetchLevels()),
    addLevel: (payload) => dispatch(addLevel(payload)),
    addIndication: (payload) => dispatch(addIndication(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardIndicationPage);
