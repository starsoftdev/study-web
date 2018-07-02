import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import { Field, reduxForm, reset } from 'redux-form';

import Input from '../Input';


import StudyNote from '../../components/StudyNote';

const formName = 'AdminEditStudy.Notes';

function mapDispatchToProps(dispatch) {
  return {
    reset: () => dispatch(reset(formName)),
  };
}

@reduxForm({ form: formName })
@connect(null, mapDispatchToProps)
export class NotesTabContent extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studyId: PropTypes.any,
    note: PropTypes.object,
    addNote: PropTypes.func,
    deleteNote: PropTypes.func,
    currentUser: PropTypes.object,
    formValues: PropTypes.any,
    reset: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.renderNotes = this.renderNotes.bind(this);
    this.submitDeleteNote = this.submitDeleteNote.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  submitDeleteNote(noteId) {
    const { deleteNote } = this.props;
    console.log('submitDeleteNote', noteId);
    deleteNote(noteId);
  }

  renderNotes() {
    const { currentUser, note } = this.props;
    return note.details.map(note => (
      <StudyNote key={note.id} currentUser={currentUser} note={note} submitDeleteNote={this.submitDeleteNote} />
    ));
  }

  addNote(ev) {
    ev.preventDefault();
    const { studyId, formValues, currentUser, reset } = this.props;
    const nParam = {
      noteData: formValues.noteData,
      study_id: studyId,
      user_id: currentUser.id,
    };

    this.props.addNote(nParam);
    reset();
  }

  render() {
    return (
      <div id="notesTabContent">
        <div className="notesList">
          {this.renderNotes()}
        </div>

        <form action="#" className="form-lightbox dashboard-lightbox" onSubmit={this.addNote}>
          <Field
            className="textareaHolder"
            componentClass="textarea"
            name="noteData"
            component={Input}
            type="text"
          />
          <Button type="submit" className="save-btn">SAVE</Button>
        </form>
      </div>
    );
  }
}

export default NotesTabContent;
