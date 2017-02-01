import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';

import Input from 'components/Input';
import Button from 'react-bootstrap/lib/Button';
import ReactSelect from 'components/Input/ReactSelect';
import { defaultRanges, DateRange } from 'react-date-range';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from 'components/CenteredModal/index';

import moment from 'moment';
@reduxForm({ form: 'searchSponsorManageUsers' })

export class SponsorManageUsersSearch extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area pull-right">
          <div className="col pull-right">
            <button type="button" className="btn btn-primary">
              + Add User
            </button>
          </div>
        </div>

        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="has-feedback ">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
                onChange={(e) => this.initSearch(e, 'name')}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorManageUsersSearch);
