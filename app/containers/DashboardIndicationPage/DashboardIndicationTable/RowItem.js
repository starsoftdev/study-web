import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddIndicationForm } from '../DashboardIndicationSearch/AddIndicationForm';
import _ from 'lodash';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    levels: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      addIndicationModalOpen: false,
    };

    this.closeAddIndicationModal = this.closeAddIndicationModal.bind(this);
    this.openAddIndicationModal = this.openAddIndicationModal.bind(this);
  }

  closeAddIndicationModal() {
    this.setState({ addIndicationModalOpen: false });
  }

  openAddIndicationModal() {
    this.setState({ addIndicationModalOpen: true });
  }

  render() {
    const initialValues = {
      initialValues: {
        ...this.props.item,
        indication: this.props.item.name,
        id: this.props.item.id,
      },
    };
    const { levels, item } = this.props;
    const gValues = levels.details.map((level) => {
      const patientGoal = item.patientIndicationGoals;
      const pId = _.find(patientGoal, { level_id: level.id });
      if (pId) {
        return (
          <td key={level.id}>
            {pId.goal}
          </td>
        );
      }
      return (
        <td></td>
      );
    });

    const tPatientGoal = item.patientIndicationGoals;
    const tierValue = (tPatientGoal.length > 0) ? tPatientGoal[0].tierNumber : null;
    return (
      <tr>
        <td>
          {this.props.item.name}
        </td>
        <td>
          {tierValue}
        </td>
        {gValues}
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openAddIndicationModal}>
            <span>Edit</span>
          </a>
        </td>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addIndicationModalOpen} onHide={this.closeAddIndicationModal}>
          <Modal.Header>
            <Modal.Title>Edit Indication</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddIndicationModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddIndicationForm
                {...initialValues}
                isEdit
              />
            </div>
          </Modal.Body>
        </Modal>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RowItem);
