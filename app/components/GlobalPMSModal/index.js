/**
*
* Global Patient Message Suite
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from 'containers/App/selectors';
import defaultUserImage from 'assets/images/Default-User-Img.png';
import defaultUserImageGirl from 'assets/images/Default-User-Img-Girl.png';
import defaultDoctorImage from 'assets/images/Default-User-Img-Dr.png';
import './styles.less';

class GlobalPMSModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: React.PropTypes.object,
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      credits: 100,
      price: `$ ${77}`,
    };
  }

  render() {
    return (
      <div>
        <Modal className="custom-modal global-pms" id="chart-popup" show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>PATIENT MESSAGING SUITE</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <aside className="aside-chat">
                <div className="scroll-holder">
                  <div className="custom-select-drop">
                    <div className="search-holder">
                      <input className="form-control keyword-search" type="search" placeholder="Search" />
                      <i className="icon-icon_search2"></i>
                    </div>
                  </div>
                  <ul className="tabset list-unstyled">
                    <li className="active">
                      <a href="#chat-room1" className="tab-opener">
                        <div className="user-img">
                          <img src={defaultUserImage} alt="" />
                        </div>
                        <strong className="name">alan walker</strong>
                        <p>moved Thomas Morgan from New Patient to Consented.</p>
                        <time>05/16/16 at 11:31 PM <span className="counter-circle">2</span></time>
                      </a>
                    </li>
                    <li>
                      <a href="#chat-room2" className="tab-opener">
                        <div className="user-img"><img src={defaultUserImageGirl} alt="" /></div>
                        <strong className="name">penny worth</strong>
                        <p>listed a new Birth Control Study.</p>
                        <time>05/16/16 at 11:30 PM <span className="counter-circle">4</span></time>
                      </a>
                    </li>
                    <li>
                      <a href="#chat-room3" className="tab-opener">
                        <div className="user-img"><img src={defaultUserImage} alt="" /></div>
                        <strong className="name">Oliver Queen </strong>
                        <p>sent a text message to Thomas Morgan</p>
                        <time>05/16/16 at 9:30 PM <span className="counter-circle">1</span></time>
                      </a>
                    </li>
                    <li>
                      <a href="#chat-room4" className="tab-opener">
                        <div className="user-img"><img src={defaultUserImage} alt="" /></div>
                        <strong className="name">Alan Jensen</strong>
                        <p>moved Thomas Morgan from New Patient to Consented.</p>
                        <time>05/16/16 at 11:31 PM <span className="counter-circle"></span></time>
                      </a>
                    </li>
                    <li>
                      <a href="#chat-room5" className="tab-opener">
                        <div className="user-img"><img src={defaultUserImage} alt="" /></div>
                        <strong className="name">Eugene Simpson</strong>
                        <p>listed a new Birth Control Study.</p>
                        <time>05/16/16 at 11:30 PM <span className="counter-circle">2</span></time>
                      </a>
                    </li>
                    <li>
                      <a href="#chat-room6" className="tab-opener">
                        <div className="user-img"><img src={defaultUserImageGirl} alt="" /></div>
                        <strong className="name">Katy Perry</strong>
                        <p>listed a new Birth Control Study.</p>
                        <time>05/16/16 at 11:30 PM <span className="counter-circle">2</span></time>
                      </a>
                    </li>
                    <li>
                      <a href="#chat-room7" className="tab-opener">
                        <div className="user-img"><img src={defaultUserImage} alt="" /></div>
                        <strong className="name">Hamish  Labatt</strong>
                        <p>listed a new Birth Control Study.</p>
                        <time>05/16/16 at 11:30 PM <span className="counter-circle">2</span></time>
                      </a>
                    </li>
                    <li>
                      <a href="#chat-room8" className="tab-opener">
                        <div className="user-img"><img src={defaultUserImage} alt="" /></div>
                        <strong className="name">Thomas Morgan</strong>
                        <p>listed a new Birth Control Study.</p>
                        <time>05/16/16 at 11:30 PM <span className="counter-circle">2</span></time>
                      </a>
                    </li>
                  </ul>
                </div>
              </aside>
              <div className="chatroom">
                <section className="chat-area" id="chat-room1">
                  <header>
                    <strong className="name">alan walker</strong>
                    <a href="#"><span className="protocol">protocol: YM12345</span></a>
                  </header>
                  <div className="scroll-holder">
                    <article className="post-msg">
                      <div className="post-holder" data-post="1">
                        <div className="img-holder"><img alt="" src={defaultUserImage} /></div>
                        <div className="post-content">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet.</p>
                        </div>
                        <strong className="email">Alan Walker</strong>
                        <time >07/28/16 at 09:35 AM</time>
                      </div>
                      <div className="post-holder even" data-post="1-1">
                        <div className="img-holder"><img alt="" src={this.props.currentUser.profileImageURL || defaultDoctorImage} /></div>
                        <div className="post-content">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                        </div>
                        <strong className="email">Bruce Wayne</strong>
                        <time >07/28/16 at 09:38 AM</time>
                      </div>
                    </article>
                    <article className="post-msg">
                      <div className="post-holder" data-post="2">
                        <div className="img-holder"><img alt="" src={defaultUserImage} /></div>
                        <div className="post-content">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet.</p>
                        </div>
                        <strong className="email">Alan Walker</strong>
                        <time >07/28/16 at 10:13 AM</time>
                      </div>
                      <div className="post-holder even" data-post="2-2">
                        <div className="img-holder"><img alt="" src={this.props.currentUser.profileImageURL || defaultDoctorImage} /></div>
                        <div className="post-content">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                        </div>
                        <strong className="email">Bruce Wayne</strong>
                        <time >07/28/16 at 10:25 AM</time>
                      </div>
                    </article>
                    <article className="post-msg">
                      <div className="post-holder" data-post="3">
                        <div className="img-holder"><img alt="" src={defaultUserImage} /></div>
                        <div className="post-content">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet.</p>
                        </div>
                        <strong className="email">Alan Walker</strong>
                        <time >07/28/16 at 10:38 AM</time>
                      </div>
                      <div className="post-holder even" data-post="3-2">
                        <div className="img-holder"><img alt="" src={this.props.currentUser.profileImageURL || defaultDoctorImage} /></div>
                        <div className="post-content">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                        </div>
                        <strong className="email">Bruce Wayne</strong>
                        <time >07/28/16 at 10:42 AM</time>
                      </div>
                    </article>
                    <article className="post-msg">
                      <div className="post-holder" data-post="4">
                        <div className="img-holder"><img alt="" src={defaultUserImage} /></div>
                        <div className="post-content">
                          <p>consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet.</p>
                        </div>
                        <strong className="email">Alan Walker</strong>
                        <time >07/28/16 at 10:50 AM</time>
                      </div>
                      <div className="post-holder even" data-post="4-2">
                        <div className="img-holder"><img alt="" src={this.props.currentUser.profileImageURL || defaultDoctorImage} /></div>
                        <div className="post-content">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                        </div>
                        <strong className="email">Bruce Wayne</strong>
                        <time >07/28/16 at 10:56 AM</time>
                      </div>
                    </article>
                  </div>
                  <footer>
                    <textarea className="form-control" placeholder="Type a message..."></textarea>
                    <button type="button" className="btn btn-default">Send</button>
                  </footer>
                </section>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

// function mapDispatchToProps(dispatch) {
//   return {
//     // addCredits: (customerId, data) => dispatch(addCredits(customerId, data)),
//   };
// }

export default connect(mapStateToProps)(GlobalPMSModal);
