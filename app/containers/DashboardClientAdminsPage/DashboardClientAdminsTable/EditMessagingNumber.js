import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import ReactSelect from '../../../components/Input/ReactSelect';
import LoadingSpinner from '../../../components/LoadingSpinner';

@reduxForm({ form: 'dashboardEditMessagingNumberForm' })

export class EditMessagingNumberForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    clientSites: PropTypes.array,
    phoneNumber: PropTypes.object,
    messagingNumberOptions: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      vSelected: false,
    };

    this.messagingNumberChange = this.messagingNumberChange.bind(this);
  }

  messagingNumberChange(e) {
    console.log('----------', e);
  }

  render() {
    // const messagingNumberOptions = [{ label: '(524) 999-1234', value: 1 }, { label: '(524) 999-1234', value: 2 }, { label: '(524) 999-1234', value: 3 }];

    const filteredSites = this.props.clientSites.map((item) => (
      !this.state.vSelected
        ? <div key={item.id} className="field-row no-margins">
          <strong className="label">
            <label className="add-exposure-level">{item.name}</label>
          </strong>
          <div className="field">
            <Field
              name={`site-${item.id}`}
              component={ReactSelect}
              placeholder="Select Messaging Number"
              options={this.props.messagingNumberOptions}
              onChange={this.messagingNumberChange}
            />
          </div>
        </div>
        : <div key={item.id} className="field-row no-margins">
          <strong className="label">
            <label className="add-exposure-level">{item.name}</label>
          </strong>
          <div className="field">
            <Field
              name={`site-${item.id}`}
              component={ReactSelect}
              placeholder="Select Messaging Number"
              options={this.props.messagingNumberOptions}
              onChange={this.messagingNumberChange}
            />
          </div>
        </div>
    ));

    return (
      <form action="#" className="form-lightbox dashboard-lightbox" onSubmit={this.props.handleSubmit}>

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
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMessagingNumberForm);
