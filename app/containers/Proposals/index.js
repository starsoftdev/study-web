/*
 *
 * Proposals
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';
import { selectProposals } from './selectors';
import { selectCurrentUser } from 'containers/App/selectors';
import { DateRange } from 'react-date-range';

import {
  getProposals,
} from 'containers/Proposals/actions';

import ProposalsTable from 'components/ProposalsTable';
import ProposalsForm from 'components/ProposalsForm';

export class Proposals extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getProposals: PropTypes.func,
    location: PropTypes.any,
    proposals: PropTypes.any,
    currentUser: PropTypes.any,
  }

  componentDidMount() {
    this.props.getProposals({test: true});
  }

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps', nextProps);
  }

  handleSelect(range){
    //console.log('range', range);
  }

  render() {
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Proposals - StudyKIK" />
        <section className="calendar-section receipts">
          <h2 className="main-heading">PROPOSALS</h2>
          <ProposalsForm {...this.props}/>
          <ProposalsTable {...this.props}/>

          <div id="date-range" className="lightbox fixed-popup">
            <DateRange
              onInit={this.handleSelect}
              onChange={this.handleSelect}
            />
          </div>
        </section>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  proposals: selectProposals(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProposals: (values) => dispatch(getProposals(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
