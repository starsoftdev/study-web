import React from 'react';
// import main from '../../assets/images/img19.svg';
import main from '../../assets/images/comingSoon.png';

import './styles.less';

export default class ComingSoon extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  render() {
    return (
      <main id="main">
        <div className="container">
          <div className="coming-soon">
            <div className="v-align">
              <div className="holder">
                <div className="img-holder">
                  <img src={main} alt="" className="image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
