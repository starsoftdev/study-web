/**
 * Vendor Amdin Page
 *
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { map } from 'lodash';
import Modal from 'react-bootstrap/lib/Modal';
import { createStructuredSelector } from 'reselect';

import RowItem from './RowItem';
import { translate } from '../../../common/utilities/localization';
import { addVendorAdmin, fetchVendorAdmins } from './actions';
import { selectVendorAdmins } from './selectors';

import CenteredModal from '../../../app/components/CenteredModal/index';

import SearchForVendorAdminForm from './SearchForVendorAdminForm';
import AddVendorAdminForm from './AddVendorAdminForm';
import SearchStudyForm from './SearchStudyForm';

import './style.less';

const pageTitle = 'Vendor Admins - StudyKIK';

const mapStateToProps = createStructuredSelector({
  vendorAdmins: selectVendorAdmins(),
});

const mapDispatchToProps = {
  addVendorAdmin,
  fetchVendorAdmins,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class VendorAdminPage extends Component {

  static propTypes = {
    addVendorAdmin: PropTypes.func.isRequired,
    fetchVendorAdmins: PropTypes.func.isRequired,
    vendorAdmins: PropTypes.array,
  };

  static defaultValues = {
    vendorAdmins: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      studyModalOpen: false,
      addVendorModalOpen: false,
    };

    this.openStudyModal = this.openStudyModal.bind(this);
    this.closeStudyModal = this.closeStudyModal.bind(this);

    this.openVendorModal = this.openVendorModal.bind(this);
    this.closeVendorModal = this.closeVendorModal.bind(this);

    this.searchForVendorAdmin = this.searchForVendorAdmin.bind(this);
    this.addVendorAdmin = this.addVendorAdmin.bind(this);
  }

  componentDidMount() {
    const { fetchVendorAdmins } = this.props;
    fetchVendorAdmins();
  }

  openStudyModal() {
    this.setState({ studyModalOpen: true });
  }

  closeStudyModal() {
    this.setState({ studyModalOpen: false });
  }

  openVendorModal() {
    this.setState({ addVendorModalOpen: true });
  }

  closeVendorModal() {
    this.setState({ addVendorModalOpen: false });
  }

  searchForVendorAdmin(data) {
    const { fetchVendorAdmins } = this.props;
    fetchVendorAdmins(data.search);
  }

  addVendorAdmin(data) {
    const { addVendorAdmin } = this.props;
    addVendorAdmin(data);
    this.closeVendorModal();
  }

  render() {
    const { vendorAdmins } = this.props;

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
            {
              vendorAdmins.map((item, index) => (
                <RowItem key={index} item={item} openStudyModal={this.openStudyModal} />
              ))
            }
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
              <SearchStudyForm
                onSubmit={this.addVendorAdmin}
                saving={false}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
