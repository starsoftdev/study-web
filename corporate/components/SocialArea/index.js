import React, { PropTypes } from 'react';
import { PinterestButton } from 'react-social';

export class SocialArea extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    alignCenter: PropTypes.bool,
    study: PropTypes.object,
    landing: PropTypes.object,
    location: PropTypes.any,
    imgSrc: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.shareFB = this.shareFB.bind(this);
    this.shareTwitter = this.shareTwitter.bind(this);
  }

  shareFB(ev) {
    ev.preventDefault();
    const { landing } = this.props;
    window.open(`http://www.facebook.com/sharer.php?u=${location.href}`, landing.studyName, 'width=600, height=530');
  }

  shareTwitter(ev) {
    ev.preventDefault();
    const { landing } = this.props;
    window.open(`https://twitter.com/intent/tweet?text=${landing.studyName} ${location.href}`, landing.studyName, 'width=600,height=530');
  }

  render() {
    const { landing, imgSrc } = this.props;

    const shareThisStudyText = (landing.shareThisStudyText) ? landing.shareThisStudyText : 'Share this study:';

    if (landing.showSocialMediaButtons) {
      return (
        <div className="social-area clearfix">
          <h3 className="pull-left">
            {shareThisStudyText}
          </h3>
          <ul className="social-networks pull-left list-inline">
            <li className="facebook">
              <a

                onClick={this.shareFB}
              >
                <i className="icomoon-facebook-square" />
              </a>
            </li>
            <li className="twitter">
              <a

                onClick={this.shareTwitter}
              >
                <i className="icomoon-twitter-square" />
              </a>
            </li>
            {imgSrc &&
            <li className="pinterest">
              <PinterestButton element="a" media={imgSrc}>
                <i className="icomoon-pinterest-square" />
              </PinterestButton>
            </li>
            }
            <li className="gmail">
              <a href={`mailto:?subject=${landing.studyName}&body=${location.href}`}>
                <i className="icomoon-envelope-square" />
              </a>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default SocialArea;
