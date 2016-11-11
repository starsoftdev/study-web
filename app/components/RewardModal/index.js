/**
*
* RewardForm
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import { Modal } from 'react-bootstrap';
import RewardForm from 'components/RewardForm';
import RadioButton from 'components/Input/RadioButton';
import cardStudykik from 'assets/images/img6.png';
import cardAmazon from 'assets/images/img7.png';
import cardStarbucks from 'assets/images/img8.png';
import {
  selectSiteLocations,
} from 'containers/App/selectors';

import './style.less';

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
});

@reduxForm({ form: 'rewardForm' })
@connect(mapStateToProps, null)
class RewardModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    siteLocations: React.PropTypes.array,
    closeModal: React.PropTypes.func,
    redeemReward: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      card: 0,
    };

    this.selectCard = this.selectCard.bind(this);
  }

  selectCard() {
    this.setState({card: 0})
  }

  render() {
    return (
      <div>
        <Modal className="custom-modal reward-modal" id="select-reward-form" show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>SELECT REWARD</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="scroll-holder jcf--scrollable">
              <div className="form-lightbox">
                <div className="field-row full">
                  <div className="field">
                    <RewardForm
                      siteLocations={this.props.siteLocations}
                    />
                  </div>
                  <strong className="label"><label htmlFor="select-rewards" className="text-capitalize">Wayne Enterprise Has <strong>450 KIKs</strong></label></strong>
                </div>
                <div className="row images-area">
                  <div className="col-xs-4 pull-left">
                    <label htmlFor="radio-option3"><img src={cardStudykik} alt="" /></label>
                  </div>
                  <div className="col-xs-4 pull-left">
                    <label htmlFor="radio-option1"><img src={cardStarbucks} alt="" /></label>
                  </div>
                  <div className="col-xs-4 pull-left">
                    <label htmlFor="radio-option2"><img src={cardAmazon} alt="" /></label>
                  </div>
                </div>
                <ul className="list-unstyled list-radios">
                  <li>
                    <Field
                      name="rewards"
                      type="radio"
                      component={RadioButton}
                      className=""
                      value="0"
                      checked={this.state.card == "0"}
                    />
                    <span className="text">75 KIKs = $25 Starbucks Gift Card</span>
                  </li>
                  <li>
                    <Field
                      name="rewards"
                      type="radio"
                      component={RadioButton}
                      className=""
                      value="1"
                      checked={this.state.card == "1"}
                    />
                    <span className="text">225 KIKs = $75 Amazon Gift Card</span>
                  </li>
                  <li>
                    <Field
                      name="rewards"
                      type="radio"
                      component={RadioButton}
                      className=""
                      value="2"
                      checked={this.state.card == "2"}
                    />
                    <span className="text"> 1,559 KIKs = $1,559 StudyKIK Platinum Listing</span>
                  </li>
                </ul>
                <div className="btn-block text-right">
                  <a href="#" className="lightbox-close btn btn-primary">Redeem</a>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default RewardModal;
