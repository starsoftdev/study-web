import React from 'react'
import DocumentTitle from 'react-document-title'

import GetReferralForm from './components/GetReferralForm'

import './styles.less'

export default class GetReferral extends React.Component {
  render () {
    return (
      <DocumentTitle title="Get A Referral">
        <div className="inner-page top-margin">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="row referral-form">

                  <GetReferralForm />

                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
