import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';

import CenteredModal from '../../../components/CenteredModal/index';
import EditProtocolForm from '../EditProtocolForm';
import ExpandedItem from './ExpandedItem';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editUser: PropTypes.func,
    protocols: PropTypes.array,
    deleteUser: PropTypes.func,
    searchFormValues: React.PropTypes.object,
    editProtocol: PropTypes.func,
    currentUser: React.PropTypes.object,
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
    _.forEach(this.props.protocols, (protocol) => {
      const value = (this.props.item.id === protocol.id);
      options.push({
        id: protocol.id,
        name: protocol.number,
        value,
      });
    });

    let shouldBeOpened = false;

    const assignedUsersContent = this.props.item.sponsorUsers.map((item, index) => {
      if (this.props.searchFormValues.name && `${item.user.firstName} ${item.user.lastName}`.toLowerCase().indexOf(this.props.searchFormValues.name.toLowerCase()) !== -1) {
        shouldBeOpened = true;
      }

      _.forEach(options, (option, index) => {
        options[index].value = _.find(item.studies, (o) => (o.protocol_id === option.id));
      });

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
        protocolNumber: this.props.item.protocol.number,
        indication: this.props.item.indication.name,
        cro: this.props.item.cro ? this.props.item.cro.name : '',
        irb: this.props.item.irbName,
        iwrs: this.props.item.iwrs,
        id: this.props.item.id,
      },
    };

    return (
      <tr>
        <td className="col1">
          {this.props.item.protocol.number}
        </td>
        <td className="col2">
          {this.props.item.indication.name}
        </td>
        <td className="col3">
          {this.props.item.cro ? this.props.item.cro.name : ''}
        </td>
        <td className="col4">
          {this.props.item.irbName}
        </td>
        <td className="col5">
          {this.props.item.iwrs}
        </td>
        <td className="col6">

          <span>ASSIGNED USERS ({assignedUsersContent.length ? assignedUsersContent.length : 0})</span>
          {(this.state.assignedUsersCollapsed && !shouldBeOpened)
            ? <a className="btn add-more-trs" onClick={this.toggleAssignedUsers}></a>
            : <a className="btn add-more-trs active " onClick={this.toggleAssignedUsers}></a>
          }
          {(!this.state.assignedUsersCollapsed || shouldBeOpened) &&
            <div className="assigned-users-list">{assignedUsersContent}</div>
          }

        </td>
        <td className="col7">
          { (this.props.currentUser.roleForSponsor.name === 'Super Admin' || this.props.currentUser.roleForSponsor.name === 'Admin') &&
            <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openEditProtocolModal}>
              <span>Edit</span>
            </a>
          }
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RowItem);
