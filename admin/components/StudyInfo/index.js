import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Field, reduxForm } from 'redux-form';

import ReactSelect from '../../components/Input/ReactSelect';

const campaignOptions = [
  {
    label: '1',
    value: '1',
  }, {
    label: '2',
    value: '2',
  }, {
    label: '3',
    value: '3',
  },
];

@reduxForm({
  form: 'adminInfoFilter',
  enableReinitialize: true,
})
export default class StudyInfo extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="infoSection">
        <div className="head">
          <h2 className="pull-left">
            <span>Active: 2</span>
            <span>Inactive: 0</span>
            <span>Total: 2</span>
          </h2>
          <div className="btns pull-right">
            <form className="admin-info-filter">
              <div className="select pull-left">
                <Field
                  name="campaign-search"
                  className="campaign-search"
                  component={ReactSelect}
                  placeholder="Select Campaign"
                  searchPlaceholder="Search"
                  searchable
                  options={campaignOptions}
                  customSearchIconClass="icomoon-icon_search2"
                  onChange={this.campaignChanged}
                />
              </div>
              <Button bsStyle="primary" className="pull-left" onClick={() => {}}>
                <i className="icomoon-icon_calendar" />
                &nbsp;Date Range
              </Button>
            </form>
          </div>
        </div>
        <div className="tiles">
          <section>
            <div className="part study">
              <div className="title">study</div>
              <ul>
                <li>#</li>
                <li>STUDY NUMBER:</li>
                <li>STATUS: ON</li>
                <li>PROTOCOL:</li>
                <li>SPONSOR:</li>
                <li>CRO:</li>
                <li>INDICATION:</li>
                <li>PERCENTAGE:</li>
                <li>COLOR:</li>
              </ul>
            </div>
            <div className="part info">
              <div className="title">info</div>
              <ul>
                <li>SITE LOCATION:</li>
                <li>SITE NUMBER:</li>
                <li>ADDRESS:</li>
                <li>PAGE VIEWS:</li>
                <li>UNREAD TEXTS:</li>
                <li>AO:</li>
                <li>BD:</li>
                <li>CC:</li>
              </ul>
            </div>
            <div className="part campaign">
              <div className="title">campaign</div>
              <ul>
                <li>EXPOSURE LEVEL:</li>
                <li>TIER:</li>
                <li>GOAL:</li>
                <li>CAMPAIGN NUMBER:</li>
                <li>START DATE:</li>
                <li>END DATE:</li>
                <li>TOTAL DAYS:</li>
                <li>DAYS LEFT:</li>
                <li>CENTRAL:</li>
                <li>PQS:</li>
              </ul>
            </div>
            <div className="part stat">
              <div className="title">stats</div>
              <ul>
                <li>LAST 24 HOURS:</li>
                <li>CAMPAIGN TOTAL:</li>
                <li>GRAND TOTAL:</li>
                <li>NEW PATIENT:</li>
                <li>CALL / TEXT ATTEMPTED:</li>
                <li>DNQ / NOT INTERESTED:</li>
                <li>ACTION NEEDED:</li>
                <li>SCHEDULED:</li>
                <li>CONSENTED:</li>
                <li>SCREEN FAILED:</li>
                <li>RANDOMIZED:</li>
              </ul>
            </div>
          </section>
          <section>
            <div className="part study">
              <div className="title">study</div>
              <ul>
                <li>#</li>
                <li>STUDY NUMBER:</li>
                <li>STATUS: ON</li>
                <li>PROTOCOL:</li>
                <li>SPONSOR:</li>
                <li>CRO:</li>
                <li>INDICATION:</li>
                <li>PERCENTAGE:</li>
                <li>COLOR:</li>
              </ul>
            </div>
            <div className="part info">
              <div className="title">info</div>
              <ul>
                <li>SITE LOCATION:</li>
                <li>SITE NUMBER:</li>
                <li>ADDRESS:</li>
                <li>PAGE VIEWS:</li>
                <li>UNREAD TEXTS:</li>
                <li>AO:</li>
                <li>BD:</li>
                <li>CC:</li>
              </ul>
            </div>
            <div className="part campaign">
              <div className="title">campaign</div>
              <ul>
                <li>EXPOSURE LEVEL:</li>
                <li>TIER:</li>
                <li>GOAL:</li>
                <li>CAMPAIGN NUMBER:</li>
                <li>START DATE:</li>
                <li>END DATE:</li>
                <li>TOTAL DAYS:</li>
                <li>DAYS LEFT:</li>
                <li>CENTRAL:</li>
                <li>PQS:</li>
              </ul>
            </div>
            <div className="part stat">
              <div className="title">stats</div>
              <ul>
                <li>LAST 24 HOURS:</li>
                <li>CAMPAIGN TOTAL:</li>
                <li>GRAND TOTAL:</li>
                <li>NEW PATIENT:</li>
                <li>CALL / TEXT ATTEMPTED:</li>
                <li>DNQ / NOT INTERESTED:</li>
                <li>ACTION NEEDED:</li>
                <li>SCHEDULED:</li>
                <li>CONSENTED:</li>
                <li>SCREEN FAILED:</li>
                <li>RANDOMIZED:</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
