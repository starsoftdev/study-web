import React from 'react';
import main from '../../assets/images/img19.svg';

import './styles.less';

export default class ComingSoon extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  render() {
    return (
      <main id="main">
        <div className="container">
          <div className="coming-soon">
            <div className="holder">
              <div className="img-holder">
                <img src={main} role="presentation" className="imgage" width="323" height="447" />
              </div>
              <div className="msg">
                <strong className="title">COMING SOON!</strong>
              </div>
            </div>

            {/*<div className="table-box">
              <div className="table-cell">
              </div>
            </div>*/}
          </div>
        </div>
      </main>
    );
  }
}
