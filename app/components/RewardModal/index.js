/**
*
* RewardForm
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal/index';
import ReactSelect from '../../components/Input/ReactSelect';
import RadioButton from '../../components/Input/RadioButton';
import cardStudykik from 'assets/images/img6.png';
import cardAmazon from 'assets/images/img8.png';
import cardStarbucks from 'assets/images/img7.png';

import {
  selectUserSiteLocations,
  selectCurrentUserClientId,
} from 'containers/App/selectors';

import validator from './validator';

const mapStateToProps = createStructuredSelector({
  siteLocations : selectUserSiteLocations(),
  currentUserClientId: selectCurrentUserClientId(),
});

@reduxForm({
  form: 'rewardForm',
  validate: validator,
})
@connect(mapStateToProps, null)
class RewardModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    siteLocations: React.PropTypes.array,
    closeModal: React.PropTypes.func,
    handleSubmit: React.PropTypes.func.isRequired,
    currentUserClientId: React.PropTypes.number,
    pickReward: React.PropTypes.pickReward,
  };

  constructor(props) {
    super(props);

    this.state = {
      card: 0,
    };

    this.selectCard = this.selectCard.bind(this);
  }

  selectCard(value) {
    const { pickReward } = this.props;
    pickReward(value);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Modal
          className="reward-modal"
          id="select-reward-form"
          dialogComponentClass={CenteredModal}
          show={this.props.showModal}
          onHide={this.props.closeModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>SELECT REWARD</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="scroll-holder jcf--scrollable">
              <div className="form-lightbox">
                <div className="field-row full">
                  <div className="field">
                    <Field
                      name="site"
                      component={ReactSelect}
                      placeholder="Select Site Location"
                      options={this.props.siteLocations}
                      className="field"
                    />
                  </div>
                  <strong className="label"><label htmlFor="select-rewards" className="text-capitalize">Wayne Enterprise Has <strong>450 KIKs</strong></label></strong>
                </div>
                <div className="row images-area">
                  <div className="col-xs-4 pull-left">
                    <label htmlFor="radio-option1" onClick={() => { this.selectCard('1'); }}><img src={cardStarbucks} alt="" /></label>
                  </div>
                  <div className="col-xs-4 pull-left">
                    <label htmlFor="radio-option2" onClick={() => { this.selectCard('2'); }}><img src={cardAmazon} alt="" /></label>
                  </div>
                  <div className="col-xs-4 pull-left">
                    <label htmlFor="radio-option3" onClick={() => { this.selectCard('3'); }}><img src={cardStudykik} alt="" /></label>
                  </div>
                </div>
                <ul className="list-unstyled list-radios">
                  <li>
                    <Field
                      name="redemption_type"
                      type="radio"
                      component={RadioButton}
                      className=""
                      value="1"
                      checked={this.state.card === '1'}
                    />
                    <div className="text">75 KIKs = $25 Starbucks Gift Card</div>
                  </li>
                  <li>
                    <Field
                      name="redemption_type"
                      type="radio"
                      component={RadioButton}
                      className=""
                      value="2"
                      checked={this.state.card === '2'}
                    />
                    <div className="text">225 KIKs = $75 Amazon Gift Card</div>
                  </li>
                  <li>
                    <Field
                      name="redemption_type"
                      type="radio"
                      component={RadioButton}
                      className=""
                      value="3"
                      checked={this.state.card === '3'}
                    />
                    <div className="text"> 1,559 KIKs = $1,559 StudyKIK Platinum Listing</div>
                  </li>
                </ul>
                <div className="btn-block text-right">
                  <a className="lightbox-close btn btn-primary" onClick={handleSubmit}>Redeem</a>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

export default RewardModal;
