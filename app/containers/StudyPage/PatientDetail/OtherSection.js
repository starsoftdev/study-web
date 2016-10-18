/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import classNames from 'classnames';
import moment from 'moment-timezone';

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
      return (
        <div className={classNames('item others', { active: active })}>
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
                        {/*<Field*/}
                          {/*name="dob-month"*/}
                          {/*component={ReactSelect}*/}
                          {/*className="min-width min-height"*/}
                          {/*options={}*/}
                          {/*placeholder="Month"*/}
                        {/*/>*/}
                        <select
                          className=" jcf-hidden"
                        >
                          <option>Month</option>
                          <option>January</option>
                          <option>February</option>
                          <option>March</option>
                          <option>April</option>
                          <option>May</option>
                          <option>June</option>
                          <option>July</option>
                          <option>August</option>
                          <option>September</option>
                          <option>October</option>
                          <option>November</option>
                          <option>December</option>
                        </select>
                        <span className="jcf-select jcf-unselectable jcf-select-min-width jcf-select-min-height">
                          <span className="jcf-select-text">
                            <span>Month</span>
                          </span>
                          <span className="jcf-select-opener" />
                        </span>
                      </div>
                      <div className="col-small pull-left">
                        <select required className="min-height jcf-hidden">
                          <option>Day</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                          <option>13</option>
                          <option>14</option>
                          <option>15</option>
                          <option>16</option>
                          <option>17</option>
                          <option>18</option>
                          <option>19</option>
                          <option>20</option>
                          <option>21</option>
                          <option>22</option>
                          <option>23</option>
                          <option>24</option>
                          <option>25</option>
                          <option>26</option>
                          <option>27</option>
                          <option>28</option>
                          <option>29</option>
                          <option>30</option>
                          <option>31</option>
                        </select>
                        <span className="jcf-select jcf-unselectable jcf-select-min-height">
                          <span className="jcf-select-text">
                            <span>Day</span>
                          </span>
                          <span className="jcf-select-opener" />
                        </span>
                      </div>
                      <div className="col-small pull-left patient-age">
                        <select required className="min-height jcf-hidden">
                          <option>Year</option>
                          <option>1981</option>
                          <option>1982</option>
                          <option>1983</option>
                          <option>1984</option>
                          <option>1985</option>
                          <option>1986</option>
                          <option>1987</option>
                          <option>1988</option>
                          <option>1989</option>
                          <option>1990</option>
                          <option>1991</option>
                          <option>1992</option>
                          <option>1993</option>
                          <option>1994</option>
                          <option>1995</option>
                          <option>1996</option>
                          <option>1997</option>
                          <option>1998</option>
                          <option>1999</option>
                          <option>2000</option>
                          <option>2001</option>
                          <option>2002</option>
                        </select>
                        <span className="jcf-select jcf-unselectable jcf-select-min-height">
                          <span className="jcf-select-text">
                            <span>Year</span>
                          </span>
                          <span className="jcf-select-opener" />
                        </span>
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
