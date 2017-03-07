import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import Input from '../../../components/Input';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddSponsorAdminForm } from './AddSponsorAdminForm';

@reduxForm({ form: 'dashboardSponsorAdminSearchForm' })

export class DashboardSponsorAdminSearch extends React.Component {
  static propTypes = {
    sponsorsWithoutAdmin: PropTypes.object,
    usersByRoles: PropTypes.object,
    addSponsorAdmin: PropTypes.func,
    editUserProcess: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      addSponsorAdminModalOpen: false,
    };

    this.closeAddSponsorAdminModal = this.closeAddSponsorAdminModal.bind(this);
    this.openAddSponsorAdminModal = this.openAddSponsorAdminModal.bind(this);
    this.addSponsor = this.addSponsor.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editUserProcess.saving && this.props.editUserProcess.saving) {
      this.closeAddSponsorAdminModal();
    }
  }

  closeAddSponsorAdminModal() {
    this.setState({ addSponsorAdminModalOpen: false });
  }

  openAddSponsorAdminModal() {
    this.setState({ addSponsorAdminModalOpen: true });
  }

  addSponsor(params) {
    this.props.addSponsorAdmin(params);
  }

  render() {
    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddSponsorAdminModal}>
              Add Sponsor Admin
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="field">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                className="keyword-search"
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addSponsorAdminModalOpen} onHide={this.closeAddSponsorAdminModal}>
          <Modal.Header>
            <Modal.Title>Add Sponsor Admin</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddSponsorAdminModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddSponsorAdminForm
                sponsorsWithoutAdmin={this.props.sponsorsWithoutAdmin}
                usersByRoles={this.props.usersByRoles}
                onSubmit={this.addSponsor}
                saving={this.props.editUserProcess.saving}
              />
            </div>
          </Modal.Body>
        </Modal>

      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardSponsorAdminSearch);
