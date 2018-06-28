import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import expect from 'expect';
import chai from 'chai';
import StudyPage from '../index';
chai.use(chaiEnzyme());
const chaiExpect = chai.expect;

describe('<StudyPage />', () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const props = {
        campaigns: [],
        currentUser:  { id: 4, username: 'raypalmer' },
        fetchPatients: expect.createSpy(),
        fetchPatientCategories: expect.createSpy(),
        fetchingPatients: false,
        fetchStudy: expect.createSpy(),
        fetchingStudy: false,
        patientCategories: [
          {
            id: 1,
            name: 'New Patient',
            patients: [
              {
                email: 'gordon@gotham.com',
                firstName: 'James',
                id: 2,
                lastName: 'Gordon',
                lastTextMessage: Object,
                phone: '+15248888888',
                textMessageCount: 2,
              },
              {
                email: 'queen@arrow.com',
                firstName: 'Oliver',
                id: 1,
                lastName: 'Queen',
                lastTextMessage: Object,
                phone: '+15103808089',
                textMessageCount: 42,
              },
            ],
          },
          { id: 2, name: 'Call Attempted' },
          { id: 3, name: 'Not Qualified' },
          { id: 4, name: 'Action Needed' },
          { id: 5, name: 'Scheduled' },
          { id: 6, name: 'Consented' },
          { id: 7, name: 'Randomized' },
        ],
        params: { id: '1' },
        patients: [],
        setStudyId: expect.createSpy(),
        sources: [],
        site: {
          address: null,
          city: null,
          client_id: 1,
          created: null,
          deletedAt:  null,
          id: 1,
          isDeleted: false,
          name: 'Palmer Tech',
          twilio_number_id: 3,
          piFirstName: null,
          piLastName: null,
          phoneNumber: '+15108172118',
          state: null,
          zip: null,
        },
        study: {
          mediaTracking: true,
          condenseTwoWeeks: null,
          created: '2016-11-09T14:51:48.077Z',
          description: 'Study for acne',
          id: 1,
          image: null,
          indication_id: 3,
          irbEmail: '',
          irbName: '',
          isArchived: false,
          meta: null,
          name: 'Acne Study',
          patientMessagingSuite: true,
          protocolNumber: 'AC-1',
          recruitmentPhone: null,
        },
        stats: {
          calls: 0,
          callsDuration: 0,
          referrals: 8,
          texts: 44,
          textsReceived: 24,
          textsSent: 20,
          views: 0,
        },
        socket: {},
      };

      const shallowWrapper = shallow(<StudyPage {...props} />);

      return {
        props,
        shallowWrapper,
      };
    };
  });

  it('View patient page should loading.', () => {
    const { shallowWrapper } = setup();
    chaiExpect(shallowWrapper.find('.individual-study')).to.have.length(1);
  });
});
