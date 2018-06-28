/*
 *  saga to track corp landing pages
 */
import { take } from 'redux-saga/effects';

export default function* trackCorpPage() {
  while (true) {
    const { siteId, protocolId, studyId, sourceId } = yield take('Corp/TRACK_LANDING_PAGE');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Corp Tracking',
      payload: {
        siteId,
        protocolId,
        studyId,
        sourceId,
      },
    });
  }
}
