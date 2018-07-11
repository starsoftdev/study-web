import _ from 'lodash';
import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Input from '../../../../common/components/Input';
import LoadingSpinner from '../../../../app/components/LoadingSpinner';
import { translate } from '../../../../common/utilities/localization';
import { addStudyNumber, deleteStudyNumber, fetchVendorStudies } from './actions';
import { selectStudiesForVendor } from './selectors';
import {
  selectAsyncErrorBool,
  selectAsyncValidatingBool,
  selectValues,
} from '../../../../common/selectors/form.selector';
import validator from './validator';
import { asyncValidate } from './asyncValidate';

export const formName = 'VendorAdminPage.EditVendorStudiesForm';

const mapStateToProps = createStructuredSelector({
  asyncValidating: selectAsyncValidatingBool(formName),
  asyncError: selectAsyncErrorBool(formName),
  values: selectValues(formName),
  vendorStudies: selectStudiesForVendor(),
});
const mapDispatchToProps = {
  addStudyNumber,
  deleteStudyNumber,
  fetchVendorStudies,
};

@reduxForm({
  asyncValidate,
  asyncBlurFields: ['studyId'],
  form: formName,
  validate: validator,
  shouldAsyncValidate: ({ trigger }) => trigger !== 'submit',
})
@connect(mapStateToProps, mapDispatchToProps)
export default class EditVendorStudiesForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addStudyNumber: PropTypes.func.isRequired,
    asyncValidating: PropTypes.bool.isRequired,
    asyncError: PropTypes.bool.isRequired,
    deleteStudyNumber: PropTypes.func.isRequired,
    fetchVendorStudies: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    saving: PropTypes.bool,
    values: PropTypes.object.isRequired,
    vendorStudies: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { fetchVendorStudies, values: { vendorId } } = this.props;
    fetchVendorStudies(vendorId);
  }

  addStudyNumber = () => {
    const { addStudyNumber, asyncValidating, asyncError, values: { studyId }, vendorStudies } = this.props;
    // check for asynchronous validation and whether study id is populated
    if (!asyncError && studyId) {
      const duplicateIndex = _.findIndex(vendorStudies, { studyId });
      // check if a duplicate exists
      if (duplicateIndex === -1) {
        if (!asyncValidating) {
          addStudyNumber(studyId);
        } else {
          // try again automatically for the user in 500 ms
          setTimeout(this.addStudyNumber, 500);
        }
      }
    }
  };

  deleteStudyNumber = (studyId) => {
    const { deleteStudyNumber } = this.props;
    deleteStudyNumber(studyId);
  };

  renderStudyNumbers = () => {
    const { vendorStudies } = this.props;
    return vendorStudies.map(item => {
      // hide items that are supposed to be deleted
      if (!item.toDelete) {
        return (
          <span className="number-span" key={item.studyId}>
            <span>{item.studyId}</span>
            <a
              className="btn-close"
              onClick={() => {
                this.deleteStudyNumber(item.studyId);
              }}
            >
              <i className="icomoon-icon_close" />
            </a>
          </span>
        );
      } else {
        return null;
      }
    });
  };

  render() {

    const { pristine, asyncError, asyncValidating, handleSubmit, saving } = this.props;

    return (
      <Form className="form-lightbox dashboard-lightbox study-number-form" onSubmit={handleSubmit}>

        <div className="field-row">
          <div className="field">
            <Field
              name="studyId"
              component={Input}
              placeholder={translate('client.page.vendor.admin.studyNumber')}
              type="text"
              className="pull-left"
            />
            <Button
              className="add-study-number"
              bsStyle="primary"
              onClick={this.addStudyNumber}
            >
              <i className="glyphicon glyphicon-plus" />
            </Button>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            {this.renderStudyNumbers()}
          </div>
        </div>

        <div className="field-row text-right no-margins">
          <Button bsStyle="primary" type="submit" disabled={pristine || asyncValidating || asyncError}>
            {saving ?
              <span>
                <LoadingSpinner showOnlyIcon size={20} className="saving-user" />
              </span>
              : <span>{translate('client.page.vendor.admin.submit')}</span>
            }
          </Button>
        </div>

      </Form>
    );
  }
}
