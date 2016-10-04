/**
*
 * Proposals Form
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, reduxForm, change } from 'redux-form';
import { DateRange } from 'react-date-range';
import ReactSelect from 'components/Input/ReactSelect';
import './styles.less';

const mapStateToProps = createStructuredSelector({});

@reduxForm({ form: 'ProposalForm' })
@connect(mapStateToProps)
class ProposalsForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array
  };

  state = {
    showPopup: false,
  }

  componentWillReceiveProps(newProps) {}

  handleSelect(range){
    //console.log('range', range);
  }

  showPopup(ev){
    ev.preventDefault();
    this.setState({showPopup: true});
  }

  hidePopup(ev){
    ev.preventDefault();
    this.setState({showPopup: false});
  }

  render() {
    const { siteLocations } = this.props;
    let state = this.state;

    return (
      <form action="#" className="form-search clearfix">

        <div className="btns-area pull-right">
          <div className="col pull-right">
            <button type="submit" className="btn btn-primary pull-right"><i className="icon-icon_download" /> DOWNLOAD</button>
          </div>

          <div className="col pull-right">
            <a href="#date-range" className="btn btn-primary lightbox-opener" onClick={this.showPopup.bind(this)}><i className="icon-icon_calendar" /> DATE RANGE</a>
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
            <Field
              name="site"
              component={ReactSelect}
              placeholder="Select Site Location"
              options={siteLocations}
              className="field"
            />
          </div>
        </div>

        <div id="date-range" className={(state.showPopup) ? "lightbox fixed-popup lightbox-active" : "lightbox fixed-popup"}>
          <div className="lightbox-holder">
            <div className="lightbox-frame">
              <div className="lightbox-content">
                <div className="head">
                  <strong className="title">DATE RANGE</strong>
                  <a className="lightbox-close close" href="#" onClick={this.hidePopup.bind(this)}><i className="icon-icon_close" /></a>
                </div>
                <div className="holder">
                  <nav className="popup-sidenav">
                    <div className="scroll-holder jcf--scrollable">
                      <ul className="list-unstyled">
                        <li><a href="#">Today</a></li>
                        <li><a href="#">yesterday</a></li>
                        <li><a href="#">last 7 days</a></li>
                        <li><a href="#">last 14 days</a></li>
                        <li className="active"><a href="#">last 30 days</a></li>
                        <li><a href="#">last month</a></li>
                        <li><a href="#">this month</a></li>
                        <li><a href="#">custom</a></li>
                      </ul>
                    </div>
                  </nav>
                  <div className="date-range-holder">

                    <div className="scroll-holder jcf--scrollable">
                      <div className="date-range-area">
                        <div className="calendars clearfix">
                          <DateRange
                            onInit={this.handleSelect.bind(this)}
                            onChange={this.handleSelect.bind(this)}
                          />
                        </div>
                        <div className="btn-block text-right">
                          <a href="#" className="btn btn-default lightbox-close">submit</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="overlay lightbox-close" onClick={this.hidePopup.bind(this)} />
        </div>
      </form>
    );
  }
}

export default ProposalsForm;
