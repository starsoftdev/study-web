/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import { Field } from 'redux-form';
import classNames from 'classnames';
import moment from 'moment-timezone';
import ReactSelect from 'react-select';

class OtherSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object,
  };

  componentDidMount() {
  }

  render() {
    const { active, currentUser, currentPatient } = this.props;
    if (currentPatient) {
      const now = moment();
      const months = moment.months();
      const monthOptions = now.months();
      for (let i = 0; i < monthOptions.length; i++) {
        const month = months[i];
        const monthOption = monthOptions[i];
        monthOptions[i] = {
          label: month,
          value: monthOption,
        };
      }
      const dates = now.dates().map(date => (
        {
          label: date,
          value: date,
        }
      ));
      const nowYear = now.year();
      const years = [];
      for (let year = nowYear; year > 1900; year--) {
        years.push({
          label: year,
          value: year,
        });
      }
      return (
        <div className={classNames('item others', { active })}>
          <div className="item-holder">
            <div className="dates">
              <strong className="title">Dates</strong>
              <ul className="list-unstyled list-radios">
                <li>
                  <span className="title">Signed Up</span>
                  <time dateTime={currentPatient.createdAt}>{moment.tz(currentPatient.createdAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
                </li>
                <li>
                  <span className="title">Updated</span>
                  <time dateTime={currentPatient.updatedAt}>{moment.tz(currentPatient.updatedAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
                </li>
              </ul>
            </div>
            <Form className="sub-holder form-lightbox" noValidate="novalidate">
              <div className="field-row full remove-bipolar">
                <strong className="label">Indications</strong>
                <div className="field">
                  <div className="category-list">
                    <div className="category">
                      <span className="bipolar-link">
                        <span className="text">Bipolar</span>
                        <a className="icomoon-icon_trash" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-row full">
                <div className="field add-indications">
                  <div className="indication-open-close">
                    <a className="btn btn-primary select-indication-opener">+ Add Indication</a>
                    <div className="select-indication-slide default-slide js-slide-hidden">
                      <div className="well custom-select-drop">
                        <div className="search-holder">
                          <input type="search" className="form-control keyword-search" id="search10" value="" />
                          <label htmlFor="search10" className="icomoon-icon_search2" />
                        </div>
                        <div className="jcf--scrollable">
                          <ul className="list-unstyled list select-indication">
                            <li>Acne</li>
                            <li>Back Pain</li>
                            <li>Magraine </li>
                            <li>Ring worm</li>
                            <li>COPD</li>
                            <li>Leg pain</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fields-holder">
                <strong className="title">OTHER INFORMATION</strong>
                <div className="field-row">
                  <strong className="label"><label htmlFor="patient-dob">Date of Birth</label></strong>
                  <div className="field">
                    <div className="row">
                      <div className="col-small pull-left">
                        <Field
                          name="dob-month"
                          component={ReactSelect}
                          className="min-height"
                          options={monthOptions}
                          placeholder="Month"
                        />
                      </div>
                      <div className="col-small pull-left">
                        <Field
                          name="dob-date"
                          component={ReactSelect}
                          className="min-height"
                          options={dates}
                          placeholder="Day"
                        />
                      </div>
                      <div className="col-small pull-left patient-age">
                        <Field
                          name="dob-year"
                          component={ReactSelect}
                          className="min-height"
                          options={years}
                          placeholder="Year"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field-row">
                  <strong className="label"><label htmlFor="patient-gender">Gender </label></strong>
                  <div className="field patient-gender">
                    <select id="patient-gender" required className="jcf-hidden">
                      <option>Select Gender</option>
                      <option>N/A</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <span className="jcf-select jcf-unselectable">
                      <span className="jcf-select-text">
                        <span>Select Gender</span>
                      </span>
                      <span className="jcf-select-opener" />
                    </span>
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label"><label htmlFor="patient-bmi">BMI </label></strong>
                  <div className="field">
                    <input type="text" className="form-control" id="patient-bmi" required value={currentPatient.bmi} />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label"><label htmlFor="patient-source5">Source</label></strong>
                  <div className="field">
                    <input type="text" className="form-control" value={currentPatient.source ? currentPatient.source.type : null} disabled readOnly />
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default OtherSection;
