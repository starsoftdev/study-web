import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/Input';
import TableActions from '../../../components/TableActions/index';

@reduxForm({ form: 'dashboardMessagingNumberForm' })


export class DashboardMessagingNumberSearch extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    messagingNumber: PropTypes.object,
    messagingNumberSearchFormValues: PropTypes.object,
    onSubmitQuery: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      query: null,
    };

    this.setQueryParam = this.setQueryParam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setQueryParam();
  }

  setQueryParam() {
    this.props.onSubmitQuery(this.state.query);
  }

  render() {
    return (
      <form action="#" className="form-search clearfix" onSubmit={this.onSubmit}>
        <TableActions
          buttonClickAction={() => browserHistory.push('/app/dashboard-messaging-numbers/add')}
          buttonText="Add Messaging Number"
          filters={
            <div className="has-feedback ">
              <Button
                className="btn-enter"
                onClick={this.setQueryParam}
              >
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="messagingNumber"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
                onChange={(e) => (this.setState({
                  query: e.target.value,
                }))}
              />
            </div>
          }
        />
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardMessagingNumberSearch);
