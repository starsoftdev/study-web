import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import ReactSelect from '../../../components/Input/ReactSelect';
import TableActions from '../../../components/TableActions/index';

@reduxForm({ form: 'dashboardMessagingNumberForm' })


export class DashboardMessagingNumberSearch extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    messagingNumberSearchFormValues: PropTypes.object,
  }

  render() {
    const options = [];
    return (
      <form action="#" className="form-search clearfix">
        <TableActions
          buttonClickAction={() => browserHistory.push('/app/add-messaging-number')}
          buttonText="Add Messaging Number"
          filters={
            <div className="has-feedback">
              <Field
                name="protocol"
                component={ReactSelect}
                placeholder="Select Messaging Number"
                options={options}
              />
            </div>
          }
        />
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
)(DashboardMessagingNumberSearch);
