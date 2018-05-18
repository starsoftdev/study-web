import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';

import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectCurrentUser } from '../../App/selectors';
import { setActiveSort, sortSuccess, addNewMessageForProtocol } from '../actions';
import { selectProtocols, selectPaginationOptions } from '../selectors';
import ProtocolItem from './ProtocolItem';
import {
  selectSocket,
} from '../../../containers/GlobalNotifications/selectors';

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
    this.props.loadProtocols(true, sort, direction);
  }

  loadItems() {
    this.props.loadProtocols(false);
  }

  renderProtocols() {
    const { protocols } = this.props;
    if (protocols.details || protocols.fetching) {
      return (
        <div>
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
              <div>
                <LoadingSpinner showOnlyIcon={false} noMessage />
              </div>
            )
          }
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <section className="">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={null}
        >
          {this.renderProtocols()}
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
