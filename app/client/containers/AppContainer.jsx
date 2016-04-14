import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { App } from '../components';
import { getConfig } from '../redux/ducks/config';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ replace: routerActions.replace, getConfig }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  render() {
    return (
      <App {...this.props} />
    );
  }
}
