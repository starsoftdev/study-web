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
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return;
    }
    // Obtain the dragged item
    const item = monitor.getItem();
    props.submitMovePatientBetweenCategories(props.studyId, item.patientCategoryId, props.category.id, item.id);
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
    connectDropTarget: React.PropTypes.func.isRequired,
    currentPatientId: React.PropTypes.number,
    currentUser: React.PropTypes.object.isRequired,
    submitMovePatientBetweenCategories: React.PropTypes.func.isRequired,
    onPatientClick: React.PropTypes.func.isRequired,
    onPatientTextClick: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      columnWidth: '',
      columnLeft: '',
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
  }
  componentDidUpdate() {
    if (this.state.columnWidth === '') {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleResize() {
    const patientColumn = this.patientColumn;
    const clientRect = patientColumn.getClientRects();

    this.setState({ columnWidth: (patientColumn.clientWidth).toString().concat('px') });
    this.setState({ columnLeft: clientRect[0].left.toString().concat('px') });
  }

  handleScroll() {
    const patientColumn = this.patientColumn;
    const clientRect = patientColumn.getClientRects();
    this.setState({ columnLeft: clientRect[0].left.toString().concat('px') });
  }

  render() {
    const { category, connectDropTarget, currentPatientId, currentUser, onPatientClick, onPatientTextClick } = this.props;

    const openerStyle = {
      width: this.state.columnWidth,
      left: this.state.columnLeft,
    };
    return connectDropTarget(
      <li
        key={category.id}
        ref={(patientColumn) => {
          this.patientColumn = patientColumn;
        }}
      >
        <span className="opener" style={openerStyle}>
          <strong className="number">{category.patients.length}</strong>
          <span className="text">{category.name}</span>
        </span>
        <div className="slide">
          <div className="slide-holder">
            <ul className="list-unstyled">
              {category.patients.map(patient => (
                <Patient key={patient.id} category={category} currentPatientId={currentPatientId} patient={patient} currentUser={currentUser} onPatientClick={onPatientClick} onPatientTextClick={onPatientTextClick} />
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
  submitMovePatientBetweenCategories: (studyId, fromCategoryId, toCategoryId, patientId) => dispatch(submitMovePatientBetweenCategories(studyId, fromCategoryId, toCategoryId, patientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientCategory);
