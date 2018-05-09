import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectClientRoles, selectSelectedSite, selectSelectedUser } from '../../containers/App/selectors';
import { fetchSite, fetchUser } from '../../containers/App/actions';
import LoadingSpinner from '../../components/LoadingSpinner';
import { normalizePhoneDisplay } from '../../../app/common/helper/functions';
import { formatTimezone } from '../../utils/time';
import { translate } from '../../../common/utilities/localization';

class ClientSiteItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    piFirstName: PropTypes.string,
    piLastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.string,
    roles: PropTypes.object,
    selectedSite: PropTypes.object,
    selectedUser: PropTypes.object,
    fetchSite: PropTypes.func,
    fetchUser: PropTypes.func,
    userFilter: PropTypes.any,
    bDisabled: PropTypes.bool,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    timezone: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      assignedUsersCollapsed: true,
    };

    this.toggleAssignedUsers = this.toggleAssignedUsers.bind(this);
    this.editSite = this.editSite.bind(this);
    this.renderSiteUsers = this.renderSiteUsers.bind(this);
  }

  toggleAssignedUsers() {
    const collapsed = !this.state.assignedUsersCollapsed;
    this.setState({ assignedUsersCollapsed: collapsed });
  }

  editSite() {
    this.props.fetchSite(this.props.id);
  }

  editAssignedUser(assignedUser) {
    this.props.fetchUser(assignedUser.user.id);
  }

  currentSiteIsBeingFetched() {
    const { selectedSite, id } = this.props;

    return (selectedSite.fetching && selectedSite.id === id);
  }

  assignedUserIsBeingFetched(assignedUser) {
    const { selectedUser } = this.props;

    return (selectedUser.fetching && selectedUser.id === assignedUser.id);
  }

  renderSiteUsers() {
    const { id, roles, userFilter } = this.props;
    let assignedUsersContent;
    const allAssignedUsers = roles.details.filter(item => (item.user && !item.user.isArchived && !item.isAdmin && item.site_id === id));
    const filtredAssignedUsers = allAssignedUsers.filter(item => (!userFilter || `${item.user.firstName} ${item.user.lastName}`.toLowerCase().indexOf(userFilter.toLowerCase()) !== -1));

    let shouldBeOpened = false;

    if (roles.details) {
      assignedUsersContent = filtredAssignedUsers.map(item => {
        if (userFilter && `${item.user.firstName} ${item.user.lastName}`.toLowerCase().indexOf(userFilter.toLowerCase()) !== -1) {
          shouldBeOpened = true;
        }
        return (
          <div className="assigned-user" key={item.id}>
            <span>{item.user.firstName} {item.user.lastName}</span>
            <span className="edit-assigned-user">
              {(this.assignedUserIsBeingFetched(item))
                ? <span><LoadingSpinner showOnlyIcon size={20} className="fetching-assigned-user" /></span>
                : <a disabled={this.props.bDisabled} className="btn toggle edit-icon" onClick={() => (this.props.bDisabled ? null : this.editAssignedUser(item))}><i className="pencil-square" /></a>
              }
            </span>
          </div>
        );
      });
    } else {
      assignedUsersContent = [];
    }

    return (
      <td className="assigned-users">
        <div className="toggle-assigned-users">
          <span>{translate('client.component.clientSiteItem.assignedUsers')} ({allAssignedUsers.length ? allAssignedUsers.length : 0})</span>
          {(this.state.assignedUsersCollapsed && !shouldBeOpened)
            ? <a className="btn toggle toggle-plus" onClick={this.toggleAssignedUsers} />
            : <a className="btn toggle toggle-minus" onClick={this.toggleAssignedUsers} />
          }
        </div>
        {(!this.state.assignedUsersCollapsed || shouldBeOpened) &&
        <div className="assigned-users-list">{assignedUsersContent}</div>
        }
      </td>
    );
  }

  render() {
    const { name, phoneNumber, address, city, zip, state, timezone } = this.props;

    const addressArr = (address) ? address.split(',') : [];

    return (
      <tr className="client-site-container fs-hide">
        <td className="name">
          <span>{name}</span>
        </td>
        <td className="phoneNumber">
          <span>{normalizePhoneDisplay(phoneNumber)}</span>
        </td>
        <td className="address">
          <span>{`${addressArr[0] || ''}`}<br />{`${city || ''}`}{`${city && state ? ',' : ''}`} {`${state || ''}`} {`${zip || ''}`}</span>
        </td>
        <td className="timezone">
          <span>{formatTimezone(timezone, city)}</span>
        </td>
        {this.renderSiteUsers()}
        <td className="action">
          <button type="button" className="btn btn-primary btn-edit-site pull-right" onClick={this.editSite} disabled={(this.currentSiteIsBeingFetched() || this.props.bDisabled)}>
            {(this.currentSiteIsBeingFetched())
              ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
              : <span>{translate('client.component.clientSiteItem.editBtn')}</span>
            }
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  roles: selectClientRoles(),
  selectedSite: selectSelectedSite(),
  selectedUser: selectSelectedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSite: (id) => dispatch(fetchSite(id)),
    fetchUser: (id) => dispatch(fetchUser(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientSiteItem);
