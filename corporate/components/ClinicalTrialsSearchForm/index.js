import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import inViewport from 'in-viewport';

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
    handleDistanceChoose: PropTypes.func,
    handleIndicationChoose: PropTypes.func,
    indications: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
  }

  componentWillMount() {}

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
    const { handleIndicationChoose, handleDistanceChoose, handleSubmit, indications } = this.props;
    const distances = [
      { id: 10, name: '10 Miles' },
      { id: 50, name: '50 Miles' },
      { id: 100, name: '100 Miles' },
      { id: 250, name: '250 Miles' },
    ];

    if (indications.length > 0 && indications[0].id !== -1) {
      indications.unshift({ id: -1, name: 'All' });
    }

    return (
      <form
        ref={(animatedForm) => { this.animatedForm = animatedForm; }}
        action="#"
        className="form-find-studies"
        data-formvalidation=""
        data-view="fadeInUp"
        onSubmit={handleSubmit}
      >
        <Field
          name="postalCode"
          type="text"
          maxLength="5"
          component={Input}
          placeholder="Postal Code"
          className="field-row"
          bsClass="form-control input-lg"
        />
        <div className="field-row">
          <Field
            name="distance"
            component={ReactSelect}
            placeholder="Select Distance"
            options={distances}
            className="field-lg"
            onChange={handleDistanceChoose}
          />
        </div>
        <div className="field-row">
          <Field
            name="indication_id"
            component={ReactSelect}
            placeholder="Select Indication"
            options={indications}
            className="field-lg"
            onChange={handleIndicationChoose}
          />
        </div>
        <div className="field-row">
          <input type="reset" className="btn btn-default hidden input-lg" value="Reset" />
          <input type="submit" className="btn btn-default btn-block input-lg" value="FIND Trials!" />
        </div>
      </form>
    );
  }
}

export default ClinicalTrialsSearchForm;
