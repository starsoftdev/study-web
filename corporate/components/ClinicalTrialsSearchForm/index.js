import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import inViewport from 'in-viewport';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

import ClinicalTrialsSearchFormValidator from './validator';
import ReactSelect from '../../../app/components/Input/ReactSelect';
import Input from '../../../app/components/Input';

@reduxForm({
  form: 'find-studies',
  validate: ClinicalTrialsSearchFormValidator,
})

export class ClinicalTrialsSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    indications: PropTypes.array,
    individual: PropTypes.bool,
    countryCode: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
    this.state = {
      countryCode: props.countryCode ? props.countryCode : 'US',
    };
  }
  
  componentDidMount() {
    this.watcher = inViewport(this.animatedForm, this.setVisible);
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    const {
      handleSubmit,
      indications,
      individual,
    } = this.props;
    const distances = [
      { id: 10, name: '10 Miles' },
      { id: 50, name: '50 Miles' },
      { id: 100, name: '100 Miles' },
      { id: 250, name: '250 Miles' },
    ];

    const countries = [
      {
        name: 'Brazil',
        id: 'br',
      },
      {
        name: 'Canada',
        id: 'ca',
      },
      {
        name: 'Czech Republic',
        id: 'cz',
      },
      {
        name: 'France',
        id: 'fr',
      },
      {
        name: 'Germany',
        id: 'de',
      },
      {
        name: 'Italy',
        id: 'it',
      },
      {
        name: 'Japan',
        id: 'jp',
      },
      {
        name: 'Poland',
        id: 'pl',
      },
      {
        name: 'United Kingdom',
        id: 'uk',
      },
      {
        name: 'United States',
        id: 'us',
      },
    ];

    if (indications.length > 0 && indications[0].id !== -1) {
      indications.unshift({ id: -1, name: 'All' });
    }
    const isUS = this.props.countryCode === 'us';
    return (
      <form
        ref={(animatedForm) => { this.animatedForm = animatedForm; }}
        className="form-find-studies"
        data-formvalidation=""
        data-view="fadeInUp"
        onSubmit={handleSubmit}
      >
        <div className="field-row">
          <div className={classNames({ row: !isUS })}>
            {
              !isUS &&
              <div className="col-xs-6">
                <Field
                  name="countryCode"
                  component={ReactSelect}
                  placeholder="Select Country"
                  options={countries}
                  className="field-lg"
                  selectedValue={this.state.countryCode}
                  onChange={countryCode => {
                    if (countryCode) {
                      this.setState({ countryCode }, () => {
                        if (countryCode === 'us') {
                          browserHistory.push('');
                        } else {
                          browserHistory.push(`/${countryCode}`);
                        }
                      });
                    }
                  }}
                />
              </div>
            }
            <div className={classNames({ 'col-xs-6': !isUS })}>
              <Field
                name="postalCode"
                type="text"
                maxLength="5"
                component={Input}
                placeholder="Postal Code"
                className="field-row"
                bsClass="form-control input-lg"
              />
            </div>
          </div>
        </div>
        <div className="field-row">
          <Field
            name="distance"
            component={ReactSelect}
            placeholder="Select Distance"
            options={distances}
            className="field-lg"
          />
        </div>
        {
          !individual &&
          <div className="field-row">
            <Field
              name="indicationId"
              component={ReactSelect}
              placeholder="Select Indication"
              options={indications}
              className="field-lg"
            />
          </div>
        }
        <div className="field-row">
          <input type="reset" className="btn btn-default hidden input-lg" value="Reset" />
          <input type="submit" className="btn btn-default btn-block input-lg" value="FIND Trials!" />
        </div>
      </form>
    );
  }
}

export default ClinicalTrialsSearchForm;
