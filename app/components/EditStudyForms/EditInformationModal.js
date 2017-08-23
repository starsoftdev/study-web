/**
 * Created by mike on 10/11/16.
 */

import React, { PropTypes } from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import EditInformationForm from './EditInformationForm';

export default class EditInformationModal extends React.Component {
  static propTypes = {
    addEmailNotificationClick: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
  };

  componentDidMount() {
  }

  renderModalContent() {
    const { addEmailNotificationClick, initialValues, openModal, onClose } = this.props;
    if (openModal) {
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
