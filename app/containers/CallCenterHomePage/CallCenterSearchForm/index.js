/**
 * Call Center Search Form
 *
 */

import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';

import Input from '../../../../common/components/Input/index';
import { translate } from '../../../../common/utilities/localization';
import validator from './validator';

const formName = 'CallCenter.Search';

@reduxForm({
  form: formName,
  validate: validator,
})
export default class CallCenterSearchForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  componentDidMount() {
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form className="form-search clearfix" onSubmit={handleSubmit}>
        <div className="field">
          <Button className="btn-enter" type="submit">
            <i className="icomoon-icon_search2" />
          </Button>
          <Field
            name="phone"
            type="tel"
            component={Input}
            placeholder={translate('container.page.callcenter.phone.placeholder')}
          />
        </div>
      </Form>
    );
  }
}
