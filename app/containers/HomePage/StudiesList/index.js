import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectStudies } from 'containers/HomePage/selectors';
import StudyItem from './StudyItem';
import './styles.less';

class StudiesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studies: PropTypes.object,
  };

  render() {
    const { studies } = this.props;
    const activeCount = 13;
    const inactiveCount = 11;
    const totalCount = 24;
    const studiesListContents = studies.details.map((item, index) => (
      <StudyItem {...item} key={index} index={index} />
    ));

    if (studies.details.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <caption>
                  <span className="pull-left">Study/Site Status</span>
                  <span className="pull-right">
                    <span className="inner-info">
                      <span className="info-label">ACTIVE</span>
                      <span className="info-value">{activeCount}</span>
                    </span>
                    <span className="inner-info">
                      <span className="info-label">INACTIVE</span>
                      <span className="info-value">{inactiveCount}</span>
                    </span>
                    <span className="inner-info">
                      <span className="info-label">TOTAL</span>
                      <span className="info-value">{totalCount}</span>
                    </span>
                  </span>
                </caption>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>INDICATION</th>
                    <th>LOCATION</th>
                    <th>SPONSOR</th>
                    <th>PROTOCOL</th>
                    <th>
                      <span className="icon-credit" data-original-title="Patient Messaging Suite"></span>
                    </th>
                    <th>STATUS</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {studiesListContents}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3>No studies found!</h3>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  studies: selectStudies(),
});

export default connect(mapStateToProps, null)(StudiesList);
