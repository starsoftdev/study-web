import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddIndicationForm } from './AddIndicationForm';
import { AddExposureLevelForm } from './AddExposureLevelForm';
import _ from 'lodash';

@reduxForm({ form: 'dashboardIndicationForm' })

export class DashboardIndicationSearch extends React.Component {
  static propTypes = {
    addLevel: PropTypes.func,
    addIndication: PropTypes.func,
    addLevelProcess: PropTypes.object,
    addIndicationProcess: PropTypes.object,
    levels: PropTypes.object,
    indications: PropTypes.object,
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
    this.addLevel = this.addLevel.bind(this);
    this.addIndication = this.addIndication.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.addLevelProcess.saving && this.props.addLevelProcess.saving) {
      this.closeAddExposureLevelModal();
    }
    if (!newProps.addIndicationProcess.saving && this.props.addIndicationProcess.saving) {
      this.closeAddIndicationModal();
    }
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

  addLevel(param) {
    const nParam = param;
    nParam.isActive = true;
    nParam.stripeProductId = 'prod_964SkmdTyEfpnZ';
    this.props.addLevel(nParam);
  }

  addIndication(param) {
    const { levels } = this.props;
    const newParam = [];
    levels.details.map((item) => {
      const tName = item.name;
      if (Object.prototype.hasOwnProperty.call(param, tName)) {
        const temp = {
          levelId: item.id,
          levelName: item.name,
          levelGoal: param[tName],
        };
        newParam.push(temp);
      }
      return item;
    });
    const reParam = {
      name: param.name,
      tier: param.tier,
      patientGoals: newParam,
    };

    this.props.addIndication(reParam);
  }

  render() {
    const options = [];
    _.forEach(this.props.indications.details, (item) => {
      options.push({
        label: item.name, value: item.id,
      });
    });

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
                component={ReactSelect}
                placeholder="Select Indication"
                options={options}
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
              <AddIndicationForm
                onSubmit={this.addIndication}
                levels={this.props.levels}
                saving={this.props.addIndicationProcess.saving}
              />
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
              <AddExposureLevelForm
                onSubmit={this.addLevel}
                saving={this.props.addLevelProcess.saving}
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
)(DashboardIndicationSearch);
