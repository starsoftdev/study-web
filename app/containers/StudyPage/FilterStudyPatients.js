/**
 * Created by mike on 9/19/16.
 */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Debounce } from 'react-throttle';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import ReactMultiSelect from '../../components/Input/ReactMultiSelect';
import StudyActionButtons from './StudyActionButtons';

import { fetchPatients, setSelectedStudySources } from './actions';

@reduxForm({ form: 'filterStudyPatients' })
class FilterStudyPatientsForm extends Component {

  static propTypes = {
    campaignOptions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    fetchStudy: PropTypes.func.isRequired,
    fetchStudyStats: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    campaign: PropTypes.number,
    search: PropTypes.string,
    source: PropTypes.number,
    studyId: PropTypes.number.isRequired,
    ePMS: PropTypes.bool,
    studyName: PropTypes.string,
    setSelectedStudySources: PropTypes.func,
    sourceMapped: PropTypes.array,
  };
  static defaultProps = {
    submitting: false,
    loading: false,
  };
  constructor(props) {
    super(props);
    this.searchPatient = this.searchPatient.bind(this);
    this.groupHeaderClicked = this.groupHeaderClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      campaign: null,
      selectedGroups: ['StudyKIK'],
      selectedStudySources: [{ group:'StudyKIK', id:'1_', label:'none' }],
    };
  }

  componentWillMount() {
  }


  onSubmit(event) {
    event.preventDefault();
    const { fetchPatients, studyId, campaign, source, search } = this.props;
    let newCampaign = campaign;
    let newSource = source;
    if (campaign === -1) {
      newCampaign = null;
    }
    if (source === -1) {
      newSource = null;
    }
    fetchPatients(studyId, search, newCampaign, newSource);
  }

  searchPatient(event, type) {
    const { fetchPatients, fetchStudyStats, studyId, campaign, source, search } = this.props;
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
      if (!event) { // clearAll
        this.setState({ selectedGroups: [] });
        this.setState({ selectedStudySources: [] });
      } else {
        this.setState({ selectedStudySources: event });
      }
      /* -1 means all was selected */
      if (event === -1) {
        fetchPatients(studyId, search, newCampaign, null);
        fetchStudyStats(studyId, newCampaign, null);
      } else {
        fetchPatients(studyId, search, newCampaign, (event !== null ? event : 1));
        fetchStudyStats(studyId, newCampaign, (event !== null ? event : 1));
      }
    } else {
      /* -1 means all was selected */
      this.setState({
        campaign: event,
      });
      if (event === -1) {
        fetchPatients(studyId, search, null, newSource);
        fetchStudyStats(studyId, null, newSource);
      } else {
        fetchPatients(studyId, search, event, newSource);
        fetchStudyStats(studyId, event, newSource);
      }
    }
  }

  groupHeaderClicked(group) {
    const { fetchPatients, fetchStudyStats, studyId, campaign, search } = this.props;
    let newCampaign = campaign;
    if (campaign === -1) {
      newCampaign = null;
    }
    if (this.state.selectedGroups.indexOf(group) === -1) {
      let selectedGroups = [];
      if (group !== 'All') {
        selectedGroups = [...this.state.selectedGroups, group];
      }

      const selectedValues = [];
      _.forEach(this.props.sourceMapped, (item) => {
        if (group === 'All') {
          selectedValues.push(item);
          selectedGroups.push(item.group);
        } else if (group === item.group) {
          selectedValues.push(item);
        }
      });

      this.setState({ selectedGroups });
      if (group === 'All') {
        this.setState({ selectedStudySources: selectedValues });
        fetchPatients(studyId, search, newCampaign, selectedValues);
        fetchStudyStats(studyId, newCampaign, selectedValues);
      } else {
        this.setState({ selectedStudySources: [...this.state.selectedStudySources, ...selectedValues] });
        fetchPatients(studyId, search, newCampaign, [...this.state.selectedStudySources, ...selectedValues]);
        fetchStudyStats(studyId, newCampaign, [...this.state.selectedStudySources, ...selectedValues]);
      }
    }
    this.sourceSelectContainer.click(); // fake click to close the dropdown
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
    const itemTemplate = (controlSelectedValue) => {
      return (<div key={controlSelectedValue.value} className={`${controlSelectedValue.label === 'none' ? 'hiddenSelectOption studySourceSelectOption' : 'studySourceSelectOption'}`}>
        {controlSelectedValue.label}
        <i className="close-icon icomoon-icon_close" />
      </div>);
    };

    const selectedItemsTemplate = (controlSelectedValue) => {
      if (controlSelectedValue.length === 1) {
        return (<div className="truncate">
          {controlSelectedValue[0].studySourceId ? controlSelectedValue[0].label : controlSelectedValue[0].group}
        </div>);
      }
      return (<div>
        {controlSelectedValue.length} item(s) selected
      </div>);
    };

    const groupHeaderTemplate = (group) => {
      return <div onClick={() => { this.groupHeaderClicked(group); }}>{group}</div>;
    };

    const selectedValues = this.state.selectedStudySources;

    const sourceMapped = this.props.sourceMapped;

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
          sourceMapped={this.props.sourceMapped}
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
          <div
            className="custom-select pull-left no-right-padding"
            ref={(sourceSelectContainer) => {
              this.sourceSelectContainer = sourceSelectContainer;
            }}
          >
            <Field
              name="source"
              component={ReactMultiSelect}
              placeholder="Select Source"
              searchPlaceholder="Search"
              searchable
              optionLabelKey="label"
              includeAllOption={false}
              multiple
              onChange={(val) => this.searchPatient(val, 'source')}
              customOptionTemplateFunction={itemTemplate}
              customSelectedValueTemplateFunction={selectedItemsTemplate}
              customGroupHeadingTemplateFunction={groupHeaderTemplate}
              dataSource={sourceMapped}
              customSearchIconClass="icomoon-icon_search2"
              groupBy="group"
              initialValue={selectedValues}
              className="studySourceMultiSelect"
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
    setSelectedStudySources: (list) => dispatch(setSelectedStudySources(list)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterStudyPatientsForm);

