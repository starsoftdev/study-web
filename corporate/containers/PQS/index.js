import React from 'react';
import BackToTopButton from '../../components/BackTopButton';

export default class PQS extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  componentDidMount() {
  }

  render() {
    return (
      <main id="main">
        <div className="container">
          <section className="privacy-policy">
            <header className="text-center">
              <h2 className="main-heading">StudyKIK’s Patient Qualification Suite</h2>
            </header>
            <p>
              If your campaign has the Patient Qualification Suite, we're doing the work for you! Sit back, relax, and wait. We contact all new patients within 24 hours of when they sign up for your study (during the business week).
            </p>
            <p>
              To avoid confusing potential patients, please do not contact patients until they have been pre-screened and moved to the "Action Needed" column in your portal. We will  live transfer the patient to your site (optional) and will also send you an email every time someone has been successfully pre-screened.
            </p>
            <br />
            <h3>Pre-screening and your Portal</h3>
            <ul>
              <li>As patients sign up to learn more about your study, they are automatically added to the New Patient column. From there, our pre-screening team contacts them within 24 hours.</li>
              <li>If our pre-screening team is unable to reach a patient, they move them to the Call Attempted column and will follow up with them again. We contact each patient up to 10 times (4 phone calls, 5 text messages, and 1 email).</li>
              <li>Patients are moved to the Not Qualified column if they are unresponsive after all 10 attempts to contact them. We include a note that states that we were unable to reach the patient.</li>
              <li>When a patient is available, we use the IRB approved phone script that the site, sponsor, or CRO provides to review the study’s inclusion/ exclusion criteria with patients.</li>
              <li>Once pre-screened, interested patients are placed in the Action Needed column to let you know they are ready to be contacted by your site. A note is added to document their replies to every pre-screening question. Unqualified patients are moved to the DNQ column in your portal with a note that lets you know why they didn’t qualify.</li>
              <li>You are only responsible for the Action Needed, Scheduled, Consented, and Randomized columns. Patients should remain in the Action Needed column until you follow up with the patient.</li>
              <li>If you are unable to reach the patient in the Action Needed column, it is helpful if you add a note documenting your contact attempt. This lets us and your study sponsor know that you are trying to reach out to the patient.</li>
            </ul>
            <p>If you have any questions, please feel free to reach out to your site manager.</p>
            <br />
            <h3>What do I need to do when a referral is Successfully Pre-screened?</h3>
            <p>
              It’s easy! When a patient is successfully pre-screened, they’ll be moved to the Action Needed column in your portal.  Simply follow up with the patient. If you’re unable to get in touch with them and need to leave them in the Action Needed column, don’t forget to add a note.
            </p>
          </section>
        </div>
        <BackToTopButton />
      </main>
    );
  }

}
