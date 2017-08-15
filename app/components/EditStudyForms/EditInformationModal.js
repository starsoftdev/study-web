/**
 * Created by mike on 10/11/16.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-bootstrap/lib/Collapse';

import { normalizePhoneForServer } from '../../common/helper/functions';
import {
  updateDashboardStudy,
} from '../../containers/HomePage/AdminDashboard/actions';
import EditInformationForm from './EditInformationForm';

const mapDispatchToProps = (dispatch) => ({
  updateDashboardStudy: (params) => dispatch(updateDashboardStudy(params)),
});

@connect(null, mapDispatchToProps)
export default class EditInformationModal extends React.Component {
  static propTypes = {
    addEmailNotificationClick: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.updateDashboardStudy = this.updateDashboardStudy.bind(this);
  }

  updateDashboardStudy(params) {
    const newParam = Object.assign({}, params);
    newParam.recruitment_phone = normalizePhoneForServer(params.recruitment_phone);
    updateDashboardStudy(newParam);
  }

  render() {
    const { addEmailNotificationClick, initialValues, openModal, onClose } = this.props;

    console.log(initialValues);

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
            {/* <EditInformationForm */}
            {/* addEmailNotificationClick={addEmailNotificationClick} */}
            {/* initialValues={initialValues} */}
            {/* handleSubmit={this.updateDashboardStudy} */}
            {/* onClose={onClose} */}
            {/* /> */}
          </div>
        </div>
      </Collapse>
    );
  }
}
