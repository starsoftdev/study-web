import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSelectedUser } from '../../containers/App/selectors';
import { fetchUser } from '../../containers/App/actions';
import LoadingSpinner from '../../components/LoadingSpinner';

class ClientRoleItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    canRedeemRewards: PropTypes.bool,
    canPurchase: PropTypes.bool,
    user: PropTypes.object,
    selectedUser: PropTypes.object,
    fetchUser: PropTypes.func,
    bDisabled: PropTypes.bool,
    currentUser: PropTypes.object,
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
    const { name, canRedeemRewards, canPurchase, user, currentUser } = this.props;
    let accessStr = '';
    let cEdit = false;
    const isSuperAdmin = (name === 'Super Admin');

    if (isSuperAdmin) {
      accessStr = 'ADMIN';
      cEdit = true;
    } else if (canPurchase && canRedeemRewards) {
      accessStr = 'ALL ACCESS';
      if (currentUser.roleForClient.canPurchase && currentUser.roleForClient.canRedeemRewards) {
        cEdit = true;
      }
    } else if (canPurchase && !canRedeemRewards) {
      accessStr = 'PURCHASE';
      if (currentUser.roleForClient.canPurchase) {
        cEdit = true;
      }
    } else if (!canPurchase && canRedeemRewards) {
      accessStr = 'REWARDS';
      if (currentUser.roleForClient.canRedeemRewards) {
        cEdit = true;
      }
    } else {
      accessStr = 'SITE LOCATION';
      if ((currentUser.roleForClient.canPurchase && currentUser.roleForClient.canRedeemRewards) ||
        (!currentUser.roleForClient.canPurchase && !currentUser.roleForClient.canRedeemRewards)) {
        cEdit = true;
      }
    }

    return (
      <tr className="client-role-container fs-hide">
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
            <button
              type="button"
              className="btn btn-primary btn-edit-user pull-right"
              onClick={this.editUser}
              disabled={(!currentUser.roleForClient.isAdmin || this.currentUserIsBeingFetched() || !cEdit)}
            >
              {(this.currentUserIsBeingFetched())
                ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
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
