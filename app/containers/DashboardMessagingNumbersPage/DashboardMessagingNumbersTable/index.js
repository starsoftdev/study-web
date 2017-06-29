import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';

export class DashboardMessagingNumbersTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    messagingNumber: PropTypes.object,
    editMessagingNumber: PropTypes.func,
    deleteMessagingNumber: PropTypes.func,
    setActiveSort: PropTypes.func,
    editMessagingNumberProcess: PropTypes.object,
    MessagingNumberSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.editMessagingNumber = this.editMessagingNumber.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'noteData';
    this.props.setActiveSort(defaultSort, null);
  }

  editMessagingNumber(params) {
    this.props.editMessagingNumber(params);
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
    let messagingNumbers = this.props.messagingNumber.details;
    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      messagingNumbers = _.orderBy(messagingNumbers, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="noteData" className={`th ${(this.props.paginationOptions.activeSort === 'noteData') ? this.props.paginationOptions.activeDirection : ''}`}>Messaging Number<i className="caret-arrow" /></th>
              <th>Location <i className="caret-arrow" /></th>
              <th>Friendly Name <i className="caret-arrow" /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              messagingNumbers.map((item, index) => (
                <RowItem
                  key={index}
                  item={item}
                  editMessagingNumber={this.editMessagingNumber}
                  deleteMessagingNumber={this.props.deleteMessagingNumber}
                  editMessagingNumberProcess={this.props.editMessagingNumberProcess}
                />
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
)(DashboardMessagingNumbersTable);
