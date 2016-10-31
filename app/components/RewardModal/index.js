/**
*6
* RewardForm
*
*/

import React from 'react';

import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import rewardFormValidator from './validator';
import { Modal } from 'react-bootstrap';
@reduxForm({ form: 'reward', validate: rewardFormValidator })
class RewardModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    redeemReward: React.PropTypes.func,
  };

  render() {
    return (
      <div>
        <Modal className="custom-modal reward-modal" id="select-reward" show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>SELECT REWARD</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="scroll-holder jcf--scrollable">
              <form action="#" className="form-lightbox" data-formvalidation="" data-submitpopupform="">
                <div className="field-row full">
                  <div className="field">
                    <select className="data-search" id="select-rewards">
                      <option>Select Site Location</option>
                      <option>option 1</option>
                      <option>option 2</option>
                      <option>option 3</option>
                      <option>option 4</option>
                      <option>option 5</option>
                    </select>
                  </div>
                  <strong className="label"><label htmlFor="select-rewards" className="text-capitalize">Wayne Enterprise Has <strong>450 KIKs</strong></label></strong>
                </div>
                <div className="row images-area">
                  <div className="col-xs-4 pull-left">
                    <label htmlFor="radio-option3"><img src="images/img6.png" alt="" /></label>
                  </div>
                  <div className="col-xs-4 pull-left">
                    <label htmlFor="radio-option1"><img src="images/img7.png" alt="" /></label>
                  </div>
                  <div className="col-xs-4 pull-left">
                    <label htmlFor="radio-option2"><img src="images/img8.png" alt="" /></label>
                  </div>
                </div>
                <ul className="list-unstyled list-radios">
                  <li>
                    <input type="radio" name="rewards" id="radio-option1" />
                    <span className="text">75 KIKs = $25 Starbucks Gift Card</span>
                  </li>
                  <li>
                    <input type="radio" name="rewards" id="radio-option2" />
                    <span className="text">225 KIKs = $75 Amazon Gift Card</span>
                  </li>
                  <li>
                    <input type="radio" name="rewards" id="radio-option3" />
                    <span className="text"> 1,559 KIKs = $1,559 StudyKIK Platinum Listing</span>
                  </li>
                </ul>
                <div className="btn-block text-right">
                  <a href="#" className="lightbox-close btn btn-primary">Redeem</a>
                </div>
              </form>

            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default RewardModal;
