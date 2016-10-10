import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSelectedUser } from 'containers/SitesUsersPage/selectors';
import { fetchUser } from 'containers/SitesUsersPage/actions';
import LoadingSpinner from 'components/LoadingSpinner';

class ClientRoleItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    reward: PropTypes.bool,
    purchase: PropTypes.bool,
    user: PropTypes.object,
    selectedUser: PropTypes.object,
    fetchUser: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.editUser = this.editUser.bind(this);
  }

  editUser() {
    this.props.fetchUser(this.props.user.id);
  }

  currentUserIsBeingFetched() {
    const { selectedUser, user } = this.props;

    return (selectedUser.fetching && selectedUser.id === user.id);
  }

  render() {
    const { name, reward, purchase, user } = this.props;
    let accessStr = '';
    const isSuperAdmin = (name === 'Super Admin');

    if (isSuperAdmin) {
      accessStr = name;
    } else if (purchase && reward) {
      accessStr = 'All Access';
    } else if (purchase && !reward) {
      accessStr = 'Purchase';
    } else if (!purchase && reward) {
      accessStr = 'Rewards';
    } else {
      accessStr = 'No Access';
    }

    return (
      <tr className="client-role-container">
        <td className="name">
          <span>{user.firstName} {user.lastName}</span>
        </td>
        <td className="email">
          <span>{user.email}</span>
        </td>
        <td className="access">
          <span>{accessStr}</span>
        </td>
        <td className="action">
          {!isSuperAdmin &&
            <button type="button" className="btn btn-primary btn-edit-user pull-right" onClick={this.editUser} disabled={(this.currentUserIsBeingFetched())}>
              {(this.currentUserIsBeingFetched())
                ? <span><LoadingSpinner showOnlyIcon size={20} className="fetching-user" /></span>
                : <span>Edit</span>
              }
            </button>
          }
        </td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedUser: selectSelectedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientRoleItem);
