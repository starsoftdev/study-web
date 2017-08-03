import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { normalizePhoneForServer } from '../../../../app/common/helper/functions';
import Input from '../../../components/Input';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddUserForm } from '../../DashboardManageUsers/DashboardManageUsersAddUserForm';
import { editDashboardUser } from '../actions';
import { selectDashboardEditUserProcess } from '../selectors';
import TableActions from '../../../components/TableActions/index';

const mapStateToProps = createStructuredSelector({
  editUserProcess: selectDashboardEditUserProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    editDashboardUser: (payload) => dispatch(editDashboardUser(payload)),
  };
}


@reduxForm({ form: 'dashboardManageUsersSearchForm' })
@connect(mapStateToProps, mapDispatchToProps)
export class DashboardManageUsersSearch extends React.Component {
  static propTypes = {
    editDashboardUser: React.PropTypes.func,
    editUserProcess: React.PropTypes.object,
    roles: React.PropTypes.object,
    onSubmitQuery: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      addUserModalOpen: false,
      query: null,
    };

    this.closeAddUserModal = this.closeAddUserModal.bind(this);
    this.openAddUserModal = this.openAddUserModal.bind(this);
    this.addUser = this.addUser.bind(this);
    this.setQueryParam = this.setQueryParam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editUserProcess.saving && this.props.editUserProcess.saving) /* ||
      (!newProps.deleteUserProcess.deleting && this.props.deleteUserProcess.deleting) */) {
      this.closeAddUserModal();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setQueryParam();
  }

  setQueryParam() {
    this.props.onSubmitQuery(this.state.query);
  }

  closeAddUserModal() {
    this.setState({ addUserModalOpen: false });
  }

  openAddUserModal() {
    this.setState({ addUserModalOpen: true });
  }

  addUser(params) {
    const normalizedParams = params;
    normalizedParams.phone = normalizePhoneForServer(normalizedParams.phone);
    this.props.editDashboardUser(normalizedParams);
  }

  render() {
    return (
      <form action="#" className="form-search clearfix" onSubmit={this.onSubmit}>
        <TableActions
          buttonClickAction={this.openAddUserModal}
          buttonText="+ Add User"
          filters={
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
          }
        />

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addUserModalOpen} onHide={this.closeAddUserModal}>
          <Modal.Header>
            <Modal.Title>Add User</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddUserModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddUserForm
                onSubmit={this.addUser}
                saving={this.props.editUserProcess.saving}
                roles={this.props.roles}
              />
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

export default DashboardManageUsersSearch;
