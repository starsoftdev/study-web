/*
 *  saga to load auth user details from the just token
 */
import { take } from 'redux-saga/effects';
import {
  TRACK_LANDING_PAGE,
} from '../constants/constants';

export default function* trackLandingPage() {
  while (true) {
    const { siteId, protocolId, studyId, sourceId } = yield take(TRACK_LANDING_PAGE);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Landing Page Tracking',
      payload: {
        siteId,
        protocolId,
        studyId,
        sourceId,
      },
    });
  }
}
