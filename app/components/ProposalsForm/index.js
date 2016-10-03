/**
*
 * Proposals Form
*
*/

import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import './styles.less';

const mapStateToProps = createStructuredSelector({});
class ProposalsForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {};

  componentWillReceiveProps(newProps) {}

  render() {
    return (
      <form action="#" className="form-search clearfix">

        <div className="btns-area pull-right">
          <div className="col pull-right">
            <button type="submit" className="btn btn-primary pull-right"><i className="icon-icon_download" /> DOWNLOAD</button>
          </div>

          <div className="col pull-right">
            <a href="#date-range" className="btn btn-primary lightbox-opener"><i className="icon-icon_calendar" /> DATE RANGE</a>
          </div>
        </div>

        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="field">
              <input type="search" id="search" className="form-control keyword-search" placeholder="Search" />
              <label htmlFor="search"><i className="icon-icon_search2" /></label>
            </div>
          </div>
          <div className="pull-left custom-select">
            <select className="data-search">
              <option>Select Site Location</option>
              <option>option 1</option>
              <option>option 2</option>
              <option>option 3</option>
              <option>option 4</option>
              <option>option 5</option>
            </select>
          </div>
        </div>
      </form>
    );
  }
}

export default ProposalsForm;
