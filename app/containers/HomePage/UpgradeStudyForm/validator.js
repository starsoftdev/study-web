const upgradeStudyFields = ['level', 'addPatientMessagingSuite', 'addPatientQualificationSuite', 'notes'];
export { upgradeStudyFields };

export default values => {
  const errors = {};

  if (!values.level && !values.addPatientMessagingSuite && !values.addPatientQualificationSuite) {
    errors.level = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
    errors.addPatientMessagingSuite = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
    errors.addPatientQualificationSuite = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
  }
  return errors;
};
