/**
*
* RewardForm
*
*/

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import classnames from 'classnames';
import _ from 'lodash';

import CenteredModal from '../../components/CenteredModal/index';
import img1 from '../../assets/images/email_tutorial_1.png';
import img2 from '../../assets/images/email_tutorial_2.png';
import img3 from '../../assets/images/email_tutorial_3.png';
import img4 from '../../assets/images/email_tutorial_4.png';
import img5 from '../../assets/images/email_tutorial_5.png';
import img6 from '../../assets/images/email_tutorial_6.png';
import img7 from '../../assets/images/email_tutorial_7.png';

class EmailTutorialModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: React.PropTypes.object,
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };

    this.images = [img1, img2, img3, img4, img5, img6, img7];
  }

  render() {
    const { step } = this.state;
    const handleNext = () => {
      if (step < this.images.length - 1) {
        this.setState({ step: Math.min(this.images.length - 1, step + 1) });
      } else {
        this.props.closeModal();
      }
    };

    const handlePrev = () => {
      this.setState({ step: Math.max(0, step - 1) });
    };

    return (
      <Modal
        className="email-tutorial-modal"
        id="email-tutorial-modal"
        dialogComponentClass={CenteredModal}
        show={this.props.showModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>Email Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-holder jcf--scrollable">
            <div className="image-area">
              <img src={this.images[this.state.step]} alt="" />
            </div>
          </div>
          <div className="form-lightbox">
            <div className="row">
              <div className="col-xs-4 text-left">
                { step > 0 && <a className="lightbox-close btn btn-gray-outline" onClick={handlePrev}>Previous</a> }
              </div>
              <div className="col-xs-4 text-center dotnav">
                <ul className="dotnav-dots">
                  {
                    _.map(this.images, (v, i) => (<li key={i} className={classnames('dotnav-dot', { 'dotnav-dot_active': step === i })}></li>)
                    )
                  }
                </ul>
              </div>
              <div className="col-xs-4 text-right">
                <a className="lightbox-close btn btn-primary" onClick={handleNext}>{ step < this.images.length - 1 ? 'Next' : 'Finish'}</a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EmailTutorialModal;
