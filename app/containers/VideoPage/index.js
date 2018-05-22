/*
 *
 * VideoPage
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import YouTube from 'react-youtube';
import EmailTutorialSlider from '../../components/EmailTutorialSlider/index';
import { translate } from '../../../common/utilities/localization';

export default class HelpSupportPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const videos = [
      {
        title: translate('portals.page.videoPage.homepage'), id: 'AIeAUpk1HtM',
      },
      {
        title: translate('portals.page.videoPage.profile'), id: 'CElyoWDK-lU',
      },
      {
        title: translate('portals.page.videoPage.sitesAndUsers'), id: 'NSVbBfgLPus',
      },
      {
        title: translate('portals.page.videoPage.viewPatients'), id: 'sijGIJaS688',
      },
      {
        title: translate('portals.page.videoPage.renewStudy'), id: 'c2x9kqM52j8',
      },
      {
        title: translate('portals.page.videoPage.upgradeStudy'), id: 'EH5V-yiNPOo',
      },
      {
        title: translate('portals.page.videoPage.pms'), id: 'PxOHrZEVUZw',
      },
      {
        title: translate('portals.page.videoPage.patientDb'), id: 'vJbb6O_My_s',
      },
      {
        title: translate('portals.page.videoPage.calendar'), id: 'qvSWHzzZKa4',
      },
      {
        title: translate('portals.page.videoPage.irbAd'), id: 'lYE4xkDrfdw',
      },
      {
        title: translate('portals.page.videoPage.proposal'), id: '9Ah2VEO5pvI',
      },
    ];
    const opts = {
      width: '694',
      height: '400',
      playerVars: {
        rel: 0,
      },
    };

    return (
      <div className="container-fluid">
        <Helmet title="Tutorials - StudyKIK" />
        <section className="study-portal">
          <h2 className="main-heading">{translate('portals.page.videoPage.pageTitle')}</h2>
          <div className="videos">
            {
              videos.map(v => (
                <div key={v.id} className="video">
                  <p className="label">{v.title}</p>
                  <YouTube videoId={v.id} opts={opts} />
                </div>
              ))
            }
          </div>
          <div className="video">
            <p className="label">{translate('portals.page.videoPage.emailCredits')}</p>
            <div id="slider-container">
              <EmailTutorialSlider noFinishButton />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
