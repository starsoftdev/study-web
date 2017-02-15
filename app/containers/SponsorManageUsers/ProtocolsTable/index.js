import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LoadingSpinner from '../../../components/LoadingSpinner';
import { setActiveProtocolsSort } from '../actions';
import { selectPaginationOptionsProtocols, selectSearchSponsorsFormValues } from '../selectors';
import RowItem from './RowItem';

export class SponsorManageUsersProtocolsTable extends React.Component {
  static propTypes = {
    manageSponsorUsersData: PropTypes.object,
    editUser: PropTypes.func,
    deleteUser: PropTypes.func,
    paginationOptionsProtocols: PropTypes.object,
    setActiveProtocolsSort: PropTypes.func,
    searchFormValues: React.PropTypes.object,
    editProtocol: PropTypes.func,
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

    this.props.setActiveProtocolsSort(sort, direction);
  }

  render() {
    let studiesList = this.props.manageSponsorUsersData.studiesList;

    if (this.props.searchFormValues.protocol && this.props.searchFormValues.protocol !== 'all') {
      studiesList = _.filter(studiesList, (item) => (item.id === this.props.searchFormValues.protocol));
    }

    if (this.props.paginationOptionsProtocols.activeDirection && this.props.paginationOptionsProtocols.activeSort) {
      const dir = ((this.props.paginationOptionsProtocols.activeDirection === 'down') ? 'desc' : 'asc');

      studiesList = _.orderBy(studiesList, [(o) => {
        if (this.props.paginationOptionsProtocols.activeSort === 'indication') {
          return o.indication.name;
        } else if (this.props.paginationOptionsProtocols.activeSort === 'cros') {
          return o.cros[0] ? o.cros[0].name : null;
        }
        return o[this.props.paginationOptionsProtocols.activeSort];
      }], [dir]);
    }

    return (
      <div className="table-holder table-responsive">
        {(this.props.manageSponsorUsersData.fetching)
          ?
          <div className="text-center">
            <LoadingSpinner showOnlyIcon size={20} />
          </div>
          :
          <table className="table-manage-user alt table">
            <caption>PROTOCOLS</caption>
            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="protocolNumber" className={`col1 ${(this.props.paginationOptionsProtocols.activeSort === 'protocolNumber') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>PROTOCOL NUMBER<i className="caret-arrow"></i></th>
                <th onClick={this.sortBy} data-sort="indication" className={`col2 ${(this.props.paginationOptionsProtocols.activeSort === 'indication') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>INDICATION<i className="caret-arrow"></i></th>
                <th onClick={this.sortBy} data-sort="cros" className={`col3 ${(this.props.paginationOptionsProtocols.activeSort === 'cros') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>CRO<i className="caret-arrow"></i></th>
                <th onClick={this.sortBy} data-sort="irbName" className={`col4 ${(this.props.paginationOptionsProtocols.activeSort === 'irbName') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>IRB<i className="caret-arrow"></i></th>
                <th onClick={this.sortBy} data-sort="iwrs" className={`col5 ${(this.props.paginationOptionsProtocols.activeSort === 'iwrs') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>IWRS<i className="caret-arrow"></i></th>
                <th className="col6"></th>
                <th className="col7"></th>
              </tr>
            </thead>
            <tbody>
            {
              studiesList.map((item, index) => (
                <RowItem key={index} item={item} editProtocol={this.props.editProtocol} editUser={this.props.editUser} deleteUser={this.props.deleteUser} searchFormValues={this.props.searchFormValues} />
              ))
            }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  paginationOptionsProtocols: selectPaginationOptionsProtocols(),
  searchFormValues: selectSearchSponsorsFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    setActiveProtocolsSort: (sort, direction) => dispatch(setActiveProtocolsSort(sort, direction)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorManageUsersProtocolsTable);
