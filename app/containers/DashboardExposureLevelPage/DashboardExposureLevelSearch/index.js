import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddExposureLevelForm } from './AddExposureLevelForm';
import _ from 'lodash';

@reduxForm({ form: 'dashboardExposureLevelForm' })

export class DashboardExposureLevelSearch extends React.Component {
  static propTypes = {
    level: PropTypes.object,
    addLevel: PropTypes.func,
    editLevelProcess: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      addLevelModalOpen: false,
    };

    this.closeAddLevelModal = this.closeAddLevelModal.bind(this);
    this.openAddLevelModal = this.openAddLevelModal.bind(this);
    this.addLevel = this.addLevel.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editLevelProcess.saving && this.props.editLevelProcess.saving) {
      this.closeAddLevelModal();
    }
  }

  closeAddLevelModal() {
    this.setState({ addLevelModalOpen: false });
  }

  openAddLevelModal() {
    this.setState({ addLevelModalOpen: true });
  }

  addLevel(params) {
    this.props.addLevel(params);
  }

  render() {
    const options = [];
    _.forEach(this.props.level.details, (item) => {
      options.push({
        label: item.name, value: item.id,
      });
    });

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddLevelModal}>
              Add Exposure Level
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="has-feedback ">
              <Field
                name="level"
                component={ReactSelect}
                placeholder="Select Exposure Level"
                options={options}
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addLevelModalOpen} onHide={this.closeAddLevelModal}>
          <Modal.Header>
            <Modal.Title>Add Exposure Level</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddLevelModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddExposureLevelForm
                onSubmit={this.addLevel}
                saving={this.props.editLevelProcess.saving}
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
)(DashboardExposureLevelSearch);
