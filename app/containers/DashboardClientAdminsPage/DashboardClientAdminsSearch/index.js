import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/Input';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddClientAdminsForm } from '../../DashboardClientAdminsPage/AddClientAdminsForm/index';

@reduxForm({ form: 'dashboardClientAdminsSearchForm' })

export class DashboardClientAdminsSearch extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.state = {
      addClientAdminModalOpen: false,
    };

    this.closeAddClientAdminModal = this.closeAddClientAdminModal.bind(this);
    this.openAddClientAdminModal = this.openAddClientAdminModal.bind(this);
  }

  closeAddClientAdminModal() {
    this.setState({ addClientAdminModalOpen: false });
  }

  openAddClientAdminModal() {
    this.setState({ addClientAdminModalOpen: true });
  }

  render() {
    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddClientAdminModal}>
              + Add Client Admin
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="has-feedback ">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addClientAdminModalOpen} onHide={this.closeAddClientAdminModal}>
          <Modal.Header>
            <Modal.Title>Add CLIENT ADMIN</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddClientAdminModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddClientAdminsForm />
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
)(DashboardClientAdminsSearch);
