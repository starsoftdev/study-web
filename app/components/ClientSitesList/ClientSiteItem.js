import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find } from 'lodash';
import { selectClientRoles, selectSelectedSite, selectSelectedUser } from '../../containers/App/selectors';
import { fetchSite, fetchUser } from '../../containers/App/actions';
import LoadingSpinner from '../../components/LoadingSpinner';
import { normalizePhoneDisplay } from '../../../app/common/helper/functions';

class ClientSiteItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    piFirstName: PropTypes.string,
    piLastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.string,
    roles: PropTypes.object,
    principalInvestigators: PropTypes.array,
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

  componentWillReceiveProps(newProps) {
    const { roles, userFilter } = newProps;

    const filteredUser = find(roles, (item) => {
      if (userFilter.trim() === '') {
        return false;
      }
      const fullName = `${item.user.firstName} ${item.user.lastName}`;
      return (fullName.toUpperCase().includes(userFilter.toUpperCase()));
    });

    this.setState({ assignedUsersCollapsed: !filteredUser });
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
    const { id, roles } = this.props;
    let assignedUsersContent;
    if (roles.details) {
      assignedUsersContent = roles.details.filter(item => (
        item.user && !item.user.isArchived && !item.isAdmin && item.site_id === id
      )).map(item => ((
        <div className="assigned-user" key={item.id}>
          <span>{item.user.firstName} {item.user.lastName}</span>
          <span className="edit-assigned-user">
            {(this.assignedUserIsBeingFetched(item))
              ? <span><LoadingSpinner showOnlyIcon size={20} className="fetching-assigned-user" /></span>
              : <a disabled={this.props.bDisabled} className="btn toggle edit-icon" onClick={() => (this.props.bDisabled ? null : this.editAssignedUser(item))}><i className="pencil-square" /></a>
            }
          </span>
        </div>
      )));
    } else {
      assignedUsersContent = [];
    }

    return (
      <td className="assigned-users">
        <div className="toggle-assigned-users">
          <span>ASSIGNED USERS ({assignedUsersContent.length ? assignedUsersContent.length : 0})</span>
          {(this.state.assignedUsersCollapsed)
            ? <a className="btn toggle toggle-plus" onClick={this.toggleAssignedUsers} />
            : <a className="btn toggle toggle-minus" onClick={this.toggleAssignedUsers} />
          }
        </div>
        {(!this.state.assignedUsersCollapsed) &&
        <div className="assigned-users-list">{assignedUsersContent}</div>
        }
      </td>
    );
  }

  render() {
    const { name, piFirstName, piLastName, phoneNumber, address, city, zip, state, principalInvestigators, timezone } = this.props;
    let piNode = '';
    if (principalInvestigators) {
      for (const pi of principalInvestigators) {
        if (pi.active) {
          piNode = <span>{pi.firstName} {pi.lastName}<br /></span>;
        }
      }
    }

    if (piFirstName && piLastName) {
      piNode = <span>{piFirstName} {piLastName}<br /></span>;
    }

    const addressArr = address.split(',');

    return (
      <tr className="client-site-container">
        <td className="name">
          <span>{name}</span>
        </td>
        <td className="principal-investigator">
          {piNode}
        </td>
        <td className="phoneNumber">
          <span>{normalizePhoneDisplay(phoneNumber)}</span>
        </td>
        <td className="address">
          <span>{addressArr[0]}<br />{city}, {state} {zip}</span>
        </td>
        <td className="timezone">
          <span>{timezone.replace(/_/g, ' ')}</span>
        </td>
        {this.renderSiteUsers()}
        <td className="action">
          <button type="button" className="btn btn-primary btn-edit-site pull-right" onClick={this.editSite} disabled={(this.currentSiteIsBeingFetched() || this.props.bDisabled)}>
            {(this.currentSiteIsBeingFetched())
              ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
              : <span>Edit</span>
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
