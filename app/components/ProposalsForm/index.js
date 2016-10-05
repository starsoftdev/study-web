/**
*
 * Proposals Form
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { defaultRanges, DateRange } from 'react-date-range';
import ReactSelect from 'components/Input/ReactSelect';
import './styles.less';

const mapStateToProps = createStructuredSelector({});

@reduxForm({ form: 'ProposalForm' })
@connect(mapStateToProps)
class ProposalsForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    createPdf:  PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showPopup: false,
      rangePicker : {},
      linked : {},
      datePicker : null,
      firstDayOfWeek : null,
      predefined : {},
    };
  }

  componentWillReceiveProps(newProps) {}

  handleChange(which, payload) {
    this.setState({
      [which] : payload,
    });
  }

  showPopup(ev) {
    ev.preventDefault();
    this.setState({ showPopup: true });
  }

  hidePopup(ev){
    ev.preventDefault();
    this.setState({ showPopup: false });
  }

  createPdf(ev) {
    ev.preventDefault();
    this.props.createPdf();
  }

  render() {
    const { predefined } = this.state;
    const format = 'dddd, D MMMM YYYY';
    const { siteLocations } = this.props;
    const state = this.state;

    return (
      <form action="#" className="form-search clearfix">

        <div className="btns-area pull-right">
          <div className="col pull-right">
            <button
              type="submit"
              className="btn btn-primary pull-right"
              onClick={this.createPdf.bind(this)}
            >
              <i className="icon-icon_download" /> DOWNLOAD
            </button>
          </div>

          <div className="col pull-right">
            <a
              href="#date-range"
              className="btn btn-primary lightbox-opener"
              onClick={this.showPopup.bind(this)}
            >
              <i className="icon-icon_calendar" /> DATE RANGE
            </a>
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

        <div id="date-range" className={(state.showPopup) ? 'lightbox fixed-popup lightbox-active' : 'lightbox fixed-popup'}>
          <div className="lightbox-holder">
            <div className="lightbox-frame">
              <div className="lightbox-content">
                <div className="head">
                  <strong className="title">DATE RANGE</strong>
                  <a className="lightbox-close close" href="#" onClick={this.hidePopup.bind(this)}><i className="icon-icon_close" /></a>
                </div>
                <div className="holder">
                  <div className="date-range-holder">
                    <div className="scroll-holder jcf--scrollable">
                      <div className="date-range-area">
                        <div className="calendars clearfix">
                          <DateRange
                            linkedCalendars={true}
                            ranges={defaultRanges}
                            onInit={this.handleChange.bind(this, 'predefined')}
                            onChange={this.handleChange.bind(this, 'predefined')}
                          />
                          <div>
                            <span>{ predefined.startDate && predefined.startDate.format(format).toString() }</span>
                            <span>{ predefined.endDate && predefined.endDate.format(format).toString() }</span>
                          </div>
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
