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
import { find } from 'lodash';
import { translate } from '../../../common/utilities/localization';

import CenteredModal from '../../components/CenteredModal/index';
import ReactSelect from '../../components/Input/ReactSelect';
import RadioButton from '../../components/Input/RadioButton';
import cardStudykik from '../../assets/images/img6.png';
import cardAmazon from '../../assets/images/img8.png';
import cardStarbucks from '../../assets/images/img7.png';

import {
  fetchRewardsBalance,
} from '../../containers/App/actions';

import {
  selectCurrentUserClientId,
  selectSites,
  selectRewardsBalance,
} from '../../containers/App/selectors';

import { selectSiteId } from './selectors';

import validator from './validator';

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  sites: selectSites(),
  selectedSite: selectSiteId(),
  rewardsBalance: selectRewardsBalance(),
});
const mapDispatchToProps = {
  fetchRewardsBalance,
};

@reduxForm({
  form: 'rewardForm',
  validate: validator,
})
@connect(mapStateToProps, mapDispatchToProps)
class RewardModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: React.PropTypes.object,
    showModal: React.PropTypes.bool,
    siteLocations: React.PropTypes.array,
    closeModal: React.PropTypes.func,
    handleSubmit: React.PropTypes.func.isRequired,
    currentUserClientId: React.PropTypes.number,
    pickReward: React.PropTypes.func,
    sites: React.PropTypes.array,
    selectedSite: React.PropTypes.number,
    rewardsBalance: React.PropTypes.object,
    fetchRewardsBalance: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      card: 0,
    };

    this.selectCard = this.selectCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedSite, fetchRewardsBalance, currentUser } = nextProps;

    if (this.props.selectedSite !== selectedSite) {
      if (typeof (selectedSite) === 'number') {
        fetchRewardsBalance(currentUser.roleForClient.client_id, selectedSite);
      }
    }
  }

  selectCard(value) {
    const { pickReward } = this.props;
    pickReward(value);
  }

  renderHeaderText() {
    const { selectedSite, rewardsBalance } = this.props;

    if (selectedSite && selectedSite !== '0') {
      const siteDetail = find(this.props.sites, { id: selectedSite });
      return (
        <label
          htmlFor="select-rewards" className="text-capitalize"
          dangerouslySetInnerHTML={{ __html: translate('portals.component.rewardModal.hasKIKs', { site: siteDetail.name, total: `${rewardsBalance[selectedSite]}` }) }}
        />
      );
    }

    return (
      <label htmlFor="select-rewards" className="text-capitalize">
        <strong>
          {rewardsBalance[0]} {translate('portals.component.rewardModal.totalKIKs')}
        </strong>
      </label>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form>
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
            <Modal.Title>{translate('portals.component.rewardModal.modalTitle')}</Modal.Title>
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
                      name="siteId"
                      component={ReactSelect}
                      placeholder={translate('portals.component.rewardModal.sitePlaceholder')}
                      options={this.props.siteLocations}
                      className="field"
                    />
                  </div>
                  <strong className="label">
                    { this.renderHeaderText() }
                  </strong>
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
                    <label>
                      <Field
                        name="redemptionType"
                        type="radio"
                        component={RadioButton}
                        className=""
                        value="1"
                        checked={this.state.card === '1'}
                      />
                      <div className="text">{translate('portals.component.rewardModal.KIKsOption1')}</div>
                    </label>
                  </li>
                  <li>
                    <label>
                      <Field
                        name="redemptionType"
                        type="radio"
                        component={RadioButton}
                        className=""
                        value="2"
                        checked={this.state.card === '2'}
                      />
                      <div className="text">{translate('portals.component.rewardModal.KIKsOption2')}</div>
                    </label>
                  </li>
                  <li>
                    <label>
                      <Field
                        name="redemptionType"
                        type="radio"
                        component={RadioButton}
                        className=""
                        value="3"
                        checked={this.state.card === '3'}
                      />
                      <div className="text">{translate('portals.component.rewardModal.KIKsOption3')}</div>
                    </label>
                  </li>
                </ul>
                <div className="btn-block text-right">
                  <a className="lightbox-close btn btn-primary" onClick={handleSubmit}>{translate('portals.component.rewardModal.redeemBtn')}</a>
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
