import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddProtocolForm } from '../DashboardProtocolSearch/AddProtocolForm';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      addProtocolModalOpen: false,
    };

    this.closeAddProtocolModal = this.closeAddProtocolModal.bind(this);
    this.openAddProtocolModal = this.openAddProtocolModal.bind(this);
  }

  closeAddProtocolModal() {
    this.setState({ addProtocolModalOpen: false });
  }

  openAddProtocolModal() {
    this.setState({ addProtocolModalOpen: true });
  }

  render() {
    const initialValues = {
      initialValues: {
        protocol: this.props.item.name,
        id: this.props.item.id,
      },
    };

    return (
      <tr>
        <td>
          {this.props.item.name}
        </td>
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openAddProtocolModal}>
            <span>Edit</span>
          </a>
        </td>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addProtocolModalOpen} onHide={this.closeAddProtocolModal}>
          <Modal.Header>
            <Modal.Title>Edit Protocol</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddProtocolModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddProtocolForm
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
