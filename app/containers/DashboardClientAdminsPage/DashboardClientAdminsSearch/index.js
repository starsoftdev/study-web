import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/Input';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddClientAdminsForm } from '../../DashboardClientAdminsPage/AddClientAdminsForm/index';
import TableActions from '../../../components/TableActions/index';

@reduxForm({ form: 'dashboardClientAdminSearchForm' })

export class DashboardClientAdminsSearch extends React.Component {
  static propTypes = {
    clientAdmins: PropTypes.object,
    addClientAdmin: PropTypes.func,
    editUserProcess: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      addClientAdminModalOpen: false,
    };

    this.closeAddClientAdminModal = this.closeAddClientAdminModal.bind(this);
    this.openAddClientAdminModal = this.openAddClientAdminModal.bind(this);
    this.addClientAdmin = this.addClientAdmin.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editUserProcess.saving && this.props.editUserProcess.saving) {
      this.closeAddClientAdminModal();
    }
  }

  closeAddClientAdminModal() {
    this.setState({ addClientAdminModalOpen: false });
  }

  openAddClientAdminModal() {
    this.setState({ addClientAdminModalOpen: true });
  }

  addClientAdmin(param) {
    this.props.addClientAdmin(param);
  }

  render() {
    return (
      <form action="#" className="form-search clearfix">
        <TableActions
          buttonClickAction={this.openAddClientAdminModal}
          buttonText="+ Add Client Admin"
          filters={
            <div className="has-feedback ">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
              />
            </div>
          }
        />

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addClientAdminModalOpen} onHide={this.closeAddClientAdminModal}>
          <Modal.Header>
            <Modal.Title>Add CLIENT ADMIN</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddClientAdminModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddClientAdminsForm
                onSubmit={this.addClientAdmin}
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
)(DashboardClientAdminsSearch);
