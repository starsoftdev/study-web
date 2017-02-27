import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import ReactSelect from '../../../components/Input/ReactSelect';
import { submitToClientPortal, submitToSponsorsPortal } from '../actions';

import _ from 'lodash';

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    submitToClientPortal: (id) => dispatch(submitToClientPortal(id)),
    submitToSponsorsPortal: (id) => dispatch(submitToSponsorsPortal(id)),
  };
}


@reduxForm({ form: 'dashboardPortalsForm' })
@connect(mapStateToProps, mapDispatchToProps)

export class DashboardPortalsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    clients: PropTypes.object,
    sponsors: PropTypes.object,
    formValues: PropTypes.object,
    submitToClientPortal: PropTypes.func,
    submitToSponsorsPortal: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.submitClient = this.submitClient.bind(this);
    this.submitSponsor = this.submitSponsor.bind(this);
  }

  submitSponsor() {
    if (this.props.formValues.sponsor) {
      this.props.submitToSponsorsPortal(this.props.formValues.sponsor);
    }
  }

  submitClient() {
    if (this.props.formValues.client) {
      this.props.submitToClientPortal(this.props.formValues.client);
    }
  }

  render() {
    const clientsOptions = [];
    _.forEach(this.props.clients.details, (item) => {
      clientsOptions.push(
        {
          label: `${item.name}`,
          value: item.user_id,
        }
      );
    });
    const sponsorsOptions = [];
    _.forEach(this.props.sponsors.details, (item) => {
      sponsorsOptions.push(
        {
          label: `${item.name}`,
          value: item.user_id,
        }
      );
    });

    return (
      <form className="form-search selects-form clearfix">
        <div className="fields-holder row">
          <div className="pull-left col custom-select first-custom-select">
            <Field
              name="client"
              component={ReactSelect}
              placeholder="Select Client"
              options={clientsOptions}
            />
          </div>
          <div className="pull-left col">
            <a className="btn btn-default" onClick={this.submitClient}>Submit</a>
          </div>
        </div>

        <div className="fields-holder row second-row">
          <div className="pull-left col custom-select">
            <Field
              name="sponsor"
              component={ReactSelect}
              placeholder="Select Sponsor"
              options={sponsorsOptions}
            />
          </div>
          <div className="pull-left col">
            <a className="btn btn-default" onClick={this.submitSponsor}>Submit</a>
          </div>
        </div>
      </form>
    );
  }
}

export default DashboardPortalsForm;
