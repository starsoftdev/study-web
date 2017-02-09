import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/Input';
import Button from 'react-bootstrap/lib/Button';
import ReactSelect from 'components/Input/ReactSelect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from 'components/CenteredModal/index';
import EditSponsorUserForm from 'containers/SponsorManageUsers/EditSponsorUserForm';
import { selectEditUserProcess, selectProtocolsList, selectDeleteUserProcess, selectEditProtocolProcess } from 'containers/SponsorManageUsers/selectors';
import _ from 'lodash';

@reduxForm({ form: 'searchSponsorManageUsers' })

export class SponsorManageUsersSearch extends React.Component {
  static propTypes = {
    editUser: PropTypes.func,
    formValues: PropTypes.object,
    editUserProcess: PropTypes.object,
    deleteUserProcess: PropTypes.object,
    editProtocolProcess: PropTypes.object,
    updateData: PropTypes.func,
    protocols: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      addUserModalOpen: false,
      searchTimer: null,
    };

    this.closeAddUserModal = this.closeAddUserModal.bind(this);
    this.openAddUserModal = this.openAddUserModal.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editUserProcess.saving && this.props.editUserProcess.saving) ||
      (!newProps.deleteUserProcess.deleting && this.props.deleteUserProcess.deleting) ||
      (!newProps.editProtocolProcess.saving && this.props.editProtocolProcess.saving)) {
      this.props.updateData();
      this.closeAddUserModal();
    }
  }

  closeAddUserModal() {
    this.setState({ addUserModalOpen: false });
  }

  openAddUserModal() {
    this.setState({ addUserModalOpen: true });
  }

  addNewUser() {
    this.props.editUser(true);
  }

  render() {
    const options = [];
    _.forEach(this.props.protocols, (protocol) => {
      options.push({
        id: protocol.id,
        name: protocol.name,
        value: false,
      });
    });

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area pull-right">
          <div className="col pull-right">
            <a className="btn btn-primary" onClick={this.openAddUserModal}>
              + Add User
            </a>
          </div>
        </div>

        <div className="fields-holder">
          <div className="search-area pull-left">
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
          <div className="search-area pull-left">
            <div className="has-feedback ">
              <Field
                name="protocol"
                component={ReactSelect}
                placeholder="Select Protocol"
                options={[{ label: 'All', value: 'all' }].concat(options)}
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
              <EditSponsorUserForm isEdit={false} onSubmit={this.addNewUser} protocolOptions={options} />
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  editUserProcess: selectEditUserProcess(),
  deleteUserProcess: selectDeleteUserProcess(),
  protocols: selectProtocolsList(),
  editProtocolProcess: selectEditProtocolProcess(),
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorManageUsersSearch);
