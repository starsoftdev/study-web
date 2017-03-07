/**
 * Created by mike on 9/19/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Input from '../../components/Input/index';
import Button from 'react-bootstrap/lib/Button';
import ReactSelect from '../../components/Input/ReactSelect';
import StudyActionButtons from './StudyActionButtons';
import { Debounce } from 'react-throttle';

import { fetchPatients } from './actions';

@reduxForm({ form: 'filterStudyPatients' })
class FilterStudyPatientsForm extends Component {

  static propTypes = {
    campaignOptions: PropTypes.array.isRequired,
    sourceOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    campaign: PropTypes.number,
    search: PropTypes.string,
    source: PropTypes.number,
    studyId: PropTypes.number.isRequired,
    ePMS: PropTypes.bool,
  };
  static defaultProps = {
    submitting: false,
    loading: false,
  };
  constructor(props) {
    super(props);
    this.searchPatient = this.searchPatient.bind(this);

    this.state = {
      campaign: null,
    };
  }

  componentWillMount() {
  }

  searchPatient(event, type) {
    const { fetchPatients, studyId, campaign, source, search } = this.props;
    let newCampaign = campaign;
    let newSource = source;
    /* nulling the values if all is selected */
    if (campaign === -1) {
      newCampaign = null;
    }
    if (source === -1) {
      newSource = null;
    }
    if (type === 'search') {
      fetchPatients(studyId, event.target.value, newCampaign, newSource);
    } else if (type === 'source') {
      /* -1 means all was selected */
      if (event === -1) {
        fetchPatients(studyId, search, newCampaign, null);
      } else {
        fetchPatients(studyId, search, newCampaign, event);
      }
    } else {
      /* -1 means all was selected */
      this.setState({
        campaign: event,
      });
      if (event === -1) {
        fetchPatients(studyId, search, null, newSource);
      }
      fetchPatients(studyId, search, event, newSource);
    }
  }

  render() {
    const {
      campaignOptions,
      sourceOptions,
      handleSubmit,
      submitting,
      loading,
      studyId,
      search,
      campaign,
      source,
      ePMS,
    } = this.props;
    /* changing the source for display purposes only */
    return (
      <form className="form-search clearfix" onSubmit={handleSubmit}>
        <StudyActionButtons
          studyId={studyId}
          search={search}
          campaign={campaign}
          source={source}
          ePMS={ePMS}
        />
        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="field">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Debounce time="200" handler="onChange">
                <Field
                  component={Input}
                  type="text"
                  name="search"
                  id="search"
                  className="keyword-search"
                  placeholder="Search"
                  onChange={(event) => this.searchPatient(event, 'search')}
                />
              </Debounce>
            </div>
          </div>
          <div className="custom-select pull-left">
            <Field
              name="campaign"
              component={ReactSelect}
              className="field"
              options={campaignOptions}
              disabled={submitting || loading}
              placeholder="Select Campaign"
              onChange={(event) => this.searchPatient(event, 'campaign')}
            />
          </div>
          <div className="custom-select pull-left">
            <Field
              name="source"
              component={ReactSelect}
              className="field"
              options={sourceOptions}
              disabled={submitting || loading || !this.state.campaign}
              placeholder="Select Source"
              onChange={event => this.searchPatient(event, 'source')}
            />
          </div>
        </div>

      </form>
    );
  }
}
const selector = formValueSelector('filterStudyPatients');

const mapStateToProps = (state) => ({
  campaign: selector(state, 'campaign'),
  source: selector(state, 'source'),
  search: selector(state, 'search'),
  studyId: state.studyPage.studyId,
});

function mapDispatchToProps(dispatch) {
  return {
    fetchPatients: (studyId, text, campaignId, sourceId) => dispatch(fetchPatients(studyId, text, campaignId, sourceId)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterStudyPatientsForm);

