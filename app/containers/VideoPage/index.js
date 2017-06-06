/*
 *
 * VideoPage
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import YouTube from 'react-youtube';

export default class HelpSupportPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const videos = [
      {
        title: 'Homepage', id: 'AIeAUpk1HtM',
      },
      {
        title: 'Profile', id: 'CElyoWDK-lU',
      },
      {
        title: 'Sites and Users', id: 'NSVbBfgLPus',
      },
      {
        title: 'View Patients', id: 'sijGIJaS688',
      },
      {
        title: 'View Patients', id: 'c2x9kqM52j8',
      },
      {
        title: 'Upgrade a Study', id: 'EH5V-yiNPOo',
      },
      {
        title: 'PMS', id: 'PxOHrZEVUZw',
      },
      {
        title: 'Patient Database', id: 'vJbb6O_My_s',
      },
      {
        title: 'Calendar', id: 'qvSWHzzZKa4',
      },
      {
        title: 'IRB Ad', id: 'lYE4xkDrfdw',
      },
    ];
    const opts = {
      width: '60%',
      playerVars: {
        rel: 0,
      },
    };

    return (
      <div className="container-fluid">
        <Helmet title="Videos - StudyKIK" />
        <section className="study-portal">
          <h2 className="main-heading">Videos</h2>
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
        </section>
      </div>
    );
  }
}
