/**
 *
 * Add New Card Form
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';
import { selectSavedCard } from '../../containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from '../../components/LoadingSpinner';
import { MONTH_OPTIONS as monthOptions, YEAR_OPTIONS as yearOptions } from '../../common/constants';
import { translate } from '../../../common/utilities/localization';

const formName = 'addNewCard';

const mapStateToProps = createStructuredSelector({
  savedCard: selectSavedCard(),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps)
export default class AddNewCardForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    savedCard: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { savedCard, handleSubmit } = this.props;

    const localeMonthOptions = monthOptions.map(month => ({
      value: month.value,
      label: translate(`corporate.page.paymentInformation.addNewCardForm.moth${month.label}`),
    }));

    return (
      <form className="form-add-new-card fs-hide" onSubmit={handleSubmit}>
        <div className="add-new-card scroll-holder jcf--scrollable">
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>{translate('portals.component.addNewCardForm.nameLabel')}</label>
            </strong>
            <div className="field col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name="firstName"
                    component={Input}
                    type="text"
                    placeholder={translate('portals.component.addNewCardForm.firstNamePlaceholder')}
                    disabled={savedCard.saving}
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="lastName"
                    component={Input}
                    type="text"
                    placeholder={translate('portals.component.addNewCardForm.lastNamePlaceholder')}
                    disabled={savedCard.saving}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>{translate('portals.component.addNewCardForm.cardNumberLabel')}</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="number"
                component={Input}
                type="text"
                disabled={savedCard.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>{translate('portals.component.addNewCardForm.expirationLabel')}</label>
            </strong>
            <div className="field col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name="expirationMonth"
                    component={ReactSelect}
                    placeholder={translate('portals.component.addNewCardForm.monthPlaceholder')}
                    options={localeMonthOptions}
                    disabled={savedCard.saving}
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="expirationYear"
                    component={ReactSelect}
                    placeholder={translate('portals.component.addNewCardForm.yearPlaceholder')}
                    options={yearOptions}
                    disabled={savedCard.saving}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>{translate('portals.component.addNewCardForm.cvcLabel')}</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="cvc"
                component={Input}
                type="text"
                disabled={savedCard.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>{translate('portals.component.addNewCardForm.postalCodeLabel')}</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="billingPostalCode"
                component={Input}
                type="text"
                disabled={savedCard.saving}
              />
            </div>
          </div>
          <div className="btn-block text-right">
            <button
              type="submit"
              className="btn btn-default btn-add-row"
              disabled={savedCard.saving}
            >
              {savedCard.saving
                ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
                : <span>{translate('portals.component.addNewCardForm.submitBtn')}</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}
