import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import ReactTooltip from 'react-tooltip';

import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectCurrentUser } from '../../App/selectors';
import { setActiveSort, sortSuccess, addNewMessageForProtocol } from '../actions';
import { selectProtocols, selectPaginationOptions } from '../selectors';
import ProtocolItem from './ProtocolItem';
import {
  selectSocket,
} from '../../../containers/GlobalNotifications/selectors';
import pqsImage from '../../../assets/images/pqs.png';

class ProtocolsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    protocols: PropTypes.object,
    paginationOptions: React.PropTypes.object,
    setActiveSort: PropTypes.func,
    sortSuccess: PropTypes.func,
    socket: React.PropTypes.any,
    addNewMessageForProtocol: PropTypes.func,
    loadProtocols: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      socketBinded: false,
    };

    this.sortBy = this.sortBy.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  componentDidMount() {
    const defaultSort = 'protocolId';
    this.props.setActiveSort(defaultSort, null);
  }

  componentWillReceiveProps() {
    if (this.props.socket && this.state.socketBinded === false) {
      this.props.socket.on('notifyMessage', (newMessage) => {
        this.props.addNewMessageForProtocol(newMessage.study.protocolNumber);
      });
      this.setState({ socketBinded: true });
    }
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

    /* const dir = ((direction === 'down') ? 'desc' : 'asc');
    const sorted = _.orderBy(this.props.protocols.details, [function (o) {
      return o[(sort || defaultSort)];
    }], [dir]);
    this.props.sortSuccess(sorted); */
    this.props.loadProtocols(true, sort, direction);
  }

  loadItems() {
    this.props.loadProtocols(false);
  }

  renderProtocols() {
    const { protocols } = this.props;
    if (protocols.details || protocols.fetching) {
      return (
        <tbody>
          {
            protocols.details.map((item, index) => (
              <ProtocolItem
                {...item}
                key={index}
                index={index}
              />
            ))
          }
          {
            (protocols.fetching &&
              <tr>
                <td colSpan="8">
                  <LoadingSpinner showOnlyIcon={false} noMessage />
                </td>
              </tr>
            )
          }
        </tbody>
      );
    }
    return null;
  }

  render() {
    return (
      <section className="table-holder table-area fixed-table">
        <header className="fixed-table-head">
          <h2>STATUS</h2>
        </header>
        <div className="fixed-table-thead">
          <table className="table table-messaging-suite">
            <thead>
              <tr>
                <th className="default-cursor">#<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="protocolNumber" className={(this.props.paginationOptions.activeSort === 'protocolNumber') ? this.props.paginationOptions.activeDirection : ''}>PROTOCOL<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="indication" className={(this.props.paginationOptions.activeSort === 'indication') ? this.props.paginationOptions.activeDirection : ''}>INDICATION<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="croName" className={(this.props.paginationOptions.activeSort === 'croName') ? this.props.paginationOptions.activeDirection : ''}>CRO<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="unreadMessageCount" className={(this.props.paginationOptions.activeSort === 'croName') ? this.props.paginationOptions.activeDirection : ''}>
                  <img className="pqs-logo" src={pqsImage} alt="" data-for="pqs-logo" data-tip="Patient Qualification Suite" />
                  <ReactTooltip id="pqs-logo" type="info" class="tooltipClass wide" effect="solid" />
                </th>
                <th onClick={this.sortBy} data-sort="activeCount" className={(this.props.paginationOptions.activeSort === 'activeCount') ? this.props.paginationOptions.activeDirection : ''}>ACTIVE<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="inactiveCount" className={(this.props.paginationOptions.activeSort === 'inactiveCount') ? this.props.paginationOptions.activeDirection : ''}>INACTIVE<i className="caret-arrow" /></th>
                <th>&nbsp;</th>
              </tr>
            </thead>
          </table>
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={null}
        >
          <table className="table table-messaging-suite">
            {this.renderProtocols()}
          </table>
        </InfiniteScroll>
      </section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  protocols: selectProtocols(),
  paginationOptions: selectPaginationOptions(),
  socket: selectSocket(),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  sortSuccess: (payload) => dispatch(sortSuccess(payload)),
  addNewMessageForProtocol: (protocolNumber) => dispatch(addNewMessageForProtocol(protocolNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolsList);
