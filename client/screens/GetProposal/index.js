import React from 'react'
import DocumentTitle from 'react-document-title'

import GetProposalForm from './components/GetProposalForm'

import './styles.less'

export default class GetProposal extends React.Component {
  render () {
    return (
      <DocumentTitle title="Get A Study Proposal">
        <div className="inner-page top-margin">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
                <div className="proposal-section">
                    <div className="container-fluid">
                      <div className="row">
      <GetProposalForm editing={false} {...this.props} />
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
