/**
*
* Array of lead sources
*
*/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';
import { Field } from 'redux-form';
import _ from 'lodash';
import { fetchSources } from '../../containers/App/actions';
import { selectSources } from '../../containers/App/selectors';

import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';
import { translate } from '../../../common/utilities/localization';
import { formatPhone } from '../../common/helper/functions';

const mapStateToProps = createStructuredSelector({
  sources: selectSources(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSources: () => dispatch(fetchSources()),
});

@connect(mapStateToProps, mapDispatchToProps)
class RenderLeads extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    disableDelete: PropTypes.bool,
    fields: PropTypes.object,
    formValues: PropTypes.object,
    fetchSources: PropTypes.func,
    initForm: PropTypes.func,
    deleteStudyLeadSource: PropTypes.func,
    fetchStudyLeadSources: PropTypes.func,
    deleteStudyLeadSourceProcess: PropTypes.object,
    deletedLeadSource: PropTypes.object,
    isAdmin: PropTypes.bool,
    isClientEditForm: PropTypes.bool,
    initialLeadSources: PropTypes.array,
    messagingNumbers: PropTypes.object,
    meta: PropTypes.object,
    sources: PropTypes.array,
    landingPageUrl: PropTypes.string,
    studyId: PropTypes.number,
    recruitmentPhone: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.addSourceType = this.addSourceType.bind(this);
    this.deleteSourceType = this.deleteSourceType.bind(this);
  }

  addSourceType() {
    const { fields } = this.props;
    // TODO this is unsafe behavior, because we're modifying a prop outside of the reducer
    fields.push({ isNew: true, landingPageUrl: this.props.landingPageUrl, studyId: this.props.studyId });
  }

  deleteSourceType(index) {
    const { fields, initialLeadSources, formValues, deleteStudyLeadSource } = this.props;
    let initObject = null;

    if (initialLeadSources && initialLeadSources.length > 0) {
      initObject = _.findIndex(initialLeadSources, (o) => {
        if (formValues.leadSource && formValues.leadSource[index]) {
          return (o.studySourceId === formValues.leadSource[index].studySourceId);
        } else {
          return false;
        }
      });
    }

    if (initObject) {
      deleteStudyLeadSource(initObject, index);
    } else {
      fields.remove(index);
    }
  }

  render() {
    const { fields, formValues, messagingNumbers, initialLeadSources, sources, recruitmentPhone } = this.props;

    let sourceOptions = [];
    if (sources.length > 0) {
      sourceOptions = _.sortBy(sources, (item) => {
        return item.orderNumber;
      }).filter(source => {
        return source.type !== 'Database' && (this.props.isAdmin || source.type !== 'StudyKIK');
      }).map(source => ({
        label: source.type,
        value: source.id,
      }));
    }

    return (
      <div className="leads-list">
        {fields.map((lead, index) => {
          const showName = formValues.leadSource && formValues.leadSource.length > index && typeof formValues.leadSource[index].source !== 'undefined' && formValues.leadSource[index].source;
          let landingHref = null;
          let googleHref = null;
          let initObject = null;
          let patientsExists = false;

          if (initialLeadSources && initialLeadSources.length > 0) {
            initObject = _.find(initialLeadSources, (o) => {
              if (formValues.leadSource && formValues.leadSource[index]) {
                return (o.studySourceId === formValues.leadSource[index].studySourceId);
              } else {
                return false;
              }
            });
          }

          if (initObject && initObject.patientsCount > 0) {
            patientsExists = true;
          }

          let messagingNumbersOptions = [];
          if (this.props.isAdmin) {
            messagingNumbersOptions = messagingNumbers.details.map(item => ({
              value: item.id,
              label: item.phone_number,
            }));

            if (initObject && initObject.messagingNumber) {
              messagingNumbersOptions.unshift(initObject.messagingNumber);
            }

            if (initObject && initObject.url && formValues.leadSource && formValues.leadSource[index]) {
              landingHref = initObject.url ? `/${formValues.leadSource[index].studyId}-${formValues.leadSource[index].landingPageUrl}?utm=${formValues.leadSource[index].url}` : '';
              googleHref = initObject.googleUrl ? initObject.googleUrl : '';
            }
          }

          const urlLink = landingHref ? <a href={landingHref} className="landing-link study-source-link" target="_blank">{translate('portals.component.renderLeads.utm')}{(index + 1)}</a> : `${translate('portals.component.renderLeads.utm')}${(index + 1)}`;
          const googleUrlLink = googleHref ? <a href={googleHref} className="landing-link study-source-link" target="_blank">{translate('portals.component.renderLeads.mediaUrl')}{(index + 1)}</a> : `${translate('portals.component.renderLeads.mediaUrl')}${(index + 1)}`;

          const needToShowMessagingNumber = this.props.isClientEditForm && formValues.leadSource && formValues.leadSource[index] && formValues.leadSource[index].messagingNumber;
          const needToShowGoogleUrl = this.props.isClientEditForm && formValues.leadSource && formValues.leadSource[index] && formValues.leadSource[index].googleUrl;
          if (formValues.leadSource && formValues.leadSource[index] && !formValues.leadSource[index].recruitmentPhone) {
            // TODO this is unsafe behavior, because we're modifying a prop inside the render
            formValues.leadSource[index].recruitmentPhone = recruitmentPhone !== '' ? formatPhone(recruitmentPhone) : '';
          }

          return (
            <div className="lead-item" key={index}>
              <div className="field-row dropdown">
                <strong className={classnames('label', (!this.props.disableDelete || (formValues.leadSource[index] && formValues.leadSource[index].isNew)) ? 'required' : '')}>
                  <label>{translate('portals.component.renderLeads.mediaTypeLabel')}{(index + 1)}</label>
                </strong>
                <Field
                  name={`${lead}.source`}
                  component={ReactSelect}
                  objectValue
                  placeholder={translate('portals.component.renderLeads.mediaTypePlaceholder')}
                  options={sourceOptions}
                  className="field"
                  disabled={this.props.disableDelete && (formValues.leadSource[index] && !formValues.leadSource[index].isNew)}
                />
                {
                  !patientsExists && (
                    <span
                      className="delete-source-type icomoon-icon_trash"
                      onClick={() => {
                        this.deleteSourceType(index);
                      }}
                    />
                  )
                }
              </div>
              {
                showName && (
                  <div className={classnames('field-row')}>
                    <strong className="label required"><label>{translate('portals.component.renderLeads.mediaNameLabel')}{(index + 1)}</label></strong>
                    <Field
                      name={`${lead}.source_name`}
                      component={Input}
                      type="text"
                      className="field"
                    />
                  </div>
                )
              }

              {
                showName && this.props.isAdmin && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>{translate('portals.component.renderLeads.messagingNumberLabel')}{(index + 1)}</label></strong>
                    <Field
                      className="field"
                      name={`${lead}.messagingNumber`}
                      component={ReactSelect}
                      placeholder={translate('portals.component.renderLeads.messagingNumberPlaceholder')}
                      searchPlaceholder={translate('portals.component.renderLeads.searchPlaceholder')}
                      searchable
                      objectValue
                      options={messagingNumbersOptions}
                      customSearchIconClass="icomoon-icon_search2"
                    />
                  </div>
                )
              }
              {
                showName && this.props.isAdmin && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>{translate('portals.component.renderLeads.redirectNumberLabel')}{(index + 1)}</label></strong>
                    <Field
                      name={`${lead}.recruitmentPhone`}
                      component={Input}
                      type="text"
                      className="field"
                      isDisabled
                    />
                  </div>
                )
              }
              {
                showName && this.props.isAdmin && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>{urlLink}</label></strong>
                    <Field
                      name={`${lead}.url`}
                      component={Input}
                      type="text"
                      className="field"
                    />
                  </div>
                )
              }

              {
                showName && needToShowMessagingNumber && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>{translate('portals.component.renderLeads.messagingNumberLabel')}{(index + 1)}</label></strong>
                    <Field
                      name={`${lead}.messagingNumber`}
                      component={Input}
                      type="text"
                      className="field special-cursor-text"
                      isDisabled
                    />
                  </div>
                )
              }
              {
                showName && (this.props.isAdmin || needToShowGoogleUrl) && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>{googleUrlLink}</label></strong>
                    <Field
                      name={`${lead}.googleUrl`}
                      component={Input}
                      type="text"
                      className="field special-cursor-text"
                      isDisabled={needToShowGoogleUrl}
                    />
                  </div>
                )
              }
            </div>
          );
        })}
        <div className="field-row">
          <strong className="label"></strong>
          <div className="field">
            <div
              className="add-new-source"
              onClick={this.addSourceType}
            >
              <i className="icomoon-icon_close" />
              <span> {translate('portals.component.renderLeads.addMedia')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RenderLeads;
