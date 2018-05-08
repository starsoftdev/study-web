/**
 *
 * Email Tutorial
 *
 */

import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { translate } from '../../../common/utilities/localization';

import img1 from '../../assets/images/email_tutorial_1.png';
import img2 from '../../assets/images/email_tutorial_2.png';
import img3 from '../../assets/images/email_tutorial_3.png';
import img4 from '../../assets/images/email_tutorial_4.png';
import img5 from '../../assets/images/email_tutorial_5.png';
import img6 from '../../assets/images/email_tutorial_6.png';
import img7 from '../../assets/images/email_tutorial_7.png';

class EmailTutorialSlider extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    closeModal: React.PropTypes.func,
    noFinishButton: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };

    this.images = [img1, img2, img3, img4, img5, img6, img7];
  }

  render() {
    const { step } = this.state;
    const handleNext = () => {
      this.imageArea.scrollTop = 0;
      if (step < this.images.length - 1) {
        this.setState({ step: Math.min(this.images.length - 1, step + 1) });
      } else if (this.props.closeModal) {
        this.props.closeModal();
      }
    };

    const handlePrev = () => {
      this.imageArea.scrollTop = 0;
      this.setState({ step: Math.max(0, step - 1) });
    };

    return (
      <div id="email-tutorial-slider">
        <div className="scroll-holder jcf--scrollable">
          <div className="image-area" ref={ref => this.imageArea = ref}>
            <img src={this.images[this.state.step]} alt="" />
          </div>
        </div>
        <div className="nav">
          <div className="row">
            <div className="col-xs-4 text-left">
              { step > 0 && <a className="lightbox-close btn btn-gray-outline" onClick={handlePrev}>{translate('portals.component.emailTutorialSlider.previousBtn')}</a> }
            </div>
            <div className="col-xs-4 text-center dotnav">
              <ul className="dotnav-dots">
                {
                  _.map(this.images, (v, i) => (<li key={i} className={classnames('dotnav-dot', { 'dotnav-dot_active': step === i })}></li>)
                  )
                }
              </ul>
            </div>
            {
              (!this.props.noFinishButton || step < this.images.length - 1) && (
                <div className="col-xs-4 text-right">
                  <a className="lightbox-close btn btn-primary" onClick={handleNext}>
                    { step < this.images.length - 1 ? translate('portals.component.emailTutorialSlider.nextBtn') : translate('portals.component.emailTutorialSlider.finishBtn')}
                  </a>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default EmailTutorialSlider;
