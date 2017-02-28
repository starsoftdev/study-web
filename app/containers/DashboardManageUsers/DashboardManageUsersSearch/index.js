import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/Input';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddUserForm } from '../../DashboardManageUsers/DashboardManageUsersAddUserForm';
import { editDashboardUser } from '../actions';
import { selectDashboardEditUserProcess } from '../selectors';

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
  }

  constructor(props) {
    super(props);

    this.state = {
      addUserModalOpen: false,
    };

    this.closeAddUserModal = this.closeAddUserModal.bind(this);
    this.openAddUserModal = this.openAddUserModal.bind(this);

    this.addUser = this.addUser.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editUserProcess.saving && this.props.editUserProcess.saving) /* ||
      (!newProps.deleteUserProcess.deleting && this.props.deleteUserProcess.deleting)*/) {
      this.closeAddUserModal();
    }
  }

  closeAddUserModal() {
    this.setState({ addUserModalOpen: false });
  }

  openAddUserModal() {
    this.setState({ addUserModalOpen: true });
  }

  addUser(params) {
    console.log('add user', params);
    this.props.editDashboardUser(params);
  }

  render() {
    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddUserModal}>
              + Add User
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
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
          </div>
        </div>

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
