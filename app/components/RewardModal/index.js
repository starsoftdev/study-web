/**
*6
* RewardForm
*
*/

import React from 'react';

import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import rewardFormValidator from './validator';

@reduxForm({ form: 'reward', validate: rewardFormValidator })
class RewardModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    addCreditCard: React.PropTypes.func,
  };

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default RewardModal;
