/**
 * Created by mike on 9/20/16.
 */

// sanitize props from redux form field props
export default function sanitizeProps(prop) {
  const newSanitizedProp = Object.assign({}, prop);
  delete newSanitizedProp.initialValue;
  delete newSanitizedProp.array;
  delete newSanitizedProp.anyTouched;
  delete newSanitizedProp.asyncValidate;
  delete newSanitizedProp.asyncValidating;
  delete newSanitizedProp.autofill;
  delete newSanitizedProp.autofilled;
  delete newSanitizedProp.onUpdate;
  delete newSanitizedProp.valid;
  delete newSanitizedProp.invalid;
  delete newSanitizedProp.dirty;
  delete newSanitizedProp.pristine;
  delete newSanitizedProp.active;
  delete newSanitizedProp.touched;
  delete newSanitizedProp.visited;
  delete newSanitizedProp.blur;
  delete newSanitizedProp.change;
  delete newSanitizedProp.destroy;
  delete newSanitizedProp.dispatch;
  delete newSanitizedProp.handleSubmit;
  delete newSanitizedProp.initialize;
  delete newSanitizedProp.initialized;
  delete newSanitizedProp.initialValues;
  delete newSanitizedProp.reset;
  delete newSanitizedProp.submitting;
  delete newSanitizedProp.submitFailed;
  delete newSanitizedProp.submitSucceeded;
  delete newSanitizedProp.touch;
  delete newSanitizedProp.untouch;
  delete newSanitizedProp.warning;
  delete newSanitizedProp.onClose;
  delete newSanitizedProp.pure;
  delete newSanitizedProp.validate;
  delete newSanitizedProp.error;
  delete newSanitizedProp.clientId;
  return newSanitizedProp;
}
