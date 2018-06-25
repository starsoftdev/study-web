import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../../components/Input';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { translate } from '../../../../../common/utilities/localization';

@reduxForm({ form: 'addVendorAdminForm' })

export class AddVendorAdminForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      numbers: ['20001', '20002'],
    };
  }

  renderNumbers = () => {
    return this.state.numbers.map((item) => {
      return (<span className="number-span" key={item}>
        {item} <a className="btn-close"><i className="icomoon-icon_close"></i></a>
      </span>);
    });
  }

  render() {

    return (
      <form action="#" className="form-lightbox dashboard-lightbox study-number-form" onSubmit={this.props.handleSubmit}>

        <div className="field-row">
          <div className="field">
            <Field
              name="name"
              component={Input}
              placeholder={translate('client.page.vendor.admin.studyNumber')}
              type="text"
              className="pull-left"
            />
            <button type="button" className="add-study-number btn-primary btn"><i className="glyphicon glyphicon-plus"></i></button>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            { this.renderNumbers() }
          </div>
        </div>

        <div className="field-row text-right no-margins">
          <button type="submit" className="btn btn-primary">
            {this.props.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{translate('client.page.vendor.admin.submit')}</span>
            }
          </button>
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
)(AddVendorAdminForm);
