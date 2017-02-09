/**
*
* RewardForm
*
*/

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import ReactSelect from 'components/Input/ReactSelect';
import formValidator from './validator';

@reduxForm({ form: 'reward', validate: formValidator })
class RewardForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    siteLocations: PropTypes.array,
  };

  render() {
    const { currentUser, siteLocations } = this.props;
    const isAdmin = !currentUser.roleForClient.site_id;
    const nSiteLocation = siteLocations.map((s) => ((
      {
        label: s.name,
        value: s.id === 0 ? '0' : s.id,
      }
    )));
    return (
      <div>
        <Field
          name="site"
          component={ReactSelect}
          placeholder="Select Site Location"
          options={nSiteLocation}
          className="field"
          disabled={!isAdmin}
        />
      </div>
    );
  }
}

export default RewardForm;
