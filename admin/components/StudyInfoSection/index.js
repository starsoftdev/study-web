import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from '../Input/Checkbox';

export class StudyInfoSection extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    study: PropTypes.object,
  };

  constructor() {
    super();

    this.onCheckboxClick = this.onCheckboxClick.bind(this);

    this.state = {
      userEmailNotif: [
        {
          email: 'mo@studykik.com',
          checked: false,
        },
        {
          email: 'bob@studykik.com',
          checked: true,
        },
      ],
      emailNotif: [
        {
          email: 'joe@studykik.com',
          checked: false,
        },
        {
          email: 'chris@studykik.com',
          checked: true,
        },
        {
          email: 'roy@studykik.com',
          checked: true,
        },
      ],
    };
  }

  onCheckboxClick(arrayName, index, value) {
    this.setState({
      [arrayName]: this.state[arrayName].map((e, i) => {
        return i === index ? { ...e, checked: value } : e;
      }),
    });
  }

  render() {
    const { userEmailNotif, emailNotif } = this.state;

    return (
      <div id="studyInfoSection">
        <h2>{this.props.study.id}</h2>
        <ul className="section">
          <li>STATUS: </li>
          <li>STUDY URL: </li>
          <li>INDICATION: </li>
          <li>PROTOCOL: </li>
          <li>SPONSOR: </li>
          <li>CRO: </li>
        </ul>
        <ul className="section">
          <li>SITE LOCATION: </li>
          <li>SITE NUMBER: </li>
          <li>SITE ADDRESS: </li>
          <li>RECRUITMENT PHONE: </li>
          <li>PRINCIPAL INVESTIGATOR: </li>
        </ul>
        <ul className="section">
          <li>AO: </li>
          <li>BD: </li>
          <li>CC: </li>
        </ul>
        <div className="section">
          <div className="smallSection">
            <h3>USER EMAIL NOTIFICATION</h3>
            <ul>
              {
                userEmailNotif.map((e, i) => {
                  return (
                    <li key={i} className="hasCheckbox">
                      <Checkbox name="userEmailNotif" input={{ checked: e.checked, onChange: (v) => this.onCheckboxClick('userEmailNotif', i, v) }} />
                      {e.email}
                    </li>
                  );
                })
              }
            </ul>
            <Button bsStyle="primary" type="submit">Add</Button>
          </div>
          <div className="smallSection">
            <h4>EMAIL NOTIFICATION</h4>
            <ul>
              {
                emailNotif.map((e, i) => {
                  return (
                    <li key={i} className="hasCheckbox">
                      <Checkbox name="emailNotif" input={{ checked: e.checked, onChange: (v) => this.onCheckboxClick('emailNotif', i, v) }} />
                      {e.email}
                    </li>
                  );
                })
              }
            </ul>
            <Button bsStyle="primary" type="submit">Add</Button>
          </div>
        </div>
        <div className="updateBtnSection">
          <Button type="submit">Update</Button>
        </div>
        <ul className="section">
          <li>SPONSOR PORTAL: </li>
          <li>CENTRAL: </li>
          <li>PMS: </li>
          <li>DELETE PATIENT: </li>
        </ul>
        <ul className="section">
          <li>MESSAGING NUMBER: </li>
          <li>FACEBOOK URL: </li>
          <li>CNS CODE: </li>
        </ul>
      </div>
    );
  }
}

export default StudyInfoSection;
