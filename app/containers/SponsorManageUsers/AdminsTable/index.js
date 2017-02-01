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

export class SponsorManageUsersAdminsTable extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="table-holder table-responsive">
        <table className="table-manage-user table">
          <caption>
            ADMINS
          </caption>

          <thead>
          <tr>
            <th>NAME  <i className="caret-arrow"></i></th>
            <th>EMAIL  <i className="caret-arrow"></i></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr className="tr">
            <td><span className="first-name">Bruce</span> <span className="last-name">Wayne</span></td>
            <td>bruce.wayne@wayneenterprise.com</td>
            <td>
              <div className="btn-holder">
                <span className="access hidden" data-access="Admin"></span>
                <a href="#manage-edit-user" className="btn btn-primary right lightbox-opener hidden">edit</a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorManageUsersAdminsTable);
