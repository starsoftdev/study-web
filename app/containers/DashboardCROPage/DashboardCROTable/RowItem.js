import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddCROForm } from '../DashboardCROSearch/AddCROForm';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    editCro: PropTypes.func,
    deleteCro: PropTypes.func,
    editCroProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      addCROModalOpen: false,
    };

    this.closeAddCROModal = this.closeAddCROModal.bind(this);
    this.openAddCROModal = this.openAddCROModal.bind(this);
    this.editCro = this.editCro.bind(this);
    this.deleteCro = this.deleteCro.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editCroProcess.saving && this.props.editCroProcess.saving) ||
      (!newProps.editCroProcess.deleting && this.props.editCroProcess.deleting)
    ) {
      this.closeAddCROModal();
    }
  }

  closeAddCROModal() {
    this.setState({ addCROModalOpen: false });
  }

  openAddCROModal() {
    this.setState({ addCROModalOpen: true });
  }

  editCro(params) {
    this.props.editCro(params);
  }

  deleteCro(params) {
    this.props.deleteCro(params);
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
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openAddCROModal}>
            <span>Edit</span>
          </a>
        </td>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addCROModalOpen} onHide={this.closeAddCROModal}>
          <Modal.Header>
            <Modal.Title>Edit CRO</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddCROModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddCROForm
                {...initialValues}
                isEdit
                onSubmit={this.editCro}
                onDelete={this.deleteCro}
                saving={this.props.editCroProcess.saving}
                deleting={this.props.editCroProcess.deleting}
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
