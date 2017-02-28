import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { map, find } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../components/Input';
import ReactMultiSelect from '../../../components/Input/ReactMultiSelect';

@reduxForm({ form: 'dashboardAddSponsorAdminForm' })

export class AddSponsorAdminForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
    sponsorData: PropTypes.array,
    initialValues: PropTypes.object,
  }

  render() {
    const itemTemplate = (controlSelectedValue) => (
      <div key={controlSelectedValue.value}>
        {controlSelectedValue.label}
        <i className="close-icon icomoon-icon_close" />
      </div>
    );

    const selectedItemsTemplate = (controlSelectedValue) => (
      <div>
        {controlSelectedValue[0].value}
      </div>
    );

    const sponsors = map(this.props.sponsorData, (sponsor) => ({
      id: sponsor.id,
      label: sponsor.company,
      value: sponsor.company,
    }));

    const bds = map(this.props.sponsorData, (sponsor) => ({
      id: sponsor.id,
      label: sponsor.bd,
      value: sponsor.bd,
    }));

    const aes = map(this.props.sponsorData, (sponsor) => ({
      id: sponsor.id,
      label: sponsor.ae,
      value: sponsor.ae,
    }));
    let initialSponsor;
    let initialBD;
    let initialAE;

    if (this.props.isEdit) {
      initialSponsor = find(sponsors, { label: this.props.initialValues.company });
      initialBD = find(bds, { label: this.props.initialValues.bd });
      initialAE = find(aes, { label: this.props.initialValues.ae });
    }

    return (
      <form action="#" className="form-lightbox dashboard-lightbox">

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Sponsor</label>
          </strong>
          <div className="field">
            <Field
              name="company"
              component={ReactMultiSelect}
              placeholder="Select Sponsor"
              searchPlaceholder="Search"
              initialValue={initialSponsor}
              searchable
              optionLabelKey="label"
              onChange={(e) => console.log('init search', e)}
              customOptionTemplateFunction={itemTemplate}
              customSelectedValueTemplateFunction={selectedItemsTemplate}
              dataSource={sponsors}
              customSearchIconClass="icomoon-icon_search2"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Name</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="col pull-left">
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Email</label>
          </strong>
          <div className="field">
            <Field
              name="email"
              component={Input}
              type="text"
            />
          </div>
        </div>
        {this.props.isEdit && (
          <div className="no-margins">
            <div className="field-row">
              <strong className="label">
                <label className="add-exposure-level">BD</label>
              </strong>
              <div className="field">
                <Field
                  name="bd"
                  component={ReactMultiSelect}
                  placeholder="Select BD"
                  searchPlaceholder="Search"
                  initialValue={initialBD}
                  searchable
                  optionLabelKey="label"
                  onChange={(e) => console.log('init search', e)}
                  customOptionTemplateFunction={itemTemplate}
                  customSelectedValueTemplateFunction={selectedItemsTemplate}
                  dataSource={bds}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label className="add-exposure-level">AE</label>
              </strong>
              <div className="field">
                <Field
                  name="ae"
                  component={ReactMultiSelect}
                  placeholder="Select AE"
                  searchPlaceholder="Search"
                  initialValue={initialAE}
                  searchable
                  optionLabelKey="label"
                  customOptionTemplateFunction={itemTemplate}
                  customSelectedValueTemplateFunction={selectedItemsTemplate}
                  dataSource={aes}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
          </div>
        )}
        <div className="field-row text-right no-margins">
          {this.props.isEdit &&
            <a className="btn btn-gray-outline">Delete</a>
          }
          <button type="submit" className="btn btn-primary">{this.props.isEdit ? 'Update' : 'Submit'}</button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSponsorAdminForm);
