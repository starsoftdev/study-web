import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddNoteForm } from './AddNoteForm';

@reduxForm({ form: 'dashboardNoteForm' })

export class DashboardNoteSearch extends React.Component {
  static propTypes = {
    note: PropTypes.object,
    addNote: PropTypes.func,
    editNoteProcess: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      addNoteModalOpen: false,
    };

    this.closeAddNoteModal = this.closeAddNoteModal.bind(this);
    this.openAddNoteModal = this.openAddNoteModal.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editNoteProcess.saving && this.props.editNoteProcess.saving) {
      this.closeAddNoteModal();
    }
  }

  closeAddNoteModal() {
    this.setState({ addNoteModalOpen: false });
  }

  openAddNoteModal() {
    this.setState({ addNoteModalOpen: true });
  }

  addNote(params) {
    this.props.addNote(params);
  }

  render() {
    const options = [];
    _.forEach(this.props.note.details, (item) => {
      options.push({
        label: item.name, value: item.id,
      });
    });

    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left">
            <a className="btn btn-primary lightbox-opener" onClick={this.openAddNoteModal}>
              Add Note
            </a>
          </div>
        </div>
        <div className="fields-holder">
          <div className="pull-left col custom-select">
            <div className="has-feedback ">
              <Field
                name="note"
                component={ReactSelect}
                placeholder="Select Note"
                options={options}
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addNoteModalOpen} onHide={this.closeAddNoteModal}>
          <Modal.Header>
            <Modal.Title>Add Note</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddNoteModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddNoteForm
                onSubmit={this.addNote}
                saving={this.props.editNoteProcess.saving}
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
)(DashboardNoteSearch);
