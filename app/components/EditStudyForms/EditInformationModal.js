/**
 * Created by mike on 10/11/16.
 */

import React, { PropTypes } from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import { normalizePhoneDisplay } from '../../common/helper/functions';

import EditInformationForm from './EditInformationForm';

export default class EditInformationModal extends React.Component {
  static propTypes = {
    addEmailNotificationClick: PropTypes.func.isRequired,
    study: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.getEditStudyInitialValues = this.getEditStudyInitialValues.bind(this);
  }

  componentDidMount() {
  }

  getEditStudyInitialValues(study) {
    const initialValues = Object.assign({}, study);
    initialValues.recruitment_phone = normalizePhoneDisplay(initialValues.recruitment_phone);
    initialValues.site = study.site_id;
    delete initialValues.site_id;
    initialValues.messagingNumber = study.text_number_id;
    delete initialValues.text_number_id;

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
