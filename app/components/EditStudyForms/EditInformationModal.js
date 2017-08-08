/**
 * Created by mike on 10/11/16.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-bootstrap/lib/Collapse';
import EditInformationForm from './EditInformationForm';

const mapDispatchToProps = (dispatch) => ({
});

@connect(null, mapDispatchToProps)
export default class EditInformationModal extends React.Component {
  static propTypes = {
    addEmailNotificationClick: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { addEmailNotificationClick, initialValues, openModal, onClose } = this.props;
    return (
      <Collapse dimension="width" in={openModal} timeout={250} className="form-lightbox form-edit-information">
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
      </Collapse>
    );
  }
}
