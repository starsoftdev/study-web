import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { countBy } from 'lodash';

import { selectStudies } from 'containers/HomePage/selectors';
import { ACTIVE_STATUS_VALUE, INACTIVE_STATUS_VALUE } from 'containers/HomePage/constants';
import StudyItem from './StudyItem';
import RenewStudyForm from 'containers/HomePage/RenewStudyForm';
import ShoppingCartForm from 'components/ShoppingCartForm';
import {
  fetchLevels,
} from 'containers/App/actions';
import {
  selectStudyLevels,
  selectCurrentUser,
} from 'containers/App/selectors';
import './styles.less';

class StudiesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studies: PropTypes.object,
    studyLevels: PropTypes.array,
    fetchLevels: PropTypes.func,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      renewModalOpen: false,
      upgradeModalOpen: false,
      editModalOpen: false,
      selectedStudyId: null,
    };

    this.openRenewModal = this.openRenewModal.bind(this);
    this.openUpgradeModal = this.openUpgradeModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeRenewModal = this.closeRenewModal.bind(this);
    this.closeUpgradeModal = this.closeUpgradeModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleRenewStudyRequestValues = this.handleRenewStudyRequestValues.bind(this);
    this.handleRenewStudyFormSubmit = this.handleRenewStudyFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchLevels();
  }

  componentWillReceiveProps(newProps) {
    // indication cahnge
  }

  openRenewModal(studyId) {
    this.setState({
      renewModalOpen: true,
      selectedStudyId: studyId,
    });
  }

  openUpgradeModal(studyId) {
    this.setState({
      upgradeModalOpen: true,
      selectedStudyId: studyId,
    });
  }

  openEditModal(studyId) {
    this.setState({
      editModalOpen: true,
      selectedStudyId: studyId,
    });
  }

  closeRenewModal() {
    this.setState({
      renewModalOpen: false,
      selectedStudyId: null,
    });
  }

  closeUpgradeModal() {
    this.setState({
      upgradeModalOpen: false,
      selectedStudyId: null,
    });
  }

  closeEditModal() {
    this.setState({
      editModalOpen: false,
      selectedStudyId: null,
    });
  }

  handleRenewStudyRequestValues(requestValues) {
    console.log(requestValues);
  }

  handleRenewStudyFormSubmit(requestValues) {
    console.log(requestValues);
  }

  render() {
    const { studies } = this.props;
    const countResult = countBy(studies.details, entityIterator => entityIterator.status);
    const activeCount = countResult[ACTIVE_STATUS_VALUE] || 0;
    const inactiveCount = countResult[INACTIVE_STATUS_VALUE] || 0;
    const totalCount = studies.details.length;
    const studiesListContents = studies.details.map((item, index) => (
      <StudyItem
        {...item}
        key={index}
        index={index}
        onRenew={this.openRenewModal}
        onUpgrade={this.openUpgradeModal}
        onEdit={this.openEditModal}
      />
    ));
    const testProducts = [
      {
        title: 'Test',
        quantity: 999,
        price: 888,
        total: 7666,
      },
    ];

    if (studies.details.length > 0) {
      return (
        <div className="studies">
          <div className="row">
            <div className="col-sm-12">
              <div className="table-responsive">
                <table className="table table-striped">
                  <caption>
                    <span className="pull-left">Study/Site Status</span>
                    <span className="pull-right">
                      <span className="inner-info">
                        <span className="info-label">ACTIVE</span>
                        <span className="info-value">{activeCount}</span>
                      </span>
                      <span className="inner-info">
                        <span className="info-label">INACTIVE</span>
                        <span className="info-value">{inactiveCount}</span>
                      </span>
                      <span className="inner-info">
                        <span className="info-label">TOTAL</span>
                        <span className="info-value">{totalCount}</span>
                      </span>
                    </span>
                  </caption>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>INDICATION</th>
                      <th>LOCATION</th>
                      <th>SPONSOR</th>
                      <th>PROTOCOL</th>
                      <th>
                        <span className="icon-credit" data-original-title="Patient Messaging Suite"></span>
                      </th>
                      <th>STATUS</th>
                      <th>START DATE</th>
                      <th>END DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studiesListContents}
                  </tbody>
                </table>
              </div>
              <Modal className="renew-study-modal" show={this.state.renewModalOpen} onHide={this.closeRenewModal} bsSize="large">
                <Modal.Header closeButton>
                  <Modal.Title>Renew Study</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="left-panel col-sm-6">
                      <RenewStudyForm
                        onSubmit={this.handleRenewStudyRequestValues}
                      />
                    </div>
                    <div className="right-panel col-sm-6">
                      <ShoppingCartForm
                        showCards
                        noBorder
                        addOns={testProducts}
                        onSubmit={this.handleRenewStudyFormSubmit}
                      />
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3>No studies found!</h3>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  studies: selectStudies(),
  studyLevels : selectStudyLevels(),
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLevels: () => dispatch(fetchLevels()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudiesList);
