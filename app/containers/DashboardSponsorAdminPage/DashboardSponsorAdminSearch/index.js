import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';
import Modal from 'react-bootstrap/lib/Modal';
import Input from '../../../components/Input';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddSponsorAdminForm } from './AddSponsorAdminForm';

@reduxForm({ form: 'dashboardSponsorAdminForm' })

export class DashboardSponsorAdminSearch extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.state = {
      addSponsorAdminModalOpen: false,
      addExposureLevelModalOpen: false,
    };

    this.closeAddSponsorAdminModal = this.closeAddSponsorAdminModal.bind(this);
    this.openAddSponsorAdminModal = this.openAddSponsorAdminModal.bind(this);
    this.closeAddExposureLevelModal = this.closeAddExposureLevelModal.bind(this);
    this.openAddExposureLevelModal = this.openAddExposureLevelModal.bind(this);
  }

  closeAddSponsorAdminModal() {
    this.setState({ addSponsorAdminModalOpen: false });
  }

  openAddSponsorAdminModal() {
    this.setState({ addSponsorAdminModalOpen: true });
  }

  closeAddExposureLevelModal() {
    this.setState({ addExposureLevelModalOpen: false });
  }

  openAddExposureLevelModal() {
    this.setState({ addExposureLevelModalOpen: true });
  }

  render() {
    const options = [
      { id: 1, name: 'Bruce Wayne', company: 'Pfizer', email: 'bruce.wayne@wayneenterprise.com', bd: 'Kobe Byant', ae: 'Michael Grimm' },
      { id: 2, name: 'Ray Palmer', company: 'Company 1', email: 'ray.palmer@palmertech.com', bd: 'Bianca Ryan', ae: 'Cas Haley' },
      { id: 3, name: 'Will Graham', company: 'Company 2', email: 'will.graham@wayneenterprise.com', bd: 'Terry Fator', ae: 'Eli Mattson' },
      { id: 4, name: 'Jon Snow', company: 'Company 3', email: 'jon.snow@wayneenterprise.com', bd: 'Kevin Skinner', ae: 'Tom Cotter' },
    ];

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddSponsorAdminModal}>
              Add Sponsor Admin
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="field">
              <Button className="btn-enter" type="submit">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                onChange={(e) => console(e)}
                type="text"
                className="keyword-search"
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addSponsorAdminModalOpen} onHide={this.closeAddSponsorAdminModal}>
          <Modal.Header>
            <Modal.Title>Add SponsorAdmin</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddSponsorAdminModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddSponsorAdminForm />
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
)(DashboardSponsorAdminSearch);
