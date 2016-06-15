export function isValidCurrency (str) {
	const regex = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/
  return regex.test(str)
}

export function strToFloat (str) {
	return Number(str.replace(/[^0-9\.]+/g, ''))
}
