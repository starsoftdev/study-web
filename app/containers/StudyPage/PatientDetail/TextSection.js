/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import { submitPatientText } from '../actions';

import PatientText from './PatientText';

const formName = 'PatientDetailSection.Text';

@reduxForm({
  form: formName,
})
class TextSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    submitPatientText: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { active, currentUser, currentPatient, submitPatientText } = this.props;
    return (
      <div className={classNames('item text', { active })}>
        <section className="postarea text">
          {currentPatient && currentPatient.textMessages ? currentPatient.textMessages.map(textMessage => (
            <PatientText key={textMessage.id} currentPatient={currentPatient} currentUser={currentUser} textMessage={textMessage} />
          )) : null}
        </section>
        <div className="textarea">
          <textarea className="form-control" placeholder="Type a message..." />
          <Button onClick={this.submitText}>Send</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    submitPatientText: (text) => dispatch(submitPatientText(text)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(TextSection);
