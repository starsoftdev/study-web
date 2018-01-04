import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/Input';

@reduxForm({ form: 'dashboardLockedUsersSearchForm' })
class DashboardLockedUsersSearch extends React.Component {
  static propTypes = {
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
        <div className="fields-holder">
          <div className="pull-left col custom-select no-left-padding">
            <div className="has-feedback ">
              <Button
                className="btn-enter"
                onClick={this.setQueryParam}
              >
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
                onChange={(e) => (this.setState({
                  query: e.target.value,
                }))}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default DashboardLockedUsersSearch;
