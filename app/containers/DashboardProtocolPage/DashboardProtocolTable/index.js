import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';
import _ from 'lodash';

export class DashboardProtocolTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    protocol: PropTypes.object,
    editProtocol: PropTypes.func,
    deleteProtocol: PropTypes.func,
    setActiveSort: PropTypes.func,
    editProtocolProcess: PropTypes.object,
    protocolSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';


    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);
  }

  render() {
    let protocol = this.props.protocol.details;

    if (this.props.protocolSearchFormValues.protocol) {
      protocol = _.filter(protocol, (item) => (item.id === this.props.protocolSearchFormValues.protocol));
    }

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      protocol = _.orderBy(protocol, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="number" className={`th ${(this.props.paginationOptions.activeSort === 'number') ? this.props.paginationOptions.activeDirection : ''}`}>Protocol<i className="caret-arrow"></i></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              protocol.map((item, index) => (
                <RowItem key={index} item={item} editProtocol={this.props.editProtocol} deleteProtocol={this.props.deleteProtocol} editProtocolProcess={this.props.editProtocolProcess} />
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
)(DashboardProtocolTable);
