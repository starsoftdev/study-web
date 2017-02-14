/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-template */

import React, { PropTypes } from 'react';
import inViewport from 'in-viewport';
import classNames from 'classnames';
import Remarkable from 'remarkable';

import SocialArea from '../SocialArea';

export class LandingArticle extends React.Component {

  static propTypes = {
    study: PropTypes.object,
    landing: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.watcherA = null;
    this.watcherB = null;

    this.setVisible = this.setVisible.bind(this);
  }

  componentDidMount() {
    this.watcherA = inViewport(this.slideInLeft, this.setVisible);
    this.watcherB = inViewport(this.slideInRight, this.setVisible);
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
    const { study, landing } = this.props;
    const md = new Remarkable();
    const imgSrc = (landing && landing.imgSrc) ? landing.imgSrc : null;
    const dataView = (imgSrc) ? 'slideInRight' : 'fadeInUp';
    const indication = study.indication.name;
    const siteName = study.sites[0].name;

    const landingDescription = (landing && landing.description && landing.description !== 'seed') ? landing.description : null;

    let address = study.sites[0].address;
    const city = study.sites[0].city;
    const state = study.sites[0].state;
    const zip = study.sites[0].zip;

    if (city) {
      address += ', ' + city;
    }

    if (state) {
      address += ', ' + state;
    }

    if (zip) {
      address += ', ' + zip;
    }

    md.set({
      html: true,
      breaks: true,
    });

    const markdown = md.render(landingDescription);

    return (
      <article className="landing post">
        <div className="row">
          <div
            ref={(slideInRight) => { this.slideInRight = slideInRight; }}
            className={classNames({ 'col-xs-12 col-sm-6 pull-right': imgSrc, centered: !imgSrc })}
            data-view={dataView}
          >
            <h2 className={classNames({ nodesc: !landingDescription })}>
              {indication}
            </h2>
            {landingDescription &&
              <div dangerouslySetInnerHTML={{ __html: markdown }} />
            }
            <strong className="title text-uppercase">{siteName}</strong>
            <address>{address}</address>
            <p className="text-underline">
              If interested, enter information above to sign up!
            </p>
            <p className="note">
              By signing up you agree to receive text messages and emails about this and similar studies near you.
              You can unsubscribe at any time.
            </p>
            {!imgSrc &&
              <SocialArea alignCenter />
            }
          </div>
          <div
            ref={(slideInLeft) => { this.slideInLeft = slideInLeft; }}
            className="col-xs-12 col-sm-6"
            data-view="slideInLeft"
          >
            {imgSrc &&
              <div className="img-holder">
                <img src={imgSrc} width="854" height="444" alt="preview" className="img-responsive" />
              </div>
            }
            {imgSrc &&
              <SocialArea />
            }
          </div>
        </div>
      </article>
    );
  }
}

export default LandingArticle;
