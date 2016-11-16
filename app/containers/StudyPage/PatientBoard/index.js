/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { createStructuredSelector } from 'reselect';
import * as Selector from '../selectors';
import { selectCurrentUser } from 'containers/App/selectors';

import PatientCategory from './PatientCategory';
import PatientDetailModal from '../PatientDetail/PatientDetailModal';
import { fetchPatientDetails, setCurrentPatientCategoryId, setCurrentPatientId, switchToNoteSectionDetail, switchToTextSectionDetail } from '../actions';

import Scroll from 'react-scroll';
const scroll = Scroll.animateScroll;

@DragDropContext(HTML5Backend)
class PatientBoard extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
    currentPatientId: React.PropTypes.number,
    fetchPatientDetails: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array.isRequired,
    setCurrentPatientCategoryId: React.PropTypes.func.isRequired,
    setCurrentPatientId: React.PropTypes.func.isRequired,
    switchToNoteSection: React.PropTypes.func.isRequired,
    switchToTextSection: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openPatientModal: false,
      stick: false,
    };
    this.onPatientClick = this.onPatientClick.bind(this);
    this.onPatientTextClick = this.onPatientTextClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onPatientClick(category, patient) {
    const show = this.showModal(category, patient);
    this.setState({
      openPatientModal: show || false,
    });
    const { switchToNoteSection } = this.props;
    switchToNoteSection();
    const options = {
      duration: 500,
    };
    scroll.scrollTo(633, options);
  }

  onPatientTextClick(category, patient) {
    const show = this.showModal(category, patient);
    this.setState({
      openPatientModal: show || false,
    });
    const { switchToTextSection } = this.props;
    switchToTextSection();
    const options = {
      duration: 500,
    };
    scroll.scrollTo(633, options);
  }

  handleScroll(event) {
    const scrollTop = event.target.scrollingElement.scrollTop;
    this.setState({
      stick: scrollTop >= 633,
    });
  }

  showModal(category, patient) {
    const { fetchPatientDetails, currentPatientId, setCurrentPatientCategoryId, setCurrentPatientId } = this.props;
    const show = patient && currentPatientId !== patient.id;
    if (show) {
      setCurrentPatientCategoryId(category.id);
      setCurrentPatientId(patient.id);
      fetchPatientDetails(patient.id);
    } else {
      setCurrentPatientCategoryId(-1);
      setCurrentPatientId(-1);
    }
    return show;
  }

  render() {
    const { currentPatientId, currentUser, patientCategories } = this.props;
    return (
      <div className="clearfix patients-list-area-holder">
        <div className={classNames('patients-list-area', { 'form-active': this.state.openPatientModal })}>
          <nav className="nav-status">
            <ul className={classNames('list-inline', { stick: this.state.stick })}>
              {patientCategories.map(patientCategory => (
                <PatientCategory key={patientCategory.id} category={patientCategory} currentUser={currentUser} currentPatientId={currentPatientId} onPatientClick={this.onPatientClick} onPatientTextClick={this.onPatientTextClick} />
              ))}
            </ul>
          </nav>
          <PatientDetailModal currentUser={currentUser} openPatientModal={this.state.openPatientModal} onClose={this.onPatientClick} />
        </div>
        <div className="patients-form-closer" onClick={this.onPatientClick} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  currentPatientId: Selector.selectCurrentPatientId(),
});

const mapDispatchToProps = (dispatch) => (
  {
    fetchPatientDetails: (categoryId, patient) => dispatch(fetchPatientDetails(categoryId, patient)),
    setCurrentPatientId: (id) => dispatch(setCurrentPatientId(id)),
    setCurrentPatientCategoryId: (id) => dispatch(setCurrentPatientCategoryId(id)),
    switchToNoteSection: () => dispatch(switchToNoteSectionDetail()),
    switchToTextSection: () => dispatch(switchToTextSectionDetail()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PatientBoard);
