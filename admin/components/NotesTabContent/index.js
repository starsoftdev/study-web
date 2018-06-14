import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Field, reduxForm } from 'redux-form';

import Input from '../Input';


const formName = 'AdminEditStudy.Notes';
@reduxForm({ form: formName })
export class NotesTabContent extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div id="notesTabContent">
        <div className="notesList">
        </div>
        <Field className="textareaHolder" name="note" component={Input} componentClass="textarea" />
        <Button className="save-btn" >SAVE</Button>
      </div>
    );
  }
}

export default NotesTabContent;
