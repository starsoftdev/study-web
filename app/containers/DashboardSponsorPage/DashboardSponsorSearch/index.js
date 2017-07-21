import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/Input';
import CenteredModal from '../../../components/CenteredModal/index';
import { AddSponsorForm } from './AddSponsorForm';
import TableActions from '../../../components/TableActions/index';

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

@reduxForm({ form: 'dashboardSponsorSearchForm' })
@connect(mapStateToProps, mapDispatchToProps)
export class DashboardSponsorSearch extends React.Component {
  static propTypes = {
    sponsors: PropTypes.object,
    addSponsor: PropTypes.func,
    editSponsorProcess: PropTypes.object,
    onSubmitQuery: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      addSponsorModalOpen: false,
      query: null,
    };

    this.closeAddSponsorModal = this.closeAddSponsorModal.bind(this);
    this.openAddSponsorModal = this.openAddSponsorModal.bind(this);
    this.addSponsor = this.addSponsor.bind(this);
    this.setQueryParam = this.setQueryParam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.editSponsorProcess.saving && this.props.editSponsorProcess.saving) {
      this.closeAddSponsorModal();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setQueryParam();
  }

  setQueryParam() {
    this.props.onSubmitQuery(this.state.query);
  }

  closeAddSponsorModal() {
    this.setState({ addSponsorModalOpen: false });
  }

  openAddSponsorModal() {
    this.setState({ addSponsorModalOpen: true });
  }

  addSponsor(params) {
    this.props.addSponsor(params);
  }

  render() {
    const options = [];
    _.forEach(this.props.sponsors.details, (item) => {
      options.push({
        label: item.name, value: item.id,
      });
    });

    return (
      <form action="#" className="form-search clearfix" onSubmit={this.onSubmit}>
        <TableActions
          buttonClickAction={this.openAddSponsorModal}
          buttonText="+ Add Sponsor"
          filters={
            <div className="has-feedback ">
              <Button
                className="btn-enter"
                onClick={this.setQueryParam}
              >
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="sponsor"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
                onChange={(e) => (this.setState({
                  query: e.target.value,
                }))}
              />
            </div>
          }
        />

        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.state.addSponsorModalOpen} onHide={this.closeAddSponsorModal}>
          <Modal.Header>
            <Modal.Title>Add Sponsor</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddSponsorModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <AddSponsorForm
                onSubmit={this.addSponsor}
                saving={this.props.editSponsorProcess.saving}
              />
            </div>
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

export default DashboardSponsorSearch;
