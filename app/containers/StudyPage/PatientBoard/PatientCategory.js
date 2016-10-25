/**
 * Created by mike on 10/24/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { createStructuredSelector } from 'reselect';
import * as Selector from '../selectors';
import DragTypes from './dragSourceTypes';
import Patient from './Patient';
import { submitMovePatientBetweenCategories } from '../actions';

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const patientTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    props.submitMovePatientBetweenCategories(item.patientCategoryId, props.category.id, item.id);
  },
};

const collect = (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
});

@DropTarget(DragTypes.PATIENT, patientTarget, collect)
class PatientCategory extends React.Component {
  static propTypes = {
    studyId: React.PropTypes.number.isRequired,
    category: React.PropTypes.object.isRequired,
    currentPatientId: React.PropTypes.number,
    currentUser: React.PropTypes.object.isRequired,
    submitMovePatientBetweenCategories: React.PropTypes.func.isRequired,
    onPatientClick: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { category, currentPatientId, currentUser, onPatientClick } = this.props;
    return (
      <li key={category.id}>
        <span className="opener">
          <strong className="number">{category.patients.length}</strong>
          <span className="text">{category.name}</span>
        </span>
        <div className="slide">
          <div className="slide-holder">
            <ul className="list-unstyled">
              {category.patients.map(patient => (
                <Patient key={patient.id} category={category} currentPatientId={currentPatientId} patient={patient} currentUser={currentUser} onPatientClick={onPatientClick} />
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  studyId: Selector.selectStudyId(),
});

const mapDispatchToProps = (dispatch) => ({
  submitMovePatientBetweenCategories: (fromCategoryId, toCategoryId, patientId) => dispatch(submitMovePatientBetweenCategories(fromCategoryId, toCategoryId, patientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientCategory);
