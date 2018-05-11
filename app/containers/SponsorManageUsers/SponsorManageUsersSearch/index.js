import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import EditSponsorUserForm from '../EditSponsorUserForm';
import { selectEditUserProcess, selectDeleteUserProcess, selectEditProtocolProcess } from '../selectors';
import { translate } from '../../../../common/utilities/localization';

@reduxForm({ form: 'searchSponsorManageUsers' })

export class SponsorManageUsersSearch extends React.Component {
  static propTypes = {
    editUser: PropTypes.func,
    formValues: PropTypes.object,
    editUserProcess: PropTypes.object,
    deleteUserProcess: PropTypes.object,
    editProtocolProcess: PropTypes.object,
    updateData: PropTypes.func,
    protocols: PropTypes.array,
    currentUser: React.PropTypes.object,
    filterAdmins: PropTypes.func,
    filterProtocols: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      addUserModalOpen: false,
      searchTimer: null,
      protocolName: '',
      adminName: '',
    };

    this.closeAddUserModal = this.closeAddUserModal.bind(this);
    this.openAddUserModal = this.openAddUserModal.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdminQueryChange = this.handleAdminQueryChange.bind(this);
    this.handleProtocolQueryChange = this.handleProtocolQueryChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if ((!newProps.editUserProcess.saving && this.props.editUserProcess.saving) ||
      (!newProps.deleteUserProcess.deleting && this.props.deleteUserProcess.deleting) ||
      (!newProps.editProtocolProcess.saving && this.props.editProtocolProcess.saving)) {
      this.props.updateData();
      this.closeAddUserModal();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.filterAdmins(this.state.adminName);
  }

  handleProtocolQueryChange(index) {
    const sel = parseInt(index !== null ? index : 0);
    let sName = _.find(this.props.protocols, { id: parseInt(index) });
    sName = (sName && sName.number) ? sName.number : null;
    if (sel === 0) {
      this.setState({
        protocolName: '',
      }, () => { this.props.filterProtocols(sName); });
    } else {
      this.setState({
        protocolName: (this.props.protocols[sel - 1] && this.props.protocols[sel - 1].number) ? this.props.protocols[sel - 1].number : null,
      }, () => { this.props.filterProtocols(sName); });
    }
  }

  handleAdminQueryChange(event) {
    this.setState({
      adminName: event.target.value,
    });
  }

  closeAddUserModal() {
    this.setState({ addUserModalOpen: false });
  }

  openAddUserModal() {
    this.setState({ addUserModalOpen: true });
  }

  addNewUser() {
    this.props.editUser(true);
  }

  render() {
    const options = [];

    _.forEach(this.props.protocols, (protocol) => {
      options.push({
        id: protocol.id,
        name: protocol.number,
        value: false,
        studies: protocol.studies,
      });
    });

    const isAllowToEdit = (this.props.currentUser.roleForSponsor.name === 'Super Admin' || this.props.currentUser.roleForSponsor.name === 'Admin');

    return (
      <form action="#" className="form-search clearfix" onSubmit={this.handleSubmit}>
        <div className="btns-area pull-right">
          <div className="col pull-right">
            <a disabled={!isAllowToEdit} className="btn btn-primary" onClick={() => (!isAllowToEdit ? null : this.openAddUserModal())}>
              {translate('client.component.sponsorManageUsersSearch.btnAddUser')}
            </a>
          </div>
        </div>

        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="has-feedback ">
              <Button className="btn-enter" type="submit">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder={translate('client.component.sponsorManageUsersSearch.placeholderSearch')}
                className="keyword-search"
                onChange={this.handleAdminQueryChange}
              />
            </div>
          </div>
          <div className="search-area pull-left">
            <div className="has-feedback ">
              <Field
                name="protocol"
                component={ReactSelect}
                placeholder={translate('client.component.sponsorManageUsersSearch.placeholderProtocol')}
                options={[{ label: translate('common.constants.all'), value: 'all' }].concat(options)}
                onChange={this.handleProtocolQueryChange}
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addUserModalOpen} onHide={this.closeAddUserModal}>
          <Modal.Header>
            <Modal.Title>{translate('client.component.sponsorManageUsersSearch.addUserModalTitle')}</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddUserModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <EditSponsorUserForm isEdit={false} onSubmit={this.addNewUser} protocolOptions={options} isAdmin={false} />
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  editUserProcess: selectEditUserProcess(),
  deleteUserProcess: selectDeleteUserProcess(),
  editProtocolProcess: selectEditProtocolProcess(),
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorManageUsersSearch);
