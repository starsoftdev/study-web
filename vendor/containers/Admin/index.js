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
import { closeModal, openModalWithVendorId, submitVendorStudies } from './EditVendorStudiesForm/actions';
import { selectVendorAdmins } from './selectors';

import CenteredModal from '../../../app/components/CenteredModal/index';

import SearchForVendorAdminForm from './SearchForVendorAdminForm';
import AddVendorAdminForm from './AddVendorAdminForm';
import EditVendorStudiesForm, { formName as editVendorStudiesFormName } from './EditVendorStudiesForm';
import { selectValues } from '../../../common/selectors/form.selector';
import { selectModalOpen, selectStudiesForVendor } from './EditVendorStudiesForm/selectors';

import './style.less';

const pageTitle = 'Vendor Admins - StudyKIK';

const mapStateToProps = createStructuredSelector({
  editModalOpen: selectModalOpen(),
  editFormValues: selectValues(editVendorStudiesFormName),
  vendorStudies: selectStudiesForVendor(),
  vendorAdmins: selectVendorAdmins(),
});

const mapDispatchToProps = {
  addVendorAdmin,
  closeModal,
  fetchVendorAdmins,
  openModalWithVendorId,
  submitVendorStudies,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class VendorAdminPage extends Component {

  static propTypes = {
    addVendorAdmin: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    editModalOpen: PropTypes.bool.isRequired,
    editFormValues: PropTypes.object,
    fetchVendorAdmins: PropTypes.func.isRequired,
    openModalWithVendorId: PropTypes.func.isRequired,
    submitVendorStudies: PropTypes.func.isRequired,
    vendorAdmins: PropTypes.array.isRequired,
    vendorStudies: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      studyModalOpen: false,
      addVendorModalOpen: false,
    };
  }

  componentDidMount() {
    const { fetchVendorAdmins } = this.props;
    fetchVendorAdmins();
  }

  openStudyModal = (vendorId) => {
    const { openModalWithVendorId } = this.props;
    openModalWithVendorId(vendorId);
  };

  closeStudyModal = () => {
    const { closeModal } = this.props;
    closeModal();
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

  submitVendorStudies = () => {
    const { submitVendorStudies, vendorStudies, editFormValues: { vendorId } } = this.props;
    submitVendorStudies(vendorId, vendorStudies);
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
    const { editModalOpen } = this.props;
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

        <Modal dialogComponentClass={CenteredModal} className="search-vendor-study" id="search-vendor-study" show={editModalOpen} onHide={this.closeStudyModal}>
          <Modal.Header>
            <Modal.Title>{translate('client.page.vendor.admin.study')}</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeStudyModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <EditVendorStudiesForm
                onSubmit={this.submitVendorStudies}
                saving={false}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
