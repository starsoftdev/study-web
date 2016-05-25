import React from 'react'
import EditPatientForm from 'components/EditPatientForm'

import './styles.less'

export default class GetProposal extends React.Component {
  render () {
    return <EditPatientForm editing={false} {...this.props} />
  }
}
