import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';
import _ from 'lodash';

export class DashboardIndicationTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    indications: PropTypes.object,
    levels: PropTypes.object,
    editIndication: PropTypes.func,
    deleteIndication: PropTypes.func,
    addIndicationProcess: PropTypes.object,
    indicationSearchFormValues: PropTypes.object,
  }

  componentDidMount() {
  }

  render() {
    const { indications, levels } = this.props;
    let indication = indications.details;
    if (this.props.indicationSearchFormValues.indication) {
      indication = _.filter(indication, (item) => (item.id === this.props.indicationSearchFormValues.indication));
    }
    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th>Indication<i className="caret-arrow"></i></th>
              <th>TIER <i className="caret-arrow"></i></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              indication.map((item, index) => (
                <RowItem key={index} item={item} levels={levels} editIndication={this.props.editIndication} deleteIndication={this.props.deleteIndication} addIndicationProcess={this.props.addIndicationProcess} />
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardIndicationTable);
