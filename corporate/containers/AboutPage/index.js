import React from 'react';
import inViewport from 'in-viewport';
import { translate } from '../../../common/utilities/localization';
import videoPlaceholder from '../../assets/images/video-placeholder.png';
import BackToTopButton from '../../components/BackTopButton';

export default class AboutPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  constructor(props) {
    super(props);
    this.watcherA = null;
    this.watcherB = null;
  }

  componentDidMount() {
    this.watcherA = inViewport(this.slideInFirst, this.setVisible);
    this.watcherB = inViewport(this.slideInSecond, this.setVisible);
  }

  componentWillUnmount() {
    this.watcherA.dispose();
    this.watcherB.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    return (
      <main id="main">
        <div className="container">
          <div className="text-center video-area">
            <h2 className="main-heading small-font">{translate('corporate.page.about.header')}</h2>
            <div
              className="video"
            >
              <div>
                <img src={videoPlaceholder} width="608" height="283" alt="video" className="video-placeholder" />
                <iframe className="youtube-player" type="text/html" width="854" height="480" frameBorder="0" allowFullScreen="true" src="https://www.youtube.com/embed/MsDuAeJ2DZ8?wmode=opaque"></iframe>
              </div>
            </div>
            <div
              className="info"
              data-view="fadeInUp"
              ref={(slideInSecond) => { this.slideInSecond = slideInSecond; }}
            >
              <p>{translate('corporate.page.about.copy')}</p>
            </div>
          </div>
        </div>
        <BackToTopButton />
      </main>
    );
  }
}
