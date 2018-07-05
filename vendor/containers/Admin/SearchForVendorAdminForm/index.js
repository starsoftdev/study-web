import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../../app/components/Input';

const formName = 'VendorAdminPage.SearchForVendorAdminForm';

@reduxForm({ form: formName })
export default class SearchForVendorAdminForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    saving: PropTypes.bool,
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form className="form-search pull-left" onSubmit={handleSubmit}>
        <div className="fields-holder">
          <div className="pull-left col no-left-padding">
            <div className="has-feedback ">
              <Button
                className="btn-enter"
                type="submit"
              >
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="search"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
              />
            </div>
          </div>
        </div>
      </Form>
    );
  }
}