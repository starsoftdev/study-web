import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { change, Field, reduxForm } from 'redux-form';
import Input from '../../../../app/components/Input';
import LoadingSpinner from '../../../../app/components/LoadingSpinner';
import { translate } from '../../../../common/utilities/localization';
import { addStudyNumber, fetchVendorStudies } from './actions';
import { selectStudiesForVendor } from './selectors';
import { selectAsyncErrorBool, selectAsyncErrorValidating, selectValues } from '../../../../common/selectors/form.selector';
import validator from './validator';
import { asyncValidate } from './asyncValidate';

const formName = 'VendorAdminPage.EditVendorStudiesForm';

const mapStateToProps = createStructuredSelector({
  asyncValidating: selectAsyncErrorValidating(formName),
  asyncError: selectAsyncErrorBool(formName),
  values: selectValues(formName),
  vendorStudies: selectStudiesForVendor(),
});
const mapDispatchToProps = {
  addStudyNumber,
  change,
  fetchVendorStudies,
};

@reduxForm({
  form: formName,
  validate: validator,
  asyncValidate,
  asyncBlurFields: ['studyId'],
  shouldAsyncValidate: ({ trigger }) => trigger !== 'submit',
})
@connect(mapStateToProps, mapDispatchToProps)
export default class EditVendorStudiesForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addStudyNumber: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    fetchVendorStudies: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    asyncValidating: PropTypes.bool.isRequired,
    asyncError: PropTypes.bool.isRequired,
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
    if (!asyncValidating && !asyncError && studyId) {
      const duplicateIndex = _.findIndex(vendorStudies, { studyId });
      // check if a duplicate exists
      if (duplicateIndex === -1) {
        addStudyNumber(studyId);
      }
    }
  };

  renderStudyNumbers = () => {
    const { vendorStudies } = this.props;
    return vendorStudies.map(item => {
      return (
        <span className="number-span" key={item.studyId}>
          {item.studyId} <a className="btn-close">
            <i className="icomoon-icon_close" />
          </a>
        </span>
      );
    });
  };

  render() {

    const { handleSubmit, saving } = this.props;

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
          <Button bsStyle="primary" type="submit">
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
