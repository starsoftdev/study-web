import React from 'react';
import inViewport from 'in-viewport';
import videoPlaceholder from '../../assets/images/video-placeholder.png';

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
            <h2 className="main-heading small-font">studykik is where you can find clinical trials near you!</h2>
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
              <p>
                Being able to find a research study has never been easier! StudyKIK is the leading
                website where clinical trial companies list their studies and eager volunteers
                find them to sign up instantly. It has never been easier to search and find clinical trials
                of all therapeutic types! Give it a try… you may be surprised with the studies you find!
                StudyKIK’s mission is change lives by helping new treatments come to market faster and
                to enable anyone who wants to volunteer for a research study
                to easily search, find, and sign up!
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
