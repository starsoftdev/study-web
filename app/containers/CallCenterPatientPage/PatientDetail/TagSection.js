/**
 * Created by Younes on 04/27/18.
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Overlay from 'react-bootstrap/lib/Overlay';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import Form from 'react-bootstrap/lib/Form';
import { reduxForm } from 'redux-form';
import moment from 'moment-timezone';

import { fetchIndications } from '../../App/actions';
import { selectIndications } from '../../App/selectors';
import { selectCurrentPatient } from '../selectors';
import { addPatientIndication, removePatientIndication } from '../actions';
import IndicationOverlay from './IndicationOverlay';


const formName = 'PatientDetailModal.Other';

@reduxForm({
  form: formName,
})
class TagSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    fetchIndications: React.PropTypes.func.isRequired,
    indications: React.PropTypes.array,
    currentPatient: React.PropTypes.object,
    currentPatientCategory: React.PropTypes.object,
    addPatientIndication: React.PropTypes.func.isRequired,
    removePatientIndication: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showIndicationPopover: false,
      initialValues: null,
    };
    this.addIndication = this.addIndication.bind(this);
    this.deleteIndication = this.deleteIndication.bind(this);
    this.toggleIndicationPopover = this.toggleIndicationPopover.bind(this);
    this.renderIndications = this.renderIndications.bind(this);
  }

  componentWillMount() {
    this.props.fetchIndications();
  }

  componentWillReceiveProps(newProps) {
    const { currentPatient } = newProps;
    const { currentPatientCategory } = this.props;
    if (currentPatient && (currentPatient !== this.props.currentPatient)) {
      const formattedPatient = Object.assign({}, currentPatient);
      if (currentPatient.dob) {
        const dob = moment(currentPatient.dob);
        formattedPatient.dobMonth = dob.month() + 1;
        formattedPatient.dobDay = dob.date();
        formattedPatient.dobYear = dob.year();
      }
      formattedPatient.patientCategoryId = currentPatientCategory.id;
      this.setState({
        initialValues: formattedPatient,
      });
    }
  }

  addIndication(patientId, indication) {
    const { addPatientIndication } = this.props;
    const { initialValues } = this.state;
    addPatientIndication(initialValues.id, initialValues.patientCategoryId, indication);
  }

  deleteIndication(indication) {
    const { removePatientIndication } = this.props;
    const { initialValues } = this.state;
    removePatientIndication(initialValues.id, initialValues.patientCategoryId, indication.id);
  }

  toggleIndicationPopover() {
    this.setState({
      showIndicationPopover: !this.state.showIndicationPopover,
    });
  }

  renderIndications() {
    const { initialValues } = this.state;
    if (initialValues.patientIndications) {
      return (
        <div className="category-list">
          {initialValues.patientIndications.map(pi => (
            <div key={pi.indication.id} className="category">
              <span className="link">
                <span className="text">{pi.indication.name}</span>
                { !pi.isOriginal &&
                <span
                  className="icomoon-icon_trash"
                  onClick={() => {
                    this.deleteIndication(pi.indication);
                  }}
                />
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  render() {
    const { active, indications } = this.props;
    const { initialValues } = this.state;

    if (initialValues) {
      const overlayValues = { ...initialValues };

      if (initialValues.patientIndications) {
        overlayValues.indications = initialValues.patientIndications.map(pi => pi.indication);
      }

      return (
        <div className={classNames('item others', { active })}>
          <div className="item-holder">
            <Form className="sub-holder form-lightbox">
              <div className="field-row">
                <strong className="label">Indications</strong>
                <div
                  className="field add-indications"
                  ref={(parent) => (
                    this.parent = parent
                  )}
                >
                  <Button
                    bsStyle="primary"
                    ref={(target) => (this.target = target)}
                    onClick={this.toggleIndicationPopover}
                  >
                    + Add Indication
                  </Button>
                  <Overlay
                    show={this.state.showIndicationPopover}
                    placement="bottom"
                    container={this.parent}
                    target={() => this.target}
                    rootClose
                    onHide={() => { this.toggleIndicationPopover(); }}
                  >
                    <IndicationOverlay indications={indications} selectIndication={this.addIndication} patient={overlayValues} onClose={this.toggleIndicationPopover} />
                  </Overlay>
                </div>
              </div>
            </Form>
            <div className="field-row remove-indication">
              <span className="label" />
              <div className="field">
                {this.renderIndications()}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  currentPatient: selectCurrentPatient(),
  indications: selectIndications(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchIndications: () => dispatch(fetchIndications()),
  addPatientIndication: (patientId, patientCategoryId, indication) => dispatch(addPatientIndication(patientId, patientCategoryId, indication)),
  removePatientIndication: (patientId, patientCategoryId, indicationId) => dispatch(removePatientIndication(patientId, patientCategoryId, indicationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagSection);
