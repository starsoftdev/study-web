/**
 * Vendor Amdin Page
 *
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import { createStructuredSelector } from 'reselect';

import RowItem from './RowItem';
import { translate } from '../../../common/utilities/localization';
import { fetchVendorAdmins } from './actions';
import { addVendorAdmin } from './AddVendorAdminForm/actions';
import { setSelectedVendorId, submitVendorStudies } from './EditVendorStudiesForm/actions';
import { selectVendorAdmins } from './selectors';

import CenteredModal from '../../../app/components/CenteredModal/index';

import SearchForVendorAdminForm from './SearchForVendorAdminForm';
import AddVendorAdminForm from './AddVendorAdminForm';
import EditVendorStudiesForm from './EditVendorStudiesForm';

import './style.less';

const pageTitle = 'Vendor Admins - StudyKIK';

const mapStateToProps = createStructuredSelector({
  vendorAdmins: selectVendorAdmins(),
});

const mapDispatchToProps = {
  addVendorAdmin,
  fetchVendorAdmins,
  setSelectedVendorId,
  submitVendorStudies,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class VendorAdminPage extends Component {

  static propTypes = {
    addVendorAdmin: PropTypes.func.isRequired,
    fetchVendorAdmins: PropTypes.func.isRequired,
    setSelectedVendorId: PropTypes.func.isRequired,
    submitVendorStudies: PropTypes.func.isRequired,
    vendorAdmins: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      studyModalOpen: false,
      addVendorModalOpen: false,
      currentlySelectedvendorId: null,
    };
  }

  componentDidMount() {
    const { fetchVendorAdmins } = this.props;
    fetchVendorAdmins();
  }

  openStudyModal = (vendorId) => {
    this.setState({
      studyModalOpen: true,
    });
    const { setSelectedVendorId } = this.props;
    setSelectedVendorId(vendorId);
  };

  closeStudyModal = () => {
    this.setState({
      studyModalOpen: false,
      currentlySelectedvendorId: null,
    });
  };

  openVendorModal = () => {
    this.setState({
      addVendorModalOpen: true,
    });
  };

  closeVendorModal = () => {
    this.setState({
      addVendorModalOpen: false,
    });
  };

  addVendorAdmin = (data) => {
    const { addVendorAdmin } = this.props;
    addVendorAdmin(data);
    this.closeVendorModal();
  };

  searchForVendorAdmin = (data) => {
    const { fetchVendorAdmins } = this.props;
    fetchVendorAdmins(data.search);
  };

  setVendorRoleStudies = (data) => {
    const { setVendorRoleStudies } = this.props;
    submitVendorRoleStudies(data);
  };

  renderVendorAdmins = () => {
    const { vendorAdmins } = this.props;

    return vendorAdmins.map(item => (
      <RowItem
        key={item.vendorId}
        item={item}
        openStudyModal={this.openStudyModal}
      />
    ));
  };

  render() {
    return (
      <div className="container-fluid" id="vendorAdminPage">
        <Helmet title={pageTitle} />
        <h2 className="main-heading pull-left">{translate('client.page.vendor.admin.vendorAdmins')}</h2>
        <div className="clearfix container-fluid">
          <SearchForVendorAdminForm
            onSubmit={this.searchForVendorAdmin}
            saving={false}
          />
          <div className="btns-area pull-right">
            <div className="col pull-left no-right-padding">
              <a className="btn btn-primary lightbox-opener" onClick={this.openVendorModal}>{translate('client.page.vendor.admin.addVendorAdmin')}</a>
            </div>
          </div>
        </div>

        <table className="table-manage-user table client-admins graph-area">
          <caption>{translate('client.page.vendor.admin.vendorAdmins')}</caption>

          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="client_name" className={'th'}>{translate('client.page.vendor.admin.company')}<i className="caret-arrow" /></th>
              <th onClick={this.sortBy} data-sort="client_name" className={'th'}>{translate('client.page.vendor.admin.name')}<i className="caret-arrow" /></th>
              <th onClick={this.sortBy} data-sort="client_name" className={'th'}>{translate('client.page.vendor.admin.email')}<i className="caret-arrow" /></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.renderVendorAdmins()}
          </tbody>

        </table>

        <Modal dialogComponentClass={CenteredModal} className="new-vendor" id="new-vendor" show={this.state.addVendorModalOpen} onHide={this.closeVendorModal}>
          <Modal.Header>
            <Modal.Title>{translate('client.page.vendor.admin.addVendorAdmin')}</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeVendorModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddVendorAdminForm
                onSubmit={this.addVendorAdmin}
                saving={false}
              />
            </div>
          </Modal.Body>
        </Modal>

        <Modal dialogComponentClass={CenteredModal} className="search-vendor-study" id="search-vendor-study" show={this.state.studyModalOpen} onHide={this.closeStudyModal}>
          <Modal.Header>
            <Modal.Title>{translate('client.page.vendor.admin.study')}</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeStudyModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <EditVendorStudiesForm
                onSubmit={this.setVendorRoleStudies}
                saving={false}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
