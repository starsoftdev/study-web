import React from 'react';
import { default as Header } from '../../components/Header';
import { default as Footer } from '../../components/Footer';

import './styles.less';

export default class Corporate extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillReceiveProps() {}

  render() {
    return (
      <div id="wrapper">
        <Header {...this.props} />
        {React.Children.toArray(this.props.children)}
        <Footer {...this.props} />
      </div>
    );
  }
}
