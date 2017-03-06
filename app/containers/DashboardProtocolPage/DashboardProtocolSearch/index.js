import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddProtocolForm } from './AddProtocolForm';
import _ from 'lodash';

@reduxForm({ form: 'dashboardProtocolForm' })

export class DashboardProtocolSearch extends React.Component {
  static propTypes = {
    protocol: PropTypes.object,
    addProtocol: PropTypes.func,
    editProtocolProcess: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      addProtocolModalOpen: false,
    };

    this.closeAddProtocolModal = this.closeAddProtocolModal.bind(this);
    this.openAddProtocolModal = this.openAddProtocolModal.bind(this);
    this.addProtocol = this.addProtocol.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editProtocolProcess.saving && this.props.editProtocolProcess.saving) {
      this.closeAddProtocolModal();
    }
  }

  closeAddProtocolModal() {
    this.setState({ addProtocolModalOpen: false });
  }

  openAddProtocolModal() {
    this.setState({ addProtocolModalOpen: true });
  }

  addProtocol(params) {
    this.props.addProtocol(params);
  }

  render() {
    const options = [];
    _.forEach(this.props.protocol.details, (item) => {
      options.push({
        label: item.number, value: item.id,
      });
    });

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddProtocolModal}>
              Add Protocol
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="has-feedback ">
              <Field
                name="protocol"
                component={ReactSelect}
                placeholder="Select Protocol"
                options={options}
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addProtocolModalOpen} onHide={this.closeAddProtocolModal}>
          <Modal.Header>
            <Modal.Title>Add Protocol</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddProtocolModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddProtocolForm
                onSubmit={this.addProtocol}
                saving={this.props.editProtocolProcess.saving}
              />
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardProtocolSearch);
