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

import { submitForm } from 'containers/IrbAdCreationPage/actions';

import {
  fetchSites,
  fetchIndications,
} from 'containers/App/actions';
import {
  selectSiteLocations,
  selectIndications,
} from 'containers/App/selectors';


export class IrbAdCreationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    onSubmitForm: PropTypes.func.isRequired,
    fetchSites: PropTypes.func,
    fetchIndications: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.fetchIndications();
  }

  render() {
    const { siteLocations, indications } = this.props;

    return (
      <StickyContainer className="container-fluid">
        <section className="study-portal">
          <h2 className="main-heading">ORDER IRB AD CREATION</h2>
          <div className="form-study row">
            <div className="col-xs-6 form-holder">
              <IrbAdCreationForm
                onSubmit={this.onSubmitForm}
                siteLocations={siteLocations}
                indications={indications}
              />
            </div>

            <div className="fixed-block">
              <div className="fixed-block-holder">
                <Sticky className="sticky-shopping-cart">

                  <ShoppingCartForm />

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
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    fetchIndications: () => dispatch(fetchIndications()),
    onSubmitForm:     (values) => dispatch(submitForm(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IrbAdCreationPage);
