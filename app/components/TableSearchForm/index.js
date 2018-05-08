/**
*
 * Proposals Form
*
*/

import moment from 'moment-timezone';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { defaultRanges, DateRange } from 'react-date-range';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import CenteredModal from '../CenteredModal/index';
import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';
import { translate } from '../../../common/utilities/localization';

const formName = 'ProposalForm';
@reduxForm({ form: formName })
export default class TableSearchForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    createPdf: PropTypes.func,
    changeRange: PropTypes.func,
    search: PropTypes.func,
    currentUser: PropTypes.object,
    downloadBtnDisabled: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    this.createPdf = this.createPdf.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined');
    this.renderDateFooter = this.renderDateFooter.bind(this);

    this.state = {
      showPopup: false,
      rangePicker : {},
      linked : {},
      datePicker : null,
      firstDayOfWeek : null,
      predefined : {
        startDate: moment().clone().subtract(30, 'days'),
        endDate: moment(),
      },
    };
  }

  handleChange(which, payload) {
    this.setState({
      [which] : payload,
    });
  }

  showPopup(ev) {
    ev.preventDefault();
    this.setState({ showPopup: true });
  }

  hidePopup(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ showPopup: false });
  }

  createPdf(ev) {
    ev.preventDefault();
    this.props.createPdf();
  }

  changeRange(ev) {
    ev.preventDefault();
    const range = this.state.predefined;
    this.props.search(range, 'range');
    this.hidePopup();
  }

  renderDateFooter() {
    const { predefined } = this.state;
    if (predefined.startDate) {
      const format = translate('portals.component.tableSearchForm.dateMask');
      if (predefined.startDate.isSameOrAfter(predefined.endDate, 'day')) {
        return (
          <span className="time">
            {moment(predefined.startDate).format(format)}
          </span>
        );
      }
      return (
        <span className="time">
          {moment(predefined.startDate).format(format)} - {moment(predefined.endDate).format(format)}
        </span>
      );
    }
    return null;
  }

  render() {
    const siteLocations = [{ name: translate('portals.component.tableSearchForm.allLabel'), value: '0' }].concat(this.props.siteLocations);
    const { currentUser } = this.props;
    const state = this.state;

    const isAdmin = currentUser && (currentUser.roleForClient && currentUser.roleForClient.name) === 'Super Admin';
    let bDisabled = true;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = !(currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin');
    }
    let defaultValue = null;
    if (!isAdmin && bDisabled) {
      defaultValue = currentUser.site_id;
      if (currentUser && currentUser.roleForClient) {
        defaultValue = currentUser.roleForClient.site_id;
      }
    }
    return (
      <form className="form-search clearfix">
        <div className="btns-area pull-right">
          <div className="col pull-right">
            <button className={`btn btn-primary pull-right ${this.props.downloadBtnDisabled ? 'disabled' : ''}`} onClick={this.createPdf}>
              <i className="icomoon-icon_download" /> {translate('portals.component.tableSearchForm.downloadBtn')}
            </button>
          </div>

          <div className="col pull-right">
            <a className="btn btn-primary lightbox-opener" onClick={this.showPopup}>
              <i className="icomoon-icon_calendar" /> {translate('portals.component.tableSearchForm.dateRangeBtn')}
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="search-area pull-left no-left-padding">
            <div className="field">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                type="search"
                component={Input}
                id="search"
                name="search"
                placeholder={translate('portals.component.tableSearchForm.searchPlaceholder')}
                onChange={(event) => this.props.search(event, 'search')}
              />
            </div>
          </div>
          <div className="pull-left custom-select">
            <Field
              name="site"
              component={ReactSelect}
              placeholder={translate('portals.component.tableSearchForm.sitePlaceholder')}
              options={siteLocations}
              selectedValue={defaultValue || undefined}
              className="field"
              disabled={bDisabled}
              onChange={(event) => this.props.search(event, 'site')}
            />
          </div>
        </div>
        <Modal
          id="date-range"
          className="date-range-modal"
          dialogComponentClass={CenteredModal}
          show={state.showPopup}
          onHide={this.hidePopup}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>{translate('portals.component.tableSearchForm.dateRangeModalTitle')}</Modal.Title>
            <a className="lightbox-close close" onClick={this.hidePopup}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <DateRange
              linkedCalendars
              ranges={defaultRanges}
              startDate={this.state.predefined.startDate ? this.state.predefined.startDate : moment()}
              endDate={this.state.predefined.endDate ? this.state.predefined.endDate : moment().add(1, 'M')}
              onInit={this.handleChange}
              onChange={this.handleChange}
            />
            <div className="dateRange-helper">
              <div className="emit-border"><br /></div>
              <div className="right-part">
                <div className="btn-block text-right">
                  {this.renderDateFooter()}
                  <Button onClick={this.changeRange}>
                    {translate('portals.component.tableSearchForm.submitBtn')}
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}
