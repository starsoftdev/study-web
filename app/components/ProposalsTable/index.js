/**
*
* Proposals Table
*
*/

import React, { Component, PropTypes } from 'react';
import _ from 'lodash'
import moment from 'moment'
import './styles.less';

class ProposalsTable extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {};

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps', nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(this.refs);
  }

  onClick(ev) {
    console.log('onClick', ev);
  }

  render() {
    let proposals = []

    _.map(this.props.proposals, (source, key) => {
      let date = new Date(source.created);
      let dateWrapper = moment(date);
      proposals.push(
        <tr key={key}>
          <td>
            <span className="sm-container">
              <span
                className="input-style"
                onClick={this.onClick}
              >
                <input
                  type="checkbox"
                  name={key}
                  ref={"input-"+key}
                />
              </span>
            </span>
          </td>
          <td>{dateWrapper.calendar()}</td>
          <td>{source.site}</td>
          <td>{source.proposalNumber}</td>
          <td>{source.protocol}</td>
          <td>{source.total}</td>
        </tr>
      )
    })

    return (
      <div className="table-holder">
        <table className="table">
          <colgroup>
            <col style={{ width: "9%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "24%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "auto" }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <span className="sm-container">
                  <span className="input-style" onClick={this.onClick}>
                    <input id="test" type="checkbox" data-check-pattern="[name^='some-key']" />
                  </span>
                  <span>#</span><i className="caret-arrow" />
                </span>
              </th>
              <th>DATE <i className="caret-arrow" /></th>
              <th>SITE NAME <i className="caret-arrow" /></th>
              <th>Proposal NUMBER <i className="caret-arrow" /></th>
              <th>PROTOCOL NUMBER <i className="caret-arrow" /></th>
              <th>TOTAL <i className="caret-arrow" /></th>
            </tr>
          </thead>
          <tbody>
            {proposals}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProposalsTable;
