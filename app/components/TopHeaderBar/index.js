import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import studykikLogo from 'assets/images/logo.svg';
import userAvatar from 'assets/images/img-logged-user.png';
import avatar1 from 'assets/images/img2.png';
import avatar2 from 'assets/images/img3.png';
import avatar3 from 'assets/images/img4.png';
import AddCreditsModal from 'components/AddCreditsModal';

const mapDispatchToProps = {
};

@connect(null, mapDispatchToProps)
class TopHeaderBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.showAddCreditsModal = this.showAddCreditsModal.bind(this);
    this.closeAddCreditsModal = this.closeAddCreditsModal.bind(this);

    this.state = {
      showAddCreditsModal: false,
    };
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

          <div className="notifications pull-left">
            <a className="opener" role="button" data-toggle="collapse" href="#notifications-drop" aria-expanded="false" aria-controls="notifications-drop">
              <i className="icon-bell" />
              <span className="counter">1</span>
            </a>
            <div className="collapse" id="notifications-drop">
              <div className="well">
                <strong className="title">NOTIFICATIONS</strong>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">
                      <div className="img-circle">
                        <img src={avatar1} width="43" height="43" alt="alan_walker" />
                      </div>
                      <p><strong>alan_walker</strong> moved Thomas Morgan from New Patient to Consented.</p>
                      <time dateTime="2016-05-16">05/16/16 at 11:31pm</time>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="img-circle">
                        <img src={avatar2} width="43" height="43" alt="penny_worth" />
                      </div>
                      <p><strong>penny_worth</strong> listed a new Birth Control Study.</p>
                      <time dateTime="2016-05-16">05/16/16 at 11:30pm</time>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="img-circle">
                        <img src={avatar3} width="43" height="43" alt="arrow_island" />
                      </div>
                      <p><strong>arrow_island</strong> sent a text message to Thomas Morgan</p>
                      <time dateTime="2016-05-16">05/16/16 at 9:30pm</time>
                    </a>
                  </li>
                </ul>
                <div className="btn-block text-center">
                  <a href="#">See All</a>
                </div>
              </div>
            </div>
          </div>

          <div className="emails pull-left">
            <a href="#" className="opener" data-toggle="tooltip" data-placement="bottom" title="Coming Soon">
              <i className="icon-envelop" />
              <span className="counter">1</span>
            </a>
          </div>

          <div className="open-close help-drop pull-left">
            <a href="#" className="link-help pull-left opener">?</a>
          </div>


          <div className="get-credits pull-left">
            <i className="icon-credit margin-right-5px" />
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
