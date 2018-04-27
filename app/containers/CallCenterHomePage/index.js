/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';
import { Link } from 'react-router';

import ReactSelect from '../../components/Input/ReactSelect';
import studykikLogo from '../../assets/images/logo.svg';

import CallDiv from './CallDiv/';
import CallCalendar from './CallCalendar/';

import './style.less';

const formName = 'callCenterHomePage';
@reduxForm({ form: formName })

export default class CallCenterHomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const siteOptions = map([], siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: 'All', value: '0' });

    return (
      <div id="main" className="not-found-page">
        <form action="#" className="form-search clearfix">
          <h1 className="logo pull-left">
            <Link to="/app">
              <img src={studykikLogo} width="350" height="51" alt="logo" />
            </Link>
          </h1>
          <div className="search-area">
            <Field
              name="ccUser"
              component={ReactSelect}
              placeholder="Select User"
              options={siteOptions}
              disabled={false}
              className="field"
            />
            <Field
              name="ccFilter"
              component={ReactSelect}
              placeholder="Select Filter"
              options={siteOptions}
              disabled={false}
              className="field"
            />
            <div className="field">
              <Button className="btn-enter" type="submit">
                <i className="icomoon-icon_search2" />
              </Button>
              <input name="query" type="text" className="form-control keyword-search" placeholder="Search" />
            </div>
          </div>
        </form>

        <div className="cc-article">
          <div className="col-xs-4 ccDiv-txt">
            <div className="ccDiv-content">
              Texts
            </div>
          </div>
          <div className="col-xs-4 ccDiv-rot">
            <div className="ccDiv-content">
              Rotting
            </div>
          </div>
          <div className="col-xs-4 ccDiv-sch">
            <div className="ccDiv-content">
              Sched
            </div>
          </div>
        </div>

        <div className="content">
          <CallDiv />
          <CallCalendar />
        </div>
      </div>
    );
  }
}
