import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';
import Modal from 'react-bootstrap/lib/Modal';
import ReactMultiSelect from '../../../components/Input/ReactMultiSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddIndicationForm } from './AddIndicationForm';
import { AddExposureLevelForm } from './AddExposureLevelForm';

@reduxForm({ form: 'dashboardIndicationForm' })

export class DashboardIndicationSearch extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.state = {
      addIndicationModalOpen: false,
      addExposureLevelModalOpen: false,
    };

    this.closeAddIndicationModal = this.closeAddIndicationModal.bind(this);
    this.openAddIndicationModal = this.openAddIndicationModal.bind(this);
    this.closeAddExposureLevelModal = this.closeAddExposureLevelModal.bind(this);
    this.openAddExposureLevelModal = this.openAddExposureLevelModal.bind(this);
  }

  closeAddIndicationModal() {
    this.setState({ addIndicationModalOpen: false });
  }

  openAddIndicationModal() {
    this.setState({ addIndicationModalOpen: true });
  }

  closeAddExposureLevelModal() {
    this.setState({ addExposureLevelModalOpen: false });
  }

  openAddExposureLevelModal() {
    this.setState({ addExposureLevelModalOpen: true });
  }

  render() {
    const options = [
      { id: 1, name: 'Acne', tier: '4', ruby: '4', diamond: '100', platinum: '60', gold: '40', silver: '20', bronze: '5' },
      { id: 2, name: 'Ring Worm', tier: '4', ruby: '30', diamond: '10', platinum: '50', gold: '60', silver: '5', bronze: '10' },
      { id: 3, name: 'Back Pain', tier: '1', ruby: '50', diamond: '100', platinum: '60', gold: '40', silver: '50', bronze: '30' },
      { id: 4, name: 'Leg Pain', tier: '4', ruby: '4', diamond: '100', platinum: '60', gold: '40', silver: '20', bronze: '5' },
    ];

    const itemTemplate = (controlSelectedValue) => (
      <div key={controlSelectedValue.value}>
        {controlSelectedValue.label}
        <i className="close-icon icomoon-icon_close" />
      </div>
    );

    const selectedItemsTemplate = (controlSelectedValue) => (
      <div>
        {controlSelectedValue[0].name}
      </div>
    );

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddIndicationModal}>
              Add Indication
            </a>
          </div>

          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddExposureLevelModal}>
              Add Exposure Level
            </a>
          </div>

        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="has-feedback ">
              <Field
                name="indication"
                component={ReactMultiSelect}
                placeholder="Select Indication"
                searchPlaceholder="Search"
                searchable
                optionLabelKey="label"
                includeAllOption
                onChange={(e) => console.log('init search', e)}
                customOptionTemplateFunction={itemTemplate}
                customSelectedValueTemplateFunction={selectedItemsTemplate}
                dataSource={map(options, (option) => ({
                  ...option,
                  label: option.name,
                  value: option.name,
                }))}
                customSearchIconClass="icomoon-icon_search2"
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addIndicationModalOpen} onHide={this.closeAddIndicationModal}>
          <Modal.Header>
            <Modal.Title>Add Indication</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddIndicationModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddIndicationForm />
            </div>
          </Modal.Body>
        </Modal>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addExposureLevelModalOpen} onHide={this.closeAddExposureLevelModal}>
          <Modal.Header>
            <Modal.Title>Add Exposure Level</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddExposureLevelModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddExposureLevelForm />
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
)(DashboardIndicationSearch);
