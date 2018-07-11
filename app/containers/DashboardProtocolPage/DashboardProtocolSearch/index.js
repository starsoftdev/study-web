import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/Input';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddProtocolForm } from './AddProtocolForm';
import TableActions from '../../../components/TableActions/index';

@reduxForm({ form: 'dashboardProtocolForm' })

export class DashboardProtocolSearch extends React.Component {
  static propTypes = {
    protocol: PropTypes.object,
    addProtocol: PropTypes.func,
    editProtocolProcess: PropTypes.object,
    onSubmitQuery: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      addProtocolModalOpen: false,
      query: null,
    };

    this.closeAddProtocolModal = this.closeAddProtocolModal.bind(this);
    this.openAddProtocolModal = this.openAddProtocolModal.bind(this);
    this.addProtocol = this.addProtocol.bind(this);
    this.setQueryParam = this.setQueryParam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editProtocolProcess.saving && this.props.editProtocolProcess.saving) {
      this.closeAddProtocolModal();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setQueryParam();
  }

  setQueryParam() {
    this.props.onSubmitQuery(this.state.query);
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
      <form action="#" className="form-search clearfix" onSubmit={this.onSubmit}>
        <TableActions
          buttonClickAction={this.openAddProtocolModal}
          buttonText="Add Protocol"
          filters={
            <div className="has-feedback ">
              <Button
                className="btn-enter"
                onClick={this.setQueryParam}
              >
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="protocol"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
                onChange={(e) => (this.setState({
                  query: e.target.value,
                }))}
              />
            </div>
          }
        />

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
