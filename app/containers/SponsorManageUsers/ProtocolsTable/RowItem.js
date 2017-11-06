import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';

import CenteredModal from '../../../components/CenteredModal/index';
import EditProtocolForm from '../EditProtocolForm';
import ExpandedItem from './ExpandedItem';
import { selectEditProtocolProcess } from '../selectors';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editUser: PropTypes.func,
    protocols: PropTypes.array,
    deleteUser: PropTypes.func,
    userFilter: React.PropTypes.string,
    editProtocol: PropTypes.func,
    currentUser: React.PropTypes.object,
    editProtocolProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      assignedUsersCollapsed: true,
      editProtocolModalOpen: false,
    };

    this.toggleAssignedUsers = this.toggleAssignedUsers.bind(this);
    this.closeEditProtocolModal = this.closeEditProtocolModal.bind(this);
    this.openEditProtocolModal = this.openEditProtocolModal.bind(this);
    this.editLocalProtocol = this.editLocalProtocol.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editProtocolProcess.saving && this.props.editProtocolProcess.saving)) {
      this.closeEditProtocolModal();
    }
  }

  toggleAssignedUsers() {
    const collapsed = !this.state.assignedUsersCollapsed;
    this.setState({ assignedUsersCollapsed: collapsed });
  }

  closeEditProtocolModal() {
    this.setState({ editProtocolModalOpen: false });
  }

  openEditProtocolModal() {
    this.setState({ editProtocolModalOpen: true });
  }

  editLocalProtocol() {
    this.props.editProtocol();
  }

  render() {
    const options = [];
    console.log(333, this.props.protocols);
    _.forEach(this.props.protocols, (protocol) => {
      const value = (this.props.item.id === protocol.id);
      options.push({
        id: protocol.id,
        name: protocol.number,
        value,
        studyId: protocol.studyId,
      });
    });

    let shouldBeOpened = false;

    const { userFilter } = this.props;

    const filtredAssignedUsers = this.props.item.sponsorUsers.filter(item => (!userFilter || `${item.user.firstName} ${item.user.lastName}`.toLowerCase().indexOf(userFilter.toLowerCase()) !== -1));

    const assignedUsersContent = filtredAssignedUsers.map((item, index) => {
      if (userFilter && `${item.user.firstName} ${item.user.lastName}`.toLowerCase().indexOf(userFilter.toLowerCase()) !== -1) {
        shouldBeOpened = true;
      }

      _.forEach(options, (option, index) => {
        options[index].value = _.find(item.studies, (o) => (o.protocol_id === option.id));
      });

      console.log(444, options);

      return (
        <ExpandedItem
          key={index}
          item={item}
          protocolOptions={options}
          editUser={this.props.editUser}
          deleteUser={this.props.deleteUser}
          currentUser={this.props.currentUser}
        />
      );
    });

    const initialValues = {
      initialValues: {
        protocolNumber: this.props.item.protocol ? this.props.item.protocol.number : '',
        indication: this.props.item.indication ? this.props.item.indication.name : '',
        cro: this.props.item.cro ? this.props.item.cro.name : '',
        irb: this.props.item.protocol ? this.props.item.protocol.irb : '',
        iwrs: this.props.item.protocol ? this.props.item.protocol.iwrs : '',
        protocolId: this.props.item.protocol ? this.props.item.protocol.id : null,
      },
    };

    const isAllowToEdit = (this.props.currentUser.roleForSponsor.name === 'Super Admin' || this.props.currentUser.roleForSponsor.name === 'Admin');
    console.log(123, this.props.item)
    return (
      <tr>
        <td className="col1">
          {this.props.item.protocol ? this.props.item.protocol.number : ''}
        </td>
        <td className="col2">
          {this.props.item.indication ? this.props.item.indication.name : ''}
        </td>
        <td className="col3">
          {this.props.item.cro ? this.props.item.cro.name : ''}
        </td>
        <td className="col4">
          {this.props.item.protocol ? this.props.item.protocol.irb : ''}
        </td>
        <td className="col5">
          {this.props.item.protocol ? this.props.item.protocol.iwrs : ''}
        </td>
        <td className="col6">

          <span>ASSIGNED USERS ({this.props.item.sponsorUsers.length ? this.props.item.sponsorUsers.length : 0})</span>
          {(this.state.assignedUsersCollapsed && !shouldBeOpened)
            ? <a className="btn add-more-trs" onClick={this.toggleAssignedUsers}></a>
            : <a className="btn add-more-trs active " onClick={this.toggleAssignedUsers}></a>
          }
          {(!this.state.assignedUsersCollapsed || shouldBeOpened) &&
            <div className="assigned-users-list">{assignedUsersContent}</div>
          }

        </td>
        <td className="col7">
          <a disabled={!isAllowToEdit} className="btn btn-primary btn-edit-site pull-right" onClick={() => (!isAllowToEdit ? null : this.openEditProtocolModal())}>
            <span>Edit</span>
          </a>
        </td>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="edit-protocol" show={this.state.editProtocolModalOpen} onHide={this.closeEditProtocolModal}>
          <Modal.Header>
            <Modal.Title>Edit Protocol</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeEditProtocolModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <EditProtocolForm {...initialValues} item={this.props.item} onSubmit={this.editLocalProtocol} />
            </div>
          </Modal.Body>
        </Modal>

      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  editProtocolProcess: selectEditProtocolProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RowItem);
