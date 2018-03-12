const upgradeStudyFields = ['level', 'addPatientMessagingSuite', 'addPatientQualificationSuite', 'notes'];
export { upgradeStudyFields };

export default values => {
  const errors = {};
  const leadSourceErrors = [];
  if (!values.level && !values.addPatientQualificationSuite && !values.callTracking) {
    errors.level = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
    errors.addPatientQualificationSuite = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
    errors.callTracking = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
  }

  if (values.callTracking && values.leadSource) {
    values.leadSource.forEach((lead, index) => {
      const leadError = {};

      if (!lead.source) {
        leadError.source = 'Lead source can\'t be blank';
      }
      if (!lead.source_name) {
        leadError.source_name = 'Lead source name can\'t be blank';
      }
      if (!lead.source || !lead.source_name) {
        leadSourceErrors[index] = leadError;
      }
    });
  }

  if (leadSourceErrors && leadSourceErrors.length > 0) {
    return {
      ...errors,
      leadSource: leadSourceErrors,
    };
  } else {
    return errors;
  }
};
