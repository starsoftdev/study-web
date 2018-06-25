// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

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
          System.import('./containers/HomePage/reducer'),
          System.import('./containers/HomePage/AdminDashboard/reducer'),
          System.import('./containers/HomePage/sagas'),
          System.import('./containers/HomePage'),
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
          System.import('./containers/CalendarPage/reducer'),
          System.import('./containers/CalendarPage/sagas'),
          System.import('./containers/CalendarPage'),
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
        System.import('./components/ConfirmPasswordChangeForm')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/order-irb-ad-creation',
      name: 'IrbAdCreationPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/IrbAdCreationPage/reducer'),
          System.import('./containers/IrbAdCreationPage/sagas'),
          System.import('./containers/IrbAdCreationPage'),
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
          System.import('./containers/IrbAdCreationPage/reducer'),
          System.import('./containers/IrbAdCreationPage/sagas'),
          System.import('./containers/IrbAdCreationPage'),
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
          System.import('./containers/PatientDatabasePage/reducer'),
          System.import('./containers/PatientDatabasePage/sagas'),
          System.import('./containers/PatientDatabasePage'),
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
      path: '/app/upload-patients',
      name: 'uploadPatientsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/UploadPatients/reducer'),
          System.import('./containers/UploadPatients/sagas'),
          System.import('./containers/UploadPatients'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('uploadPatientsPage', reducer.default);
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
          System.import('./containers/PaymentInformationPage/reducer'),
          System.import('./containers/PaymentInformationPage/sagas'),
          System.import('./containers/PaymentInformationPage'),
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
          System.import('./containers/ProfilePage/reducer'),
          System.import('./containers/ProfilePage/sagas'),
          System.import('./containers/ProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('profilePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    // TODO uncomment when the proposals feature is done in v1.1, disabled proposals page for now
    }, {
      onEnter: redirectToLogin,
      path: '/app/proposals',
      name: 'proposals',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/Proposals/reducer'),
          System.import('./containers/Proposals/sagas'),
          System.import('./containers/Proposals'),
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
          System.import('./containers/ReferPage/reducer'),
          System.import('./containers/ReferPage/sagas'),
          System.import('./containers/ReferPage'),
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
      path: '/app/help-support',
      name: 'helpSupportPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/HelpSupportPage/reducer'),
          System.import('./containers/HelpSupportPage/sagas'),
          System.import('./containers/HelpSupportPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('HelpSupportPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/tutorials',
      name: 'videoPage',
      getComponent(nextState, cb) {
        System.import('./containers/VideoPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/list-new-study',
      name: 'listNewStudyPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/ListNewStudyPage/reducer'),
          System.import('./containers/ListNewStudyPage/sagas'),
          System.import('./containers/ListNewStudyPage'),
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
      path: '/app/list-new-protocol',
      name: 'listNewProtocolPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/ListNewProtocolPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
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
          System.import('./containers/RewardsPage/reducer'),
          System.import('./containers/RewardsPage/sagas'),
          System.import('./containers/RewardsPage'),
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
          System.import('./containers/RequestProposalPage/reducer'),
          System.import('./containers/RequestProposalPage/sagas'),
          System.import('./containers/RequestProposalPage'),
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
          System.import('./containers/RequestProposalPage/reducer'),
          System.import('./containers/RequestProposalPage/sagas'),
          System.import('./containers/RequestProposalPage'),
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
      path: '/app/set-new-password',
      name: 'setNewPasswordPage',
      getComponent(nextState, cb) {
        System.import('./containers/SetNewPasswordPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/sites-users',
      name: 'sitesUsersPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/SitesUsersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/study/:id',
      name: 'studyPage',
      getComponent(nextState, cb) {
        if (isNaN(nextState.params.id)) {
          System.import('./containers/NotFoundPage')
            .then(loadModule(cb))
            .catch(errorLoading);
        } else {
          const importModules = Promise.all([
            System.import('./containers/StudyPage/reducer'),
            System.import('./containers/StudyPage/sagas'),
            System.import('./containers/StudyPage'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('studyPage', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        }
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/receipts',
      name: 'receipts',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/Receipts/reducer'),
          System.import('./containers/Receipts/sagas'),
          System.import('./containers/Receipts'),
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

        System.import('./containers/NotificationsPage')
          .then(component => renderRoute(component))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/report',
      name: 'reportPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/ReportViewPage/reducer'),
          System.import('./containers/ReportViewPage/sagas'),
          System.import('./containers/ReportViewPage'),
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
      path: '/app/manage-users',
      name: 'sponsorManageUsersPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/SponsorManageUsers/reducer'),
          System.import('./containers/SponsorManageUsers/sagas'),
          System.import('./containers/SponsorManageUsers'),
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
          System.import('./containers/SearchByProtocolPage/reducer'),
          System.import('./containers/SearchByProtocolPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('searchByProtocolPage', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/receipts-project-agreements',
      name: 'projectAgreementsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/ProjectAgreementsPage/reducer'),
          System.import('./containers/ProjectAgreementsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('projectAgreementsPage', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-sponsor',
      name: 'dashboardSponsorPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardSponsorPage/reducer'),
          System.import('./containers/DashboardSponsorPage/sagas'),
          System.import('./containers/DashboardSponsorPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardSponsorPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-client-admins',
      name: 'dashboardClientAdminsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardClientAdminsPage/reducer'),
          System.import('./containers/DashboardClientAdminsPage/sagas'),
          System.import('./containers/DashboardClientAdminsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardClientAdminsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-manage-users',
      name: 'dashboardManageUsersPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardManageUsers/reducer'),
          System.import('./containers/DashboardManageUsers/sagas'),
          System.import('./containers/DashboardManageUsers'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardManageUsersPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-locked-users',
      name: 'dashboardLockedUsersPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardLockedUsers/reducer'),
          System.import('./containers/DashboardLockedUsers/sagas'),
          System.import('./containers/DashboardLockedUsers'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardLockedUsersPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-protocol',
      name: 'dashboardProtocolPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardProtocolPage/reducer'),
          System.import('./containers/DashboardProtocolPage/sagas'),
          System.import('./containers/DashboardProtocolPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardProtocolPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-cro',
      name: 'dashboardCROPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardCROPage/reducer'),
          System.import('./containers/DashboardCROPage/sagas'),
          System.import('./containers/DashboardCROPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardCROPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-messaging-numbers',
      name: 'dashboardMessagingNumbersPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardMessagingNumbersPage/reducer'),
          System.import('./containers/DashboardMessagingNumbersPage/sagas'),
          System.import('./containers/DashboardMessagingNumbersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardMessagingNumbersPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-messaging-numbers/add',
      name: 'dashboardAddMessagingNumberPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardMessagingNumbersPage/reducer'),
          System.import('./containers/DashboardMessagingNumbersPage/sagas'),
          System.import('./containers/DashboardMessagingNumbersPage/DashboardAddMessagingNumberPage/'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardMessagingNumbersPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-exposure-level',
      name: 'dashboardExposureLevelPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardExposureLevelPage/reducer'),
          System.import('./containers/DashboardExposureLevelPage/sagas'),
          System.import('./containers/DashboardExposureLevelPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardExposureLevelPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/coupon',
      name: 'dashboardCouponPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardCouponPage/reducer'),
          System.import('./containers/DashboardCouponPage/sagas'),
          System.import('./containers/DashboardCouponPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardCouponPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-indication',
      name: 'dashboardIndicationPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardIndicationPage/reducer'),
          System.import('./containers/DashboardIndicationPage/sagas'),
          System.import('./containers/DashboardIndicationPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardIndicationPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-sponsor-admins',
      name: 'dashboardSponsorAdminPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardSponsorAdminPage/reducer'),
          System.import('./containers/DashboardSponsorAdminPage/sagas'),
          System.import('./containers/DashboardSponsorAdminPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardSponsorAdminPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-portals',
      name: 'dashboardPortalsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardPortalsPage/reducer'),
          System.import('./containers/DashboardPortalsPage/sagas'),
          System.import('./containers/DashboardPortalsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardPortalsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/app/dashboard-reset-password',
      name: 'dashboardResetPasswordPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/DashboardResetPasswordPage/reducer'),
          System.import('./containers/DashboardResetPasswordPage/sagas'),
          System.import('./containers/DashboardResetPasswordPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardResetPasswordPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/app/cc/home',
      name: 'callCenterHomePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/CallCenterHomePage/reducer'),
          System.import('./containers/CallCenterHomePage/sagas'),
          System.import('./containers/CallCenterHomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('callCenterHomePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/app/cc/patient/:id',
      name: 'callCenterPatientPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/CallCenterPatientPage/reducer'),
          System.import('./containers/CallCenterPatientPage/sagas'),
          System.import('./containers/CallCenterPatientPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('callCenterPatientPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/app/vendor/admins',
      name: 'vendorAdminPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/Vendor/Admin/reducer'),
          System.import('./containers/Vendor/Admin/sagas'),
          System.import('./containers/Vendor/Admin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('callCenterPatientPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/app*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('./containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
