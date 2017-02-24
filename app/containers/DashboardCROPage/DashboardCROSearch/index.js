import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddCROForm } from './AddCROForm';

@reduxForm({ form: 'dashboardCROForm' })

export class DashboardCROSearch extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.state = {
      addCROModalOpen: false,
    };

    this.closeAddCROModal = this.closeAddCROModal.bind(this);
    this.openAddCROModal = this.openAddCROModal.bind(this);
  }

  closeAddCROModal() {
    this.setState({ addCROModalOpen: false });
  }

  openAddCROModal() {
    this.setState({ addCROModalOpen: true });
  }

  render() {
    const options = [
      { id: 1, name: 'Inc_Research' },
      { id: 2, name: 'InVentiv' },
      { id: 3, name: 'Quintiles' },
    ];

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddCROModal}>
              Add CRO
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="has-feedback ">
              <Field
                name="cro"
                component={ReactSelect}
                placeholder="Select CRO"
                options={options}
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addCROModalOpen} onHide={this.closeAddCROModal}>
          <Modal.Header>
            <Modal.Title>Add CRO</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddCROModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddCROForm />
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
