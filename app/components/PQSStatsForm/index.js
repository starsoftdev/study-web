/**
*
* PQSStatsForm
*
*/

import React from 'react';
import { reduxForm } from 'redux-form';
import { translate } from '../../../common/utilities/localization';

@reduxForm({ form: 'pqsStatsForm', validate: null })
class PQSStatsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    selectedTime: React.PropTypes.object,
    showPopup: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      testSitesStats: [
        { name: 'placeholder #1' },
        { name: 'placeholder #2' },
        { name: 'placeholder #3' },
        { name: 'placeholder #4' },
        { name: 'placeholder #5' },
        { name: 'placeholder #6' },
        { name: 'placeholder #7' },
        { name: 'placeholder #8' },
        { name: 'placeholder #9' },
        { name: 'placeholder #10' },
        { name: 'placeholder #11' },
        { name: 'placeholder #12' },
        { name: 'placeholder #13' },
        { name: 'placeholder #14' },
        { name: 'placeholder #15' },
        { name: 'placeholder #16' },
        { name: 'placeholder #17' },
        { name: 'placeholder #18' },
        { name: 'placeholder #19' },
        { name: 'placeholder #20' },
      ],
    };

    this.download = this.download.bind(this);
  }

  download() {
    // ..
  }

  render() {
    const { selectedTime } = this.props;
    const { testSitesStats } = this.state;

    const timeButtonText = (selectedTime.startDate && selectedTime.endDate) ? `${selectedTime.startDate} - ${selectedTime.endDate}` : translate('sponsor.component.PQSStatsForm.dateRange');
    const sitesStatsListContents = testSitesStats.map((item, index) => (
      <tr key={index}>
        <td className="site">
          {item.name}
        </td>
        <td className="first values">
          {translate('sponsor.component.PQSStatsForm.na')}
        </td>
        <td className="values">
          {translate('sponsor.component.PQSStatsForm.na')}
        </td>
        <td className="values">
          {translate('sponsor.component.PQSStatsForm.na')}
        </td>
        <td className="values">
          {translate('sponsor.component.PQSStatsForm.na')}
        </td>
        <td className="values">
          {translate('sponsor.component.PQSStatsForm.na')}
        </td>
      </tr>
    ));

    return (
      <form>
        <div className="total-stats">
          <div className="item">
            <span className="counter">
              {translate('sponsor.component.PQSStatsForm.na')}
            </span>
            <span className="item-label prescreened">
              {translate('sponsor.component.PQSStatsForm.totalPrescreened')}
            </span>
          </div>
          <div className="item">
            <span className="counter">
              {translate('sponsor.component.PQSStatsForm.na')}
            </span>
            <span className="item-label successful" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.PQSStatsForm.successfulTransfer') }} />
          </div>
          <div className="item">
            <span className="counter">
              {translate('sponsor.component.PQSStatsForm.na')}
            </span>
            <span className="item-label unsuccessful" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.PQSStatsForm.unsuccessfulTransfer') }} />
          </div>
          <div className="item">
            <span className="counter">
              {translate('sponsor.component.PQSStatsForm.na')}
            </span>
            <span className="item-label duration" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.PQSStatsForm.totalDuration') }} />
          </div>
          <div className="item">
            <span className="counter">
              {translate('sponsor.component.PQSStatsForm.na')}
            </span>
            <span className="item-label mins-special">
              {translate('sponsor.component.PQSStatsForm.mins')}
            </span>
            <span className="item-label duration" dangerouslySetInnerHTML={{ __html: translate('sponsor.component.PQSStatsForm.totalDuration') }} />
          </div>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-primary download pull-left" onClick={this.props.showPopup}>
            <i className="icomoon-icon_calendar" />
            &nbsp;{timeButtonText}
          </button>
          <button type="button" className="btn btn-primary download pull-left margin-left" onClick={this.download}>
            <i className="icomoon-icon_download" />
            &nbsp;{translate('sponsor.component.PQSStatsForm.download')}
          </button>
        </div>
        <div className="main-stats-table">
          <table className="table">
            <thead>
              <tr>
                <th className="site">
                  <span>{translate('sponsor.component.PQSStatsForm.headSiteName')}</span>
                </th>
                <th className="values">
                  <span>{translate('sponsor.component.PQSStatsForm.headTotalPrescreened')}</span>
                </th>
                <th className="values">
                  <span>{translate('sponsor.component.PQSStatsForm.headSuccessfulTransfer')}</span>
                </th>
                <th className="values">
                  <span>{translate('sponsor.component.PQSStatsForm.headUnsuccessfulTransfer')}</span>
                </th>
                <th className="values">
                  <span>{translate('sponsor.component.PQSStatsForm.headIncomingCalls')}</span>
                </th>
                <th className="values">
                  <span>{translate('sponsor.component.PQSStatsForm.headTotalCallDuration')}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sitesStatsListContents.length > 0 && sitesStatsListContents}
            </tbody>
          </table>
        </div>
      </form>
    );
  }
}

export default PQSStatsForm;
