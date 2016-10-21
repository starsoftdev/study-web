import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import studykikLogo from 'assets/images/logo.svg';
import AddCreditsModal from 'components/AddCreditsModal';

import NotificationBox from './NotificationBox';
import AvatarMenu from './AvatarMenu';

import {
  selectCurrentUser,
} from 'containers/App/selectors';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = {
};

@connect(mapStateToProps, mapDispatchToProps)
class TopHeaderBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.showAddCreditsModal = this.showAddCreditsModal.bind(this);
    this.closeAddCreditsModal = this.closeAddCreditsModal.bind(this);

    this.state = {
      showAddCreditsModal: false,
    };
  }

  componentDidMount() {
    const { currentUser } = this.props;

    if (!currentUser) {
      console.error('Something is wrong with session');
      return;
    }
  }

  showAddCreditsModal() {
    this.setState({ showAddCreditsModal: true });
  }

  closeAddCreditsModal() {
    this.setState({ showAddCreditsModal: false });
  }

  handleLogoutClick = () => {
    console.log('logout');
  }

  render() {
    return (
      <header id="header">
        <div className="container-fluid">

          <h1 className="logo pull-left"><a href="#"><img src={studykikLogo} width="214" height="31" alt="logo" /></a></h1>

          <NotificationBox currentUser={this.props.currentUser} />

          <div className="emails pull-left">
            <a href="#" className="opener" data-toggle="tooltip" data-placement="bottom" title="Coming Soon">
              <i className="icon-envelop" />
              <span className="counter">1</span>
            </a>
          </div>

          <div className="open-close help-drop pull-left">
            <a href="#" className="link-help pull-left opener">?</a>
          </div>

          <a href="#chat-popup" className="lightbox-opener pull-left btn-chat-popup">
            <span className="counter">3</span>
            <i className="icon-credit"></i>
          </a>

          <div className="get-credits pull-left">
            <span style={{ marginRight: '5px' }}>100 Credits</span>
            <a href="#" className="btn btn-default" onClick={this.showAddCreditsModal}>+ ADD CREDITS</a>
          </div>

          <AvatarMenu handleLogoutClick={this.handleLogoutClick} />

        </div>
        <AddCreditsModal
          showModal={this.state.showAddCreditsModal}
          closeModal={this.closeAddCreditsModal}
        />
      </header>
    );
  }
}

export default TopHeaderBar;
