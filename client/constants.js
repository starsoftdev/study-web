import keymirror from 'keymirror'

export const Indications = keymirror({
  'Other Study Type': null,
  'Abnormal bleeding': null,
  'Acid Reflux':null,
  'Acne': null,
})

export const ExposureLevels = {
  'Diamond': 'Diamond: $3059',
  'Platinum': 'Platinum: $1559',
  'Gold': 'Gold: $559',
  'Silver': 'Silver: $209',
  'Bronze': 'Bronze: $59',
}

export const CampaignLengths = keymirror({
  'One Week': null,
  'Two Weeks': null,
  'One Month': null,
  'Two Months': null,
  'Three Months': null,
})

export const DistanceOptions = [
  { value: '8000', text: 'Distance' },
  { value: '10', text: '10 miles' },
  { value: '50', text: '50 miles' },
  { value: '100', text: '100 miles' },
  { value: '250', text: '250 miles' },
]

export const EnumOfDistances = [ '8000', '10', '50', '100', '250' ]

export const StudyTypes = {
  '0':   'Any Type',
  '350': 'Abnormal bleeding',
  '351': 'Acid Reflux',
  '352': 'Acne',
  '353': 'Actinic Keratosis',
}

export const ContactCompanyTypes = keymirror({
  'Site': null,
  'Sponsor': null,
  'CRO': null,
})
