/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import classNames from 'classnames';

import Input from '../../../components/Input/index';

class NotesSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    currentPatient: React.PropTypes.object,
    note: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  onClick() {
    const { note } = this.props;
    console.log(note);
  }

  renderNotes() {
    const { currentUser, currentPatient } = this.props;
    if (currentPatient && currentPatient.notes) {
      return currentPatient.notes.map(note => (
        <PatientNote currentUser={currentUser} note={note} />
      ));
    } else {
      return null;
    }
  }

  render() {
    const { active } = this.props;
    return (
      <div className={classNames("item note", {active: active})}>
        <section className="postarea notes">
          {this.renderNotes()}
        </section>
        <div className="textarea">
          <Field name="note" component={Input} componentClass="textarea" placeholder="Type a note..." />
          <Button onClick={this.onClick}>Send</Button>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('patientDetailModal')

const mapStateToProps = state => {
  return {
    note: selector(state, "note"),
  }
};

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesSection);
