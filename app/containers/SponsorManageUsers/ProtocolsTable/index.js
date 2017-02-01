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

export class SponsorManageUsersProtocolsTable extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="table-holder table-responsive">
        <table className="table-manage-user alt table">
          <caption>PROTOCOLS</caption>
          <thead>
          <tr>
            <th className="col1">PROTOCOL NUMBER  <i className="caret-arrow"></i></th>
            <th className="col2">INDICATION  <i className="caret-arrow"></i></th>
            <th className="col3">CRO  <i className="caret-arrow"></i></th>
            <th className="col4">IRB  <i className="caret-arrow"></i></th>
            <th className="col5">IWRS  <i className="caret-arrow"></i></th>
            <th></th>
          </tr>
          </thead>
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
)(SponsorManageUsersProtocolsTable);
