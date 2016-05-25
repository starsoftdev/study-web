import React from 'react'
import t from 'tcomb-form'

import {
  Indications,
  ExposureLevels,
  CampaignLengths
} from 'constants'

export function getModel (value) {
  const spec = {
    id: t.maybe(t.String),
    firstName: t.String,
    lastName: t.String,
    email: t.String,
    phone: t.String,
    siteAddress: t.String,
    organization: t.String,
    protocolNumber: t.String,
    sponsorEmail: t.String,
    croEmail: t.String,
    indication: t.enums(Indications),
    exposureLevel: t.enums(ExposureLevels),
    campaignLength: t.enums(CampaignLengths),
    patientMessagingSuite: t.Boolean,
  }

  return t.struct(spec)
}

const indicationOptions = {
  nullOption: {
    value: '',
    text: 'Select Indication'
  },
}

const exposureLevelOptions = {
  nullOption: {
    value: '',
    text: 'Select Exposure Level'
  },
}

const campaignLengthOptions = {
  nullOption: {
    value: '',
    text: 'Select Campaign Length'
  }
}

export let layout = function (locals) {

}

export const options = {
  // template: layout,
  auto: 'placeholders',
  fields: {
    id: {
      type: 'hidden',
    },
    firstName: {
      attrs: {
        placeholder: 'Enter Your First Name',
      }
    },
    lastName: {
      attrs: {
        placeholder: 'Enter Your Last Name',
      }
    },
    email: {
      attrs: {
        placeholder: 'Enter Your Email Address',
      }
    },
    phone: {
      attrs: {
        placeholder: 'Enter Your Phone Number',
      }
    },
    siteAddress: {
      attrs: {
        placeholder: 'Enter Your Site Address',
      }
    },
    organization: {
      attrs: {
        placeholder: 'Enter Your Organization Name',
      }
    },
    protocolNumber: {
      attrs: {
        placeholder: 'Enter Your Protocol Number',
      }
    },
    sponsorEmail: {
      attrs: {
        placeholder: 'Enter Sponsor Email Address',
      }
    },
    croEmail: {
      attrs: {
        placeholder: 'Enter CRO Email Address',
      }
    },
    indication: indicationOptions,
    exposureLevel: exposureLevelOptions,
    campaignLength: campaignLengthOptions,
    patientMessagingSuite: {
      label: 'Add Patient Messaging Suite ($247)',
    },
  }
}

const PatientForm = {
  getModel,
  // layout,
  options,
}

export default PatientForm
