import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddExposureLevelForm } from '../DashboardExposureLevelSearch/AddExposureLevelForm';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editLevel: PropTypes.func,
    deleteLevel: PropTypes.func,
    editLevelProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      addLevelModalOpen: false,
    };

    this.closeAddLevelModal = this.closeAddLevelModal.bind(this);
    this.openAddLevelModal = this.openAddLevelModal.bind(this);
    this.editLevel = this.editLevel.bind(this);
    this.deleteLevel = this.deleteLevel.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editLevelProcess.saving && this.props.editLevelProcess.saving) ||
      (!newProps.editLevelProcess.deleting && this.props.editLevelProcess.deleting)
    ) {
      this.closeAddLevelModal();
    }
  }

  closeAddLevelModal() {
    this.setState({ addLevelModalOpen: false });
  }

  openAddLevelModal() {
    this.setState({ addLevelModalOpen: true });
  }

  editLevel(params) {
    this.props.editLevel(params);
  }

  deleteLevel(params) {
    this.props.deleteLevel(params);
  }

  render() {
    const initialValues = {
      initialValues: {
        name: this.props.item.name,
        id: this.props.item.id,
      },
    };

    return (
      <tr>
        <td>
          {this.props.item.name}
        </td>
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openAddLevelModal}>
            <span>Edit</span>
          </a>
        </td>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addLevelModalOpen} onHide={this.closeAddLevelModal}>
          <Modal.Header>
            <Modal.Title>Edit Exposure Level</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddLevelModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddExposureLevelForm
                {...initialValues}
                isEdit
                onSubmit={this.editLevel}
                onDelete={this.deleteLevel}
                saving={this.props.editLevelProcess.saving}
                deleting={this.props.editLevelProcess.deleting}
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
