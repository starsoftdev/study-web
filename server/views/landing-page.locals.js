const ViewHelper = require('../../app/common/helper/view.helper');

module.exports = (landing) => {
  // Used form rendering.
  // const indication = (landing.indication) ? landing.indication : '';
  const city = (landing.city) ? landing.city : '';
  const state = (landing.state) ? landing.state : '';
  const cityAndState = (city && state) ? ` ${city}, ${state}` : '';
  const location = landing.locationMask ? ` ${landing.locationMask}` : cityAndState;
  const indication = landing.indication;
  const title = (landing.title) ? landing.title : landing.studyName;
  const fullNamePlaceholder = (landing.fullNamePlaceholder) ? landing.fullNamePlaceholder : '* Full Name';
  const emailPlaceholder = (landing.emailPlaceholder) ? landing.emailPlaceholder : '* Email';
  const phonePlaceholder = (landing.phonePlaceholder) ? landing.phonePlaceholder : '* Mobile Phone';
  const instructions = (landing.instructions) ? landing.instructions : 'Enter your information to join!';
  const signupButtonText = (landing.signupButtonText) ? landing.signupButtonText : 'Sign up now!';
  const clickToCallButtonText = (landing.clickToCallButtonText) ? landing.clickToCallButtonText : 'Click to Call!';
  const clickToCallNumber = (landing.clickToCallButtonNumber) ? `tel:${landing.clickToCallButtonNumber}` : false;

  // Used article rendering.
  const landingDescription = (landing && landing.description && landing.description !== 'seed')
    ? landing.description
    : null;
  const imgSrc = (landing && landing.imgSrc) ? landing.imgSrc : null;
  const dataView = (imgSrc) ? 'slideInRight' : 'fadeInUp';
  const siteName = landing.siteName;
  let address = landing.address;
  const zip = landing.zip;
  if (city) {
    address += `, ${city}`;
  }
  if (state) {
    address += `, ${state}`;
  }
  if (zip) {
    address += `, ${zip}`;
  }
  const bySignUpText = (landing.bySignUpText) ? landing.bySignUpText :
    'By signing up you agree to receive text messages and emails about this and similar studies near you. ' +
    'You can unsubscribe at any time. Text messages and data rates may apply. Refer to Privacy Policy.';
  const ifInterestedInstructions = (landing.ifInterestedInstructions) ? landing.ifInterestedInstructions :
    'If interested, enter information above to sign up!';
  const isPdfPreview = imgSrc && /(?:\.([^.]+))?$/.exec(imgSrc[0]) === 'pdf';

  return {
    landing,
    location,
    title,
    fullNamePlaceholder,
    emailPlaceholder,
    phonePlaceholder,
    instructions,
    signupButtonText,
    clickToCallButtonText,
    clickToCallNumber,

    isPdfPreview,
    landingDescription,
    imgSrc,
    dataView,
    indication,
    siteName,
    address,
    bySignUpText,
    ifInterestedInstructions,
    formatPhone: ViewHelper.formatPhone,
    renderMarkdown: ViewHelper.renderMarkdown,
  };
};
