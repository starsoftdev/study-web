/*
 *
 * IrbAdCreationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import { createStructuredSelector } from 'reselect';
import IrbAdCreationForm from 'components/IrbAdCreationForm';
import ShoppingCartForm from 'components/ShoppingCartForm';
import { selectIrbAdCreationFormValues, selectIrbAdCreationFormError } from 'components/IrbAdCreationForm/selectors';
import { submitForm } from 'containers/IrbAdCreationPage/actions';

import {
  fetchSites,
  fetchIndications,
} from 'containers/App/actions';
import {
  selectSiteLocations,
  selectIndications,
} from 'containers/App/selectors';

import _ from 'lodash';

export class IrbAdCreationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    submitForm: PropTypes.func.isRequired,
    fetchSites: PropTypes.func,
    fetchIndications: PropTypes.func,
    formValues: PropTypes.object,
    hasError: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.props.submitForm.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.fetchIndications();
  }

  onSubmitForm(params) {
    const siteLocation = _.find(this.props.siteLocations, { id: this.props.formValues.siteLocation });
    this.submitForm(params, {
      ...this.props.formValues,
      siteLocationName: siteLocation.name,
    });
  }

  render() {
    const { siteLocations, indications, hasError } = this.props;

    const addOns = [{
      title: 'IRB Ad Creation',
      price: 177,
      quantity: 1,
      total: 177,
    }];

    return (
      <StickyContainer className="container-fluid">
        <section className="study-portal">
          <h2 className="main-heading">ORDER IRB AD CREATION</h2>
          <div className="form-study row">
            <div className="col-xs-6 form-holder">
              <IrbAdCreationForm
                siteLocations={siteLocations}
                indications={indications}
              />
            </div>

            <div className="fixed-block">
              <div className="fixed-block-holder">
                <Sticky className="sticky-shopping-cart">

                  <ShoppingCartForm showCards addOns={addOns} onSubmit={this.onSubmitForm} disableSubmit={hasError} />

                </Sticky>
              </div>
            </div>

          </div>
        </section>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  indications   : selectIndications(),
  formValues: selectIrbAdCreationFormValues(),
  hasError: selectIrbAdCreationFormError(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    fetchIndications: () => dispatch(fetchIndications()),
    submitForm:     (cartValues, formValues) => dispatch(submitForm(cartValues, formValues)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IrbAdCreationPage);
