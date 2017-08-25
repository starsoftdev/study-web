/**
 * Created by mike on 10/11/16.
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collapse from 'react-bootstrap/lib/Collapse';
import { normalizePhoneDisplay } from '../../common/helper/functions';
import {
  selectAllClientUsers,
} from '../../containers/HomePage/AdminDashboard/selectors';
import {
  fetchAllClientUsersDashboard,
} from '../../containers/HomePage/AdminDashboard/actions';

import EditInformationForm from './EditInformationForm';

const mapStateToProps = createStructuredSelector({
  allClientUsers: selectAllClientUsers(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllClientUsersDashboard: (clientId, siteId) => dispatch(fetchAllClientUsersDashboard(clientId, siteId)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class EditInformationModal extends React.Component {
  static propTypes = {
    allClientUsers: PropTypes.object.isRequired,
    addEmailNotificationClick: PropTypes.func.isRequired,
    fetchAllClientUsersDashboard: PropTypes.func.isRequired,
    study: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
  };

  static emailNotificationFields = [];
  static checkAllEmailNotificationFields = false;

  constructor(props) {
    super(props);
    this.getEditStudyInitialValues = this.getEditStudyInitialValues.bind(this);
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps) {
    const { allClientUsers, fetchAllClientUsersDashboard, openModal, study } = this.props;
    if (study && allClientUsers.fetching && !nextProps.allClientUsers.fetching) {
      let studyEmailUsers = study.study_notification_users;

      this.emailNotificationFields = [];
      if (studyEmailUsers) { // notification emails
        studyEmailUsers = studyEmailUsers.substr(studyEmailUsers.indexOf('{') + 1);
        studyEmailUsers = studyEmailUsers.substr(0, studyEmailUsers.indexOf('}'));
        studyEmailUsers = studyEmailUsers.split(',');

        let isAllChecked = true;
        nextProps.allClientUsers.details.forEach(item => {
          const isChecked = _.find(studyEmailUsers, (o) => (parseInt(o) === item.user_id));
          if (!isChecked) {
            isAllChecked = false;
          }
          // set internal state to hold the value for the fields without re-rendering
          this.emailNotificationFields.push({
            email: item.email,
            userId: item.user_id,
            isChecked,
          });
        });
        // set internal state to hold the value for the field boolean without re-rendering
        this.checkAllEmailNotificationFields = isAllChecked;
      }
    } else if (study && !openModal && nextProps.openModal) {
      // fetch more information about the users, the tagged indications, and the messaging numbers
      fetchAllClientUsersDashboard(study.client_id, study.site_id);
    }
  }


  getEditStudyInitialValues(study) {
    const initialValues = Object.assign({}, study);
    initialValues.recruitment_phone = normalizePhoneDisplay(initialValues.recruitment_phone);
    initialValues.site = study.site_id;
    delete initialValues.site_id;
    initialValues.messagingNumber = study.text_number_id;
    delete initialValues.text_number_id;
    initialValues.emailNotifications = this.emailNotificationFields;
    initialValues.checkAllInput = this.checkAllEmailNotificationFields;

    return initialValues;
  }

  renderModalContent() {
    const { addEmailNotificationClick, openModal, onClose, study } = this.props;
    if (openModal) {
      const initialValues = this.getEditStudyInitialValues(study);
      return (
        <div>
          <div className="form-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">INFO</strong>
                <a className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right" /></a>
              </div>
            </div>
            <EditInformationForm
              addEmailNotificationClick={addEmailNotificationClick}
              initialValues={initialValues}
              onClose={onClose}
            />
          </div>
        </div>
      );
    }
    return (
      <div />
    );
  }

  render() {
    const { openModal } = this.props;

    return (
      <Collapse dimension="width" in={openModal} timeout={250} className="form-lightbox form-edit-information">
        {this.renderModalContent()}
      </Collapse>
    );
  }
}
