import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';

import studykikLogo from 'assets/images/logo.svg';
import userAvatar from 'assets/images/img-logged-user.png';
import AddCreditsModal from 'components/AddCreditsModal';

import NotificationBox from './NotificationBox';

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

  render() {
    return (
      <header id="header">
        <div className="container-fluid">
          <h1 className="logo pull-left"><a href="#"><img src={studykikLogo} width="214" height="31" alt="logo" /></a></h1>
          <NotificationBox currentUser={this.props.currentUser} />
          <div className="emails pull-left">
            <a href="#" className="opener" data-toggle="tooltip" data-placement="bottom" title="Coming Soon">
              <i className="icomoon-envelope" />
              <span className="counter">1</span>
            </a>
          </div>
          <div className="open-close help-drop pull-left">
            <a href="#" className="link-help pull-left opener">?</a>
          </div>
          <div className="get-credits pull-left">
            <i className="icomoon-credit margin-right-5px" />
            <span className="margin-right-5px">100 Credits</span>
            <a href="#" className="btn btn-default" onClick={this.showAddCreditsModal}>+ ADD CREDITS</a>
          </div>
          <div className="logged-user-area open-close pull-right">
            <Link to="/profile" className="opener">
              <div className="img-circle"><img src={userAvatar} width="43" height="43" alt="Bruce Wayne" /></div>
              <span className="text">Bruce Wayne</span>
              <i className="caret" />
            </Link>
          </div>
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
