const upgradeStudyFields = ['level', 'addPatientMessagingSuite', 'addPatientQualificationSuite', 'notes'];
export { upgradeStudyFields };

export default values => {
  const errors = {};
  const leadSourceErrors = [];
  if (!values.level && !values.addPatientQualificationSuite) {
    errors.level = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
    errors.addPatientQualificationSuite = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
  }

  if (values.callTracking && values.leadSource) {
    values.leadSource.forEach((lead, index) => {
      const leadError = {};

      if (!lead.source_id) {
        leadError.source_id = 'Lead source can\'t be blank';
      }
      if (!lead.source_name) {
        leadError.source_name = 'Lead source name can\'t be blank';
      }
      leadSourceErrors[index] = leadError;
    });
  }

  return {
    ...errors,
    leadSource: leadSourceErrors,
  };
};
