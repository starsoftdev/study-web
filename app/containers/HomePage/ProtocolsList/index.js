import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import _, { countBy, find, filter, sumBy } from 'lodash';
import { touch } from 'redux-form';

import CenteredModal from '../../../components/CenteredModal/index';
import { selectCurrentUser } from 'containers/App/selectors';
import { setActiveSort, sortSuccess } from 'containers/HomePage/actions'
import { selectProtocols, selectPaginationOptions } from 'containers/HomePage/selectors';
import ProtocolItem from './ProtocolItem';

class ProtocolsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    protocols: PropTypes.object,
    paginationOptions: React.PropTypes.object,
    setActiveSort: PropTypes.func,
    sortSuccess: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
    };

    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(newProps) {
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';
    const defaultSort = 'orderNumber';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);

    const dir = ((direction === 'down') ? 'desc' : 'asc');
    const sorted = _.orderBy(this.props.protocols.details, [function (o) {
      return o[(sort || defaultSort)];
    }], [dir]);
    this.props.sortSuccess(sorted);
  }

  render() {
    const { protocols, sitePatients } = this.props;
    const countResult = countBy(protocols.details, entityIterator => entityIterator.status);
    const totalCount = protocols.details.length;
    const ProtocolsListContents = protocols.details.map((item, index) => {
      return (
        <ProtocolItem
          {...item}
          key={index}
          index={index}
        />
      );
    });

    return (
      <section className="table-holder table-area fixed-table">
        <header className="fixed-table-head">
          <h2>STATUS</h2>
        </header>
        <div className="fixed-table-thead">
          <table className="table table-messaging-suite">
            <thead>
              <tr>
                <th>#<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="protocolNumber" className={(this.props.paginationOptions.activeSort === 'protocolNumber') ? this.props.paginationOptions.activeDirection : ''}>PROTOCOL<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="indication" className={(this.props.paginationOptions.activeSort === 'indication') ? this.props.paginationOptions.activeDirection : ''}>INDICATION<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="croName" className={(this.props.paginationOptions.activeSort === 'croName') ? this.props.paginationOptions.activeDirection : ''}>CRO<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="unreadMessageCount" className={(this.props.paginationOptions.activeSort === 'unreadMessageCount') ? this.props.paginationOptions.activeDirection : ''}>
                  <span className="icomoon-credit" data-original-title="Patient Messaging Suite" />
                  <i className="caret-arrow" />
                </th>
                <th onClick={this.sortBy} data-sort="activeCount" className={(this.props.paginationOptions.activeSort === 'activeCount') ? this.props.paginationOptions.activeDirection : ''}>ACTIVE<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="inactiveCount" className={(this.props.paginationOptions.activeSort === 'inactiveCount') ? this.props.paginationOptions.activeDirection : ''}>INACTIVE<i className="caret-arrow" /></th>
                <th>&nbsp;</th>
              </tr>
            </thead>
          </table>
        </div>
        <table className="table table-messaging-suite">
          <tbody>
            {ProtocolsListContents}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  protocols: selectProtocols(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps  (dispatch) {
  return {
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    sortSuccess: (payload) => dispatch(sortSuccess(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolsList);
