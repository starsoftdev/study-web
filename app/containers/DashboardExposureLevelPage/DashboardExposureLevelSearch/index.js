import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddExposureLevelForm } from './AddExposureLevelForm';
import TableActions from '../../../components/TableActions/index';

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
    const newParam = params;
    newParam.price *= 100;
    this.props.addLevel(newParam);
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
        <TableActions
          buttonText="Add Exposure Level"
          filters={
            <div className="has-feedback ">
              <Field
                name="level"
                component={ReactSelect}
                placeholder="Select Exposure Level"
                options={options}
              />
            </div>
          }
        />

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
