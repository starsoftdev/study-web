import React, {PropTypes} from 'react';

import FormSubscribe from './FormSubscribe';
import FooterNavBar from './FooterNavBar';
import SocialNetworks from './SocialNetworks';

export default class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  render() {
    return (
      <footer id="footer">
        <FormSubscribe />
        <div className="footer-holder">
          <div className="container-fluid">
            <div className="clearfix">
              <p className="copyright pull-left">© StudyKIK 2016. All rights reserved</p>
              <FooterNavBar />
              <SocialNetworks />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
