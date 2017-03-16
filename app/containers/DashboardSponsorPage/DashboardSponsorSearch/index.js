import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddSponsorForm } from './AddSponsorForm';
import _ from 'lodash';


const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

@reduxForm({ form: 'dashboardSponsorSearchForm' })
@connect(mapStateToProps, mapDispatchToProps)
export class DashboardSponsorSearch extends React.Component {
  static propTypes = {
    sponsors: PropTypes.object,
    addSponsor: PropTypes.func,
    editSponsorProcess: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      addSponsorModalOpen: false,
    };

    this.closeAddSponsorModal = this.closeAddSponsorModal.bind(this);
    this.openAddSponsorModal = this.openAddSponsorModal.bind(this);
    this.addSponsor = this.addSponsor.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editSponsorProcess.saving && this.props.editSponsorProcess.saving) {
      this.closeAddSponsorModal();
    }
  }

  closeAddSponsorModal() {
    this.setState({ addSponsorModalOpen: false });
  }

  openAddSponsorModal() {
    this.setState({ addSponsorModalOpen: true });
  }

  addSponsor(params) {
    this.props.addSponsor(params);
  }

  render() {
    const options = [];
    _.forEach(this.props.sponsors.details, (item) => {
      options.push({
        label: item.name, value: item.id,
      });
    });

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
              <AddSponsorForm
                onSubmit={this.addSponsor}
                saving={this.props.editSponsorProcess.saving}
              />
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

export default DashboardSponsorSearch;
