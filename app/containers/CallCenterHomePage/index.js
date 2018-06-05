/**
 * Call Center Homepage
 *
 */

import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Helmet from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Link } from 'react-router';
import Modal from 'react-bootstrap/lib/Modal';
import { createStructuredSelector } from 'reselect';

import { fetchIndications } from '../../containers/App/actions';
import { selectIndications, selectCurrentUser } from '../App/selectors';

import { fetchPatients } from './actions';
import { selectFetchedPatients } from './selectors';

import CenteredModal from '../../components/CenteredModal';
import ReactSelect from '../../components/Input/ReactSelect';
import { translate } from '../../../common/utilities/localization';
import studykikLogo from '../../assets/images/logo.svg';
import FiltersForm from './FiltersForm/';

import CallDiv from './CallDiv/';
import CallCalendar from './CallCalendar/';

import './style.less';

const formName = 'callCenterHomePage';
@reduxForm({ form: formName })

class CallCenterHomePage extends Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    fetchIndications: PropTypes.func.isRequired,
    fetchPatients: PropTypes.func,
    patients: PropTypes.object,
    indications: PropTypes.array,
  };

  state = {
    addUserModalOpen: false,
  }

  componentDidMount() {
    const { currentUser, fetchIndications, fetchPatients } = this.props;
    fetchIndications();
    fetchPatients(currentUser.id);
  }

  openFiltersModal() {
    this.setState({ addUserModalOpen: true });
  }

  closeFiltersModal() {
    this.setState({ addUserModalOpen: false });
  }

  render() {
    const { patients, indications } = this.props;

    const siteOptions = map([], siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));

    siteOptions.unshift({ label: 'All', value: '0' });
    return (
      <div className="container-fluid" id="callcentermain">
        <form action="#" className="form-search clearfix">
          <div className="search-area">
            <div className="field">
              <Button bsStyle="primary" onClick={(e) => this.openFiltersModal(e)}>
                {translate('container.page.callcenter.btn.filters')}
              </Button>
            </div>
            <Modal dialogComponentClass={CenteredModal} className="filter-modal" id="filter-modal" show={this.state.addUserModalOpen} onHide={this.closeFiltersModal}>
              <Modal.Header>
                <Modal.Title>{translate('container.page.callcenter.btn.filters')}</Modal.Title>
                <a className="lightbox-close close" onClick={(e) => this.closeFiltersModal(e)}>
                  <i className="icomoon-icon_close" />
                </a>
              </Modal.Header>
              <Modal.Body>
                <div className="holder clearfix">
                  <div className="form-lightbox">
                    <FiltersForm />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <Field
              name="ccUser"
              component={ReactSelect}
              placeholder={translate('common.layout.placeholder.selectuser')}
              options={siteOptions}
              disabled={false}
              className="field"
            />
            <div className="field">
              <Button className="btn-enter" type="submit">
                <i className="icomoon-icon_search2" />
              </Button>
              <input name="query" type="text" className="form-control keyword-search" placeholder={translate('common.layout.placeholder.search')} />
            </div>
          </div>
        </form>

        <div className="cc-article">
          <div className="col-xs-4 ccDiv-txt">
            <div className="ccDiv-content">
              {translate('container.page.callcenter.heading.texts')}
            </div>
          </div>
          <div className="col-xs-4 ccDiv-rot">
            <div className="ccDiv-content">
              {translate('container.page.callcenter.heading.rotting')}
            </div>
          </div>
          <div className="col-xs-4 ccDiv-sch">
            <div className="ccDiv-content">
              {translate('container.page.callcenter.heading.sched')}
            </div>
          </div>
        </div>

        <div className="content">
          <CallDiv patients={patients} indications={indications} />
          <CallCalendar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  patients: selectFetchedPatients(),
  indications: selectIndications(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchIndications: () => dispatch(fetchIndications()),
    fetchPatients: (clientRoleId) => dispatch(fetchPatients(clientRoleId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallCenterHomePage);
