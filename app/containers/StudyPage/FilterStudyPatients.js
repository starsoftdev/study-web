/**
 * Created by mike on 9/19/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Debounce } from 'react-throttle';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import ReactMultiSelect from '../../components/Input/ReactMultiSelect';
import StudyActionButtons from './StudyActionButtons';

import { fetchPatients } from './actions';

@reduxForm({ form: 'filterStudyPatients' })
class FilterStudyPatientsForm extends Component {

  static propTypes = {
    campaignOptions: PropTypes.array.isRequired,
    sourceOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fetchStudy: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    campaign: PropTypes.number,
    search: PropTypes.string,
    source: PropTypes.number,
    studyId: PropTypes.number.isRequired,
    ePMS: PropTypes.bool,
    studyName: PropTypes.string,
    fetchStudyTextNewStats: PropTypes.func,
    studyLeadSources: PropTypes.object,
  };
  static defaultProps = {
    submitting: false,
    loading: false,
  };
  constructor(props) {
    super(props);
    this.searchPatient = this.searchPatient.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      campaign: null,
    };
  }

  componentWillMount() {
  }

  onSubmit(event) {
    event.preventDefault();
    const { fetchPatients, fetchStudyTextNewStats, studyId, campaign, source, search } = this.props;
    let newCampaign = campaign;
    let newSource = source;
    if (campaign === -1) {
      newCampaign = null;
    }
    if (source === -1) {
      newSource = null;
    }
    fetchPatients(studyId, search, newCampaign, newSource);
    fetchStudyTextNewStats(studyId, newCampaign, newSource);
  }

  searchPatient(event, type) {
    const { fetchPatients, fetchStudyTextNewStats, studyId, campaign, source, search } = this.props;
    let newCampaign = campaign;

    let newSource = null;
    // let newSource = source; //TODO: implement API to filter by study_source

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
      // TODO: implement API first
      /* if (event === -1) {
        fetchPatients(studyId, search, newCampaign, null);
        fetchStudyTextNewStats(studyId, newCampaign, null);
      } else {
        fetchPatients(studyId, search, newCampaign, event);
        fetchStudyTextNewStats(studyId, newCampaign, event);
      }*/
    } else {
      /* -1 means all was selected */
      this.setState({
        campaign: event,
      });
      if (event === -1) {
        fetchPatients(studyId, search, null, newSource);
        fetchStudyTextNewStats(studyId, null, newSource);
      } else {
        fetchPatients(studyId, search, event, newSource);
        fetchStudyTextNewStats(studyId, event, newSource);
      }
    }
  }

  render() {
    const {
      campaignOptions,
      submitting,
      loading,
      studyId,
      search,
      campaign,
      source,
      ePMS,
      studyName,
    } = this.props;
    console.log(123, this.props.studyLeadSources);
    const itemTemplate = (controlSelectedValue) => (
      <div key={controlSelectedValue.value}>
        {controlSelectedValue.label}
        <i className="close-icon icomoon-icon_close" />
      </div>
    );

    const selectedItemsTemplate = (controlSelectedValue) => (
      <div>
        {controlSelectedValue.length} item(s) selected
      </div>
    );
    const sourceMapped = this.props.studyLeadSources.details.map((item) => {
      return {
        ...item,
        group: item.source_id.label,
        id: item.studySourceId,
        label: `${item.source_id.label} ${item.source_name}`,
      };
    });
    console.log(321, sourceMapped);
    /* changing the source for display purposes only */
    return (
      <form className="form-search clearfix" onSubmit={this.onSubmit}>
        <StudyActionButtons
          studyId={studyId}
          search={search}
          campaign={campaign}
          source={source}
          ePMS={ePMS}
          studyName={studyName}
        />
        <div className="fields-holder">
          <div className="search-area pull-left no-left-padding">
            <div className="field">
              <Button
                className="btn-enter"
                onClick={this.onSubmit}
                type="submit"
              >
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
              onChange={(event, val) => this.searchPatient(val, 'campaign')}
            />
          </div>
          <div className="custom-select pull-left no-right-padding">
            <Field
              name="source"
              component={ReactMultiSelect}
              placeholder="Select Source"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              includeAllOption={false}
              multiple
              onChange={(e, val) => this.searchPatient(val, 'source')}
              customOptionTemplateFunction={itemTemplate}
              customSelectedValueTemplateFunction={selectedItemsTemplate}
              dataSource={sourceMapped}
              customSearchIconClass="icomoon-icon_search2"
              groupBy="group"
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

