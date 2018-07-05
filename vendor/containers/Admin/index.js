/**
 * Vendor Amdin Page
 *
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { map } from 'lodash';
import Modal from 'react-bootstrap/lib/Modal';
import { createStructuredSelector } from 'reselect';

import RowItem from './RowItem';
import Input from '../../../app/components/Input';
import { translate } from '../../../common/utilities/localization';

import CenteredModal from '../../../app/components/CenteredModal/index';

import AddVendorAdminForm from './AddVendorAdminForm';
import SearchStudyForm from './SearchStudyForm';

import './style.less';

const pageTitle = 'Vendor Admins - StudyKIK';
const formName = 'vendorAdminSearch';
@reduxForm({ form: formName })

class VendorAdminPage extends Component {

  static propTypes = {
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

    this.addVendorAdmin = this.addVendorAdmin.bind(this);
  }

  componentDidMount() {
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

  addVendorAdmin() {
    this.closeVendorModal();
  }

  render() {

    const siteOptions = map([], siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: 'All', value: '0' });

    const vendorAdmins = [{
      company_name: 'Wanye Enterprise',
      first_name: 'Bruce',
      last_name: 'Wanye',
      email: 'bruce@we.com',
    }];

    return (
      <div className="container-fluid" id="vendorAdminPage">
        <Helmet title={pageTitle} />
        <h2 className="main-heading pull-left">{translate('client.page.vendor.admin.vendorAdmins')}</h2>
        <div className="clearfix container-fluid">
          <form action="#" className="form-search pull-left" onSubmit={this.onSubmit}>
            <div className="fields-holder">
              <div className="pull-left col no-left-padding">
                <div className="has-feedback ">
                  <Button
                    className="btn-enter"
                    onClick={this.setQueryParam}
                  >
                    <i className="icomoon-icon_search2" />
                  </Button>
                  <Field
                    name="name"
                    component={Input}
                    type="text"
                    placeholder="Search"
                    className="keyword-search"
                    onChange={(e) => (this.setState({
                      query: e.target.value,
                    }))}
                  />
                </div>
              </div>
            </div>
          </form>
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

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorAdminPage);
