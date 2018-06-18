/**
*
* Array of media types
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
    fields: PropTypes.object,
    formValues: PropTypes.object,
    fetchSources: PropTypes.func,
    initForm: PropTypes.func,
    fetchMediaTypes: PropTypes.func,
    deleteMediaType: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
    isClientEditForm: PropTypes.bool,
    initialMediaTypes: PropTypes.array,
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

    this.addMediaType = this.addMediaType.bind(this);
    this.deleteMediaType = this.deleteMediaType.bind(this);
  }

  addMediaType() {
    const { fields } = this.props;
    // TODO this is unsafe behavior, because we're modifying a prop outside of the reducer
    fields.push({ landingPageUrl: this.props.landingPageUrl, studyId: this.props.studyId });
  }

  deleteMediaType(studySource, index) {
    const { deleteMediaType } = this.props;
    console.log(studySource);
    console.log(index);
    deleteMediaType(studySource.studyId, studySource.id, index);
    // TODO this is unsafe behavior, because we're modifying a prop outside of the reducer
    // fields.remove(index);
  }

  render() {
    const { fields, formValues, messagingNumbers, initialMediaTypes, sources, recruitmentPhone } = this.props;

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
      <div className="media-type-list">
        {fields.map((fieldName, index) => {
          const showName = formValues.mediaType && formValues.mediaType.length > index && typeof formValues.mediaType[index].source !== 'undefined' && formValues.mediaType[index].source;
          let landingHref = null;
          let googleHref = null;
          let mediaTypeObject = null;
          let patientsExists = false;

          if (initialMediaTypes && initialMediaTypes.length > 0) {
            mediaTypeObject = _.find(initialMediaTypes, (o) => {
              if (formValues.mediaType && formValues.mediaType[index]) {
                return (o.studySourceId === formValues.mediaType[index].studySourceId);
              } else {
                return false;
              }
            });
          }

          if (mediaTypeObject && mediaTypeObject.patientsCount > 0) {
            patientsExists = true;
          }

          let messagingNumbersOptions = [];
          if (this.props.isAdmin) {
            messagingNumbersOptions = messagingNumbers.details.map(item => ({
              value: item.id,
              label: item.phone_number,
            }));

            if (mediaTypeObject && mediaTypeObject.messagingNumber) {
              messagingNumbersOptions.unshift(mediaTypeObject.messagingNumber);
            }

            if (mediaTypeObject && mediaTypeObject.url && formValues.mediaType && formValues.mediaType[index]) {
              landingHref = mediaTypeObject.url ? `/${formValues.mediaType[index].studyId}-${formValues.mediaType[index].landingPageUrl}?utm=${formValues.mediaType[index].url}` : '';
              googleHref = mediaTypeObject.googleUrl ? mediaTypeObject.googleUrl : '';
            }
          }

          const urlLink = landingHref ? <a href={landingHref} className="landing-link study-source-link" target="_blank">{translate('portals.component.renderLeads.utm')}{(index + 1)}</a> : `${translate('portals.component.renderLeads.utm')}${(index + 1)}`;
          const googleUrlLink = googleHref ? <a href={googleHref} className="landing-link study-source-link" target="_blank">{translate('portals.component.renderLeads.mediaUrl')}{(index + 1)}</a> : `${translate('portals.component.renderLeads.mediaUrl')}${(index + 1)}`;

          const needToShowMessagingNumber = this.props.isClientEditForm && formValues.mediaType && formValues.mediaType[index] && formValues.mediaType[index].messagingNumber;
          const needToShowGoogleUrl = this.props.isClientEditForm && formValues.mediaType && formValues.mediaType[index] && formValues.mediaType[index].googleUrl;
          if (formValues.mediaType && formValues.mediaType[index] && !formValues.mediaType[index].recruitmentPhone) {
            // TODO this is unsafe behavior, because we're modifying a prop inside the render
            formValues.mediaType[index].recruitmentPhone = recruitmentPhone !== '' ? formatPhone(recruitmentPhone) : '';
          }

          return (
            <div className="media-type-item" key={index}>
              <div className="field-row dropdown">
                <strong className={classnames('label', 'required')}>
                  <label>{translate('portals.component.renderLeads.mediaTypeLabel')}{(index + 1)}</label>
                </strong>
                <Field
                  name={`${fieldName}.source`}
                  component={ReactSelect}
                  objectValue
                  placeholder={translate('portals.component.renderLeads.mediaTypePlaceholder')}
                  options={sourceOptions}
                  className="field"
                />
                {
                  !patientsExists && (
                    <span
                      className="delete-source-type icomoon-icon_trash"
                      onClick={() => {
                        this.deleteMediaType(mediaTypeObject, index);
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
                      name={`${fieldName}.sourceName`}
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
                      name={`${fieldName}.messagingNumber`}
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
                      name={`${fieldName}.recruitmentPhone`}
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
                      name={`${fieldName}.url`}
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
                      name={`${fieldName}.messagingNumber`}
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
                      name={`${fieldName}.googleUrl`}
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
              onClick={this.addMediaType}
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
