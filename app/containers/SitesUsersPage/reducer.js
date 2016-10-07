import { forEach, map, remove, cloneDeep, findIndex } from 'lodash';

import {
  FETCH_CLIENT_SITES,
  FETCH_CLIENT_SITES_SUCCESS,
  FETCH_CLIENT_SITES_ERROR,

  FETCH_CLIENT_ROLES,
  FETCH_CLIENT_ROLES_SUCCESS,
  FETCH_CLIENT_ROLES_ERROR,

  FETCH_SITE,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_ERROR,

  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,

  CLEAR_SELECTED_SITE,
  CLEAR_SELECTED_USER,

  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,

  DELETE_CLIENT_ROLE,
  DELETE_CLIENT_ROLE_SUCCESS,
  DELETE_CLIENT_ROLE_ERROR,

  SAVE_SITE,
  SAVE_SITE_SUCCESS,
  SAVE_SITE_ERROR,

  SAVE_USER,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,
} from './constants';

const initialState = {
  clientSites: {
    details: [],
    fetching: false,
    error: null,
  },
  clientRoles: {
    details: [],
    fetching: false,
    error: null,
  },
  selectedSite: {
    details: null,
    fetching: false,
    error: null,
  },
  selectedUser: {
    details: null,
    fetching: false,
    error: null,
  },
  deletedUser: {
    details: null,
    deleting: false,
    error: null,
  },
  deletedClientRole: {
    details: null,
    deleting: false,
    error: null,
  },
  savedSite: {
    details: null,
    saving: false,
    error: null,
  },
  savedUser: {
    details: null,
    saving: false,
    error: null,
  },
};

export default function sitesUsersPageReducer(state = initialState, action) {
  const { payload } = action;
  const clientSitesCollection = map(state.clientSites.details, cloneDeep);
  const clientRolesCollection = map(state.clientRoles.details, cloneDeep);
  let foundIndex = -1;

  switch (action.type) {
    case FETCH_CLIENT_SITES:
      return {
        ...state,
        clientSites: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_CLIENT_SITES_SUCCESS:
      return {
        ...state,
        clientSites: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_CLIENT_SITES_ERROR:
      return {
        ...state,
        clientSites: {
          details: [],
          fetching: false,
          error: payload,
        },
      };
    case FETCH_CLIENT_ROLES:
      return {
        ...state,
        clientRoles: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_CLIENT_ROLES_SUCCESS:
      return {
        ...state,
        clientRoles: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_CLIENT_ROLES_ERROR:
      return {
        ...state,
        clientRoles: {
          details: [],
          fetching: false,
          error: payload,
        },
      };
    case FETCH_SITE:
      return {
        ...state,
        selectedSite: {
          details: null,
          id: action.id,
          fetching: true,
          error: null,
        },
      };
    case FETCH_SITE_SUCCESS:
      return {
        ...state,
        selectedSite: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_SITE_ERROR:
      return {
        ...state,
        selectedSite: {
          details: null,
          fetching: false,
          error: payload,
        },
      };
    case FETCH_USER:
      return {
        ...state,
        selectedUser: {
          details: null,
          id: action.id,
          fetching: true,
          error: null,
        },
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        selectedUser: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        selectedUser: {
          details: null,
          fetching: false,
          error: payload,
        },
      };
    case CLEAR_SELECTED_SITE:
      return {
        ...state,
        selectedSite: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case CLEAR_SELECTED_USER:
      return {
        ...state,
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case DELETE_USER:
      return {
        ...state,
        deletedUser: {
          details: null,
          deleting: true,
          error: null,
        },
      };
    case DELETE_USER_SUCCESS:
      forEach(clientSitesCollection, item => {
        if (remove(item.users, { id: payload.id }).length > 0) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        deletedUser: {
          details: payload,
          deleting: false,
          error: null,
        },
        clientSites: {
          details: clientSitesCollection,
          fetching: false,
          error: null,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        deletedUser: {
          details: null,
          deleting: false,
          error: payload,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case DELETE_CLIENT_ROLE:
      return {
        ...state,
        deletedClientRole: {
          details: null,
          deleting: true,
          error: null,
        },
      };
    case DELETE_CLIENT_ROLE_SUCCESS:
      remove(clientRolesCollection, { id: payload.id });
      return {
        ...state,
        deletedClientRole: {
          details: payload,
          deleting: false,
          error: null,
        },
        clientRoles: {
          details: clientRolesCollection,
          fetching: false,
          error: null,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case DELETE_CLIENT_ROLE_ERROR:
      return {
        ...state,
        deletedClientRole: {
          details: null,
          deleting: false,
          error: payload,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case SAVE_SITE:
      return {
        ...state,
        savedSite: {
          details: null,
          saving: true,
          error: null,
        },
      };
    case SAVE_SITE_SUCCESS:
      foundIndex = findIndex(clientSitesCollection, { id: payload.id });
      if (!payload.users) {
        payload.users = [];
      }
      if (foundIndex < 0) {
        clientSitesCollection.push(payload);
      } else {
        clientSitesCollection[foundIndex] = payload;
      }
      return {
        ...state,
        savedSite: {
          details: payload,
          saving: false,
          error: null,
        },
        clientSites: {
          details: clientSitesCollection,
          fetching: false,
          error: null,
        },
        selectedSite: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case SAVE_SITE_ERROR:
      return {
        ...state,
        savedSite: {
          details: null,
          saving: false,
          error: payload,
        },
        selectedSite: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case SAVE_USER:
      return {
        ...state,
        savedUser: {
          details: null,
          saving: true,
          error: null,
        },
      };
    case SAVE_USER_SUCCESS:
      if (payload.userType === 'admin') {
        forEach(clientSitesCollection, item => {
          if (remove(item.users, { id: payload.userResultData.user.id }).length > 0) {
            return false;
          }
          return true;
        });
      } else if (payload.userType === 'nonAdmin') {
        forEach(clientSitesCollection, item => {
          foundIndex = findIndex(item.users, { id: payload.userResultData.user.id });
          if (foundIndex > -1) {
            if (item.id === payload.userResultData.siteId) {
              item.users[foundIndex] = payload.userResultData.user; // eslint-disable-line
            } else {
              item.users.splice(foundIndex, 1);
              foundIndex = -1;
            }
            return false;
          }
          return true;
        });
        if (foundIndex < 0) {
          foundIndex = findIndex(clientSitesCollection, { id: payload.userResultData.siteId });
          if (foundIndex > -1) {
            clientSitesCollection[foundIndex].users.push(payload.userResultData.user);
          }
        }
      }

      foundIndex = findIndex(clientRolesCollection, (item) => (item.user.id === payload.userResultData.user.id));
      if (payload.userType === 'admin') {
        if (foundIndex < 0) {
          clientRolesCollection.push(payload.userResultData);
        } else {
          clientRolesCollection[foundIndex] = payload.userResultData;
        }
      } else if (payload.userType === 'nonAdmin') {
        if (foundIndex > -1) {
          clientRolesCollection.splice(foundIndex, 1);
        }
      }

      return {
        ...state,
        savedUser: {
          details: payload,
          saving: false,
          error: null,
        },
        clientSites: {
          details: clientSitesCollection,
          fetching: false,
          error: null,
        },
        clientRoles: {
          details: clientRolesCollection,
          fetching: false,
          error: null,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case SAVE_USER_ERROR:
      return {
        ...state,
        savedUser: {
          details: null,
          saving: false,
          error: payload,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    default:
      return state;
  }
}
