export default function buildErrorMessageFromValidationResult (validationResult, field = '') {
  if (Array.isArray(validationResult)) {
    return field ? `${field}: ${validationResult.join('. ')}` : validationResult.join('. ')
  } else if (typeof validationResult === 'string') {
    return field ? `${field}: ${validationResult}` : validationResult
  }

  return Object.keys(validationResult).reduce((lines, innerField) => {
    return lines.concat(
      buildErrorMessageFromValidationResult(
        validationResult[innerField],
        field ? `${field}.${innerField}` : innerField
      )
    )
  }, []).join('\n')
}
