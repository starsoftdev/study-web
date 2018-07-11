/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, reset, touch } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import classNames from 'classnames';
import { selectSyncErrorBool } from '../../../common/selectors/form.selector';
import { submitPatientNote, submitDeleteNote } from '../actions';
import Input from '../../../components/Input/index';
import { translate } from '../../../../common/utilities/localization';
import PatientNote from './PatientNote';
import formValidator, { fields } from './validator';

const formName = 'PatientDetailModal.Notes';
@reduxForm({ form: formName, validator:formValidator })
class NotesSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    currentPatient: React.PropTypes.object,
    studyId: React.PropTypes.number.isRequired,
    note: React.PropTypes.string,
    notes: React.PropTypes.array,
    resetForm: React.PropTypes.func.isRequired,
    submitPatientNote: React.PropTypes.func.isRequired,
    submitDeleteNote: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
    this.scrollElement = this.scrollElement.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.notes && newProps.notes.length > this.props.notes.length) {
      this.scrollElement();
    }
  }

  onClick() {
    const { currentPatient, currentUser, note, resetForm, studyId, submitPatientNote } = this.props;

    if (note) {
      submitPatientNote(studyId, currentPatient.id, currentPatient.patientCategoryId, currentUser, note);
      resetForm();
    }
  }

  scrollElement() {
    window.requestAnimationFrame(() => {
      if (this.scrollable && this.props.active) {
        this.scrollable.scrollTop = this.scrollable.scrollHeight;
      }
    });
  }

  renderNotes() {
    const { currentUser, currentPatient, submitDeleteNote, notes } = this.props;
    return notes.map(note => (
      <PatientNote key={note.id} currentUser={currentUser} note={note} currentPatient={currentPatient} submitDeleteNote={submitDeleteNote} />
    ));
  }

  render() {
    const { active, note } = this.props;
    return (
      <div className={classNames('item note', { active })}>
        <section className="postarea notes" ref={scrollable => { this.scrollable = scrollable; }}>
          {this.renderNotes()}
        </section>
        <div className="textarea">
          <Field name="note" className="textarea-holder" component={Input} componentClass="textarea" placeholder={translate('client.component.notesSection.placeholderNote')} />
        </div>
        <Button className="save-btn" onClick={this.onClick} disabled={!note}>{translate('client.component.notesSection.save')}</Button>
      </div>
    );
  }
}

const selector = formValueSelector(formName);

const mapStateToProps = state => (
  {
    note: selector(state, 'note'),
    formError: selectSyncErrorBool(formName),
  }
);

function mapDispatchToProps(dispatch) {
  return {
    submitPatientNote: (studyId, patientId, patientCategoryId, currentUser, note) => dispatch(submitPatientNote(studyId, patientId, patientCategoryId, currentUser, note)),
    submitDeleteNote: (patientId, patientCategoryId, noteId) => dispatch(submitDeleteNote(patientId, patientCategoryId, noteId)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesSection);
