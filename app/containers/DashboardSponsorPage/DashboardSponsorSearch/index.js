import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddSponsorForm } from './AddSponsorForm';

@reduxForm({ form: 'dashboardSponsorForm' })

export class DashboardSponsorSearch extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.state = {
      addSponsorModalOpen: false,
    };

    this.closeAddSponsorModal = this.closeAddSponsorModal.bind(this);
    this.openAddSponsorModal = this.openAddSponsorModal.bind(this);
  }

  closeAddSponsorModal() {
    this.setState({ addSponsorModalOpen: false });
  }

  openAddSponsorModal() {
    this.setState({ addSponsorModalOpen: true });
  }

  render() {
    const options = [{ label: 'First', value: 1 }, { label: 'Second', value: 2 }, { label: 'Third', value: 3 }];

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddSponsorModal}>
              + Add Sponsor
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="has-feedback ">
              <Field
                name="sponsor"
                component={ReactSelect}
                placeholder="Select Sponsor"
                options={options}
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addSponsorModalOpen} onHide={this.closeAddSponsorModal}>
          <Modal.Header>
            <Modal.Title>Add Sponsor</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddSponsorModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddSponsorForm />
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
)(DashboardSponsorSearch);
