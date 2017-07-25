import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/Input';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddCROForm } from './AddCROForm';
import TableActions from '../../../components/TableActions/index';

@reduxForm({ form: 'dashboardCROForm' })

export class DashboardCROSearch extends React.Component {
  static propTypes = {
    cro: PropTypes.object,
    addCro: PropTypes.func,
    editCroProcess: PropTypes.object,
    onSubmitQuery: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      addCROModalOpen: false,
      query: null,
    };

    this.closeAddCROModal = this.closeAddCROModal.bind(this);
    this.openAddCROModal = this.openAddCROModal.bind(this);
    this.addCro = this.addCro.bind(this);
    this.setQueryParam = this.setQueryParam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editCroProcess.saving && this.props.editCroProcess.saving) {
      this.closeAddCROModal();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setQueryParam();
  }

  setQueryParam() {
    this.props.onSubmitQuery(this.state.query);
  }

  closeAddCROModal() {
    this.setState({ addCROModalOpen: false });
  }

  openAddCROModal() {
    this.setState({ addCROModalOpen: true });
  }

  addCro(params) {
    this.props.addCro(params);
  }

  render() {
    return (
      <form action="#" className="form-search clearfix" onSubmit={this.onSubmit}>
        <TableActions
          buttonClickAction={this.openAddCROModal}
          buttonText="Add CRO"
          filters={
            <div className="has-feedback ">
              <Button
                className="btn-enter"
                onClick={this.setQueryParam}
              >
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="cro"
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

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addCROModalOpen} onHide={this.closeAddCROModal}>
          <Modal.Header>
            <Modal.Title>Add CRO</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddCROModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddCROForm
                onSubmit={this.addCro}
                saving={this.props.editCroProcess.saving}
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
)(DashboardCROSearch);
