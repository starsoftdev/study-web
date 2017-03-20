import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddExposureLevelForm } from '../DashboardExposureLevelSearch/AddExposureLevelForm';
import Checkbox from '../../../components/Input/Checkbox';
import { Field, change } from 'redux-form';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editLevel: PropTypes.func,
    deleteLevel: PropTypes.func,
    editLevelProcess: PropTypes.object,
    change: PropTypes.func,
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
    this.updateActive = this.updateActive.bind(this);
  }

  componentDidMount() {
    if (this.props.item.is_active) {
      this.props.change(`isActive-${this.props.item.id}`, true);
    }
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

  updateActive() {

  }

  deleteLevel(params) {
    this.props.deleteLevel(params);
  }

  render() {
    const initialValues = {
      initialValues: {
        name: this.props.item.name,
        id: this.props.item.id,
        price: this.props.item.price,
        position: this.props.item.position,
      },
    };

    return (
      <tr>
        <td>
          {this.props.item.name}
        </td>
        <td>
          {this.props.item.price}
        </td>
        <td>
          {this.props.item.position}
        </td>
        <td>
          <Field
            name={`isActive-${this.props.item.id}`}
            type="checkbox"
            disabled="true"
            component={Checkbox}
          />
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
    change: (field, value) => dispatch(change('DashboardExposureLevel.LevelList', field, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RowItem);
