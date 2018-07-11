import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, blur, change } from 'redux-form';
import ReactSelect from '../../../components/Input/ReactSelect';
import Input from '../../../components/Input';

import LoadingSpinner from '../../../components/LoadingSpinner';
import { normalizePhoneDisplay } from '../../../common/helper/functions';
import formValidator from './validator';

@reduxForm({ form: 'dashboardEditMessagingNumberForm', validate: formValidator })

export class EditMessagingNumberForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    clientSites: PropTypes.object,
    phoneNumber: PropTypes.object,
    messagingNumberOptions: PropTypes.array,
    addMessagingNumberClick: PropTypes.func,
    blur: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      vSelected: null,
    };

    this.messagingNumberChange = this.messagingNumberChange.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
  }

  componentWillMount() {
    if (this.props.clientSites) {
      const selectedSites = this.props.clientSites.details.map((item) => (
        item.twilio_number_id
      ));
      this.setState({
        vSelected: selectedSites,
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.clientSites.fetching && !newProps.clientSites.fetching && newProps.clientSites.error === null) {
      _.forEach((newProps.clientSites.details), (item) => {
        this.props.change(`site-phoneNumber-${item.id}`, (item.phoneNumber ? normalizePhoneDisplay(item.phoneNumber) : null));
        this.props.change(`site-${item.id}`, (item.twilioNumber ? item.twilioNumber.id : null));
      });
    }
  }

  onPhoneBlur(event, name) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur(name, formattedPhoneNumber);
  }

  messagingNumberChange(e, index) {
    if (e === -1) {
      this.props.addMessagingNumberClick();
    } else {
      const selectedSites = this.state.vSelected;
      selectedSites[index] = e;
      this.setState({
        vSelected: selectedSites,
      });
    }
  }

  render() {
    // const messagingNumberOptions = [{ label: '(524) 999-1234', value: 1 }, { label: '(524) 999-1234', value: 2 }, { label: '(524) 999-1234', value: 3 }];
    let filteredSites = <div className="text-center"><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></div>;
    if (this.props.clientSites) {
      filteredSites = this.props.clientSites.details.map((item, index) => (
        <div className="messaging-number-row" key={item.id}>
          <div className="field-row">
            <strong className="label">
              <label className="messaging-number">{item.name}</label>
            </strong>
            <div className="field">
              <Field
                name={`site-${item.id}`}
                component={ReactSelect}
                placeholder="Select Messaging Number"
                options={this.props.messagingNumberOptions}
                onChange={(e) => this.messagingNumberChange(e, index)}
                onBlur={() => {}}
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">
              <label className="site-phone" />
            </strong>
            <div className="field">
              <Field
                name={`site-phoneNumber-${item.id}`}
                component={Input}
                onBlur={(e) => { this.onPhoneBlur(e, `site-phoneNumber-${item.id}`); }}
              />
            </div>
          </div>
        </div>
      ));
    }

    return (
      <form className="form-lightbox dashboard-lightbox" onSubmit={this.props.handleSubmit}>

        {filteredSites}

        <div className="field-row text-right no-margins">
          <button type="submit" className="btn btn-primary">
            {this.props.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>Update</span>
            }
          </button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur('dashboardEditMessagingNumberForm', field, value)),
  change: (name, value) => dispatch(change('dashboardEditMessagingNumberForm', name, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMessagingNumberForm);
