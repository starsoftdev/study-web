import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../../components/CenteredModal/index';
import { AddNoteForm } from './AddNoteForm';

@reduxForm({ form: 'dashboardNoteForm' })

export class DashboardNoteSearch extends React.Component {
  static propTypes = {
    addNote: PropTypes.func,
    editNoteProcess: PropTypes.object,
    noteSearchFormValues: PropTypes.object,
    studyId: PropTypes.number,
    hideParentModal: PropTypes.func,
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
    if ((!newProps.editNoteProcess.saving && this.props.editNoteProcess.saving) ||
      (!newProps.editNoteProcess.deleting && this.props.editNoteProcess.deleting)) {
      this.closeAddNoteModal();
    }
  }

  closeAddNoteModal() {
    this.setState({ addNoteModalOpen: false });
    this.props.hideParentModal(false);
  }

  openAddNoteModal() {
    if (this.props.studyId) {
      this.setState({ addNoteModalOpen: true });
      this.props.hideParentModal(true);
    }
  }

  addNote(params) {
    const nParam = {
      noteData: params.noteData,
      study_id: this.props.studyId,
    };
    this.props.addNote(nParam);
  }

  render() {
    const addNoteAddOn = (
      <a className="btn btn-primary lightbox-opener" onClick={this.openAddNoteModal}>
        Add Note
      </a>
    );
    return (
      <form action="#" className="form-search clearfix">
        <div className="btns-area row pull-right">
          <div className="col pull-left no-right-padding">
            {addNoteAddOn}
          </div>
        </div>

        <Modal
          dialogComponentClass={CenteredModal}
          className="new-user"
          id="new-user"
          show={this.state.addNoteModalOpen}
          onHide={this.closeAddNoteModal}
          backdrop={false}
        >
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
