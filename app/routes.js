// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = cb => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const {
    injectReducer,
    injectSagas,
    redirectToDashboard,
    redirectToLogin,
  } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      onEnter: redirectToLogin,
      path: '/app',
      name: 'homePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage/reducer'),
          System.import('containers/HomePage/AdminDashboard/reducer'),
          System.import('containers/HomePage/sagas'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, dashboardReducer, sagas, component]) => {
          injectReducer('homePage', reducer.default);
          injectReducer('dashboardPage', dashboardReducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/calendar',
      name: 'calendarPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/CalendarPage/reducer'),
          System.import('containers/CalendarPage/sagas'),
          System.import('containers/CalendarPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('calendarPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/confirm-password-change',
      name: 'confirmPasswordChangePage',
      getComponent(nextState, cb) {
        System.import('components/ConfirmPasswordChangeForm')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/order-irb-ad-creation',
      name: 'IrbAdCreationPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/IrbAdCreationPage/reducer'),
          System.import('containers/IrbAdCreationPage/sagas'),
          System.import('containers/IrbAdCreationPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('IrbAdCreationPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/order-irb-ad-creation/:id',
      name: 'IrbAdCreationPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/IrbAdCreationPage/reducer'),
          System.import('containers/IrbAdCreationPage/sagas'),
          System.import('containers/IrbAdCreationPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('IrbAdCreationPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/patient-database',
      name: 'patientDatabasePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/PatientDatabasePage/reducer'),
          System.import('containers/PatientDatabasePage/sagas'),
          System.import('containers/PatientDatabasePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('patientDatabasePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/payment-information',
      name: 'paymentInformationPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/PaymentInformationPage/reducer'),
          System.import('containers/PaymentInformationPage/sagas'),
          System.import('containers/PaymentInformationPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('paymentInformationPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/:userId/profile',
      name: 'profilePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ProfilePage/reducer'),
          System.import('containers/ProfilePage/sagas'),
          System.import('containers/ProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('profilePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/proposals',
      name: 'proposals',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Proposals/reducer'),
          System.import('containers/Proposals/sagas'),
          System.import('containers/Proposals'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('proposals', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/refer',
      name: 'referPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ReferPage/reducer'),
          System.import('containers/ReferPage/sagas'),
          System.import('containers/ReferPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('referPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/badges',
      name: 'badgesPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/BadgesPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/list-new-study',
      name: 'listNewStudyPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ListNewStudyPage/reducer'),
          System.import('containers/ListNewStudyPage/sagas'),
          System.import('containers/ListNewStudyPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('listNewStudyPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/rewards',
      name: 'rewardsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/RewardsPage/reducer'),
          System.import('containers/RewardsPage/sagas'),
          System.import('containers/RewardsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rewardsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/request-proposal',
      name: 'requestProposalPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/RequestProposalPage/reducer'),
          System.import('containers/RequestProposalPage/sagas'),
          System.import('containers/RequestProposalPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('requestProposalPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/request-proposal/:id',
      name: 'requestProposalPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/RequestProposalPage/reducer'),
          System.import('containers/RequestProposalPage/sagas'),
          System.import('containers/RequestProposalPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('requestProposalPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/app/reset-password',
      name: 'resetPasswordPage',
      getComponent(nextState, cb) {
        System.import('containers/ResetPasswordPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/app/set-new-password',
      name: 'setNewPasswordPage',
      getComponent(nextState, cb) {
        System.import('containers/SetNewPasswordPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/sites-users',
      name: 'sitesUsersPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SitesUsersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/studies/:id/sites/:siteId',
      name: 'studyPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/StudyPage/reducer'),
          System.import('containers/StudyPage/sagas'),
          System.import('containers/StudyPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('studyPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/app/manage-transfer-number',
      name: 'manageTransferNumberPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ManageTransferNumberPage/reducer'),
          System.import('containers/ManageTransferNumberPage/sagas'),
          System.import('containers/ManageTransferNumberPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('manageTransferNumberPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/receipts',
      name: 'receipts',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Receipts/reducer'),
          System.import('containers/Receipts/sagas'),
          System.import('containers/Receipts'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('receipts', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/notifications',
      name: 'notificationPage',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);

        System.import('containers/NotificationsPage')
          .then(component => renderRoute(component))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/report',
      name: 'reportPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ReportViewPage/reducer'),
          System.import('containers/ReportViewPage/sagas'),
          System.import('containers/ReportViewPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('reportPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/protocol-users',
      name: 'sponsorManageUsersPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SponsorManageUsers/reducer'),
          System.import('containers/SponsorManageUsers/sagas'),
          System.import('containers/SponsorManageUsers'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('sponsorManageUsersPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/find-out-how-many-sites-are-listing-your-protocol',
      name: 'searchByProtocolPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SearchByProtocolPage/reducer'),
          System.import('containers/SearchByProtocolPage/sagas'),
          System.import('containers/SearchByProtocolPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('searchByProtocolPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/project-agreements',
      name: 'projectAgreementsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ProjectAgreementsPage/reducer'),
          System.import('containers/ProjectAgreementsPage/sagas'),
          System.import('containers/ProjectAgreementsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('projectAgreementsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/app*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
