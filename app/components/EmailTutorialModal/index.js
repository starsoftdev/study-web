/**
*
* RewardForm
*
*/

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

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
      this.setState({ step: Math.min(this.images.length - 1, step + 1) });
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
        onHide={this.props.closeModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>Email Tutorial</Modal.Title>
          <a className="lightbox-close close" onClick={this.props.closeModal}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-holder jcf--scrollable">
            <div className="image-area">
              <img src={this.images[this.state.step]} alt="" />
            </div>
          </div>
          <div className="form-lightbox">
            <div className="row">
              <div className="col-xs-6 text-left">
                { step > 0 && <a className="lightbox-close btn btn-primary" onClick={handlePrev}>Previous</a> }
              </div>
              <div className="col-xs-6 text-right">
                { step < this.images.length - 1 && <a className="lightbox-close btn btn-primary" onClick={handleNext}>Next</a> }
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EmailTutorialModal;
