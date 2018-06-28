export function trackLandingPage(payload) {
  return {
    type: 'Corp/TRACK_LANDING_PAGE',
    ...payload,
  };
}
