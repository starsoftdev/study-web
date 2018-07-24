import React, { PropTypes } from 'react';
import { formatTimezone } from '../../utils/time';

import { translate } from '../../../common/utilities/localization';

function SiteLocationInfo({ indications, site, protocol }) {
  // FIXME: We're choosing the first indication here. It should be handled better
  const indication = indications.find(item =>
    item.indication && item.indication.name
  );

  return (
    <div className="site-location-info">
      <div className="info-container">
        <span><b>{translate('container.page.callCenterPatient.label.siteLocation')}:</b> {site.name}</span>
        <span><b>{translate('container.page.callCenterPatient.label.address')}:</b> {site.address}</span>
        <span><b>{translate('container.page.callCenterPatient.label.protocol')}:</b> {protocol.number}</span>
        {indication &&
          <span><b>{translate('container.page.callCenterPatient.label.indication')}:</b> {indication.indication.name}</span>
        }
        <span><b>{translate('container.page.callCenterPatient.label.recruitmentPhone')}:</b> {site.phoneNumber}</span>
        {site.timezone &&
          <span><b>{translate('container.page.callCenterPatient.label.timezone')}:</b> {formatTimezone(site.timezone, site.city)}</span>
        }
      </div>
    </div>
  );
}

SiteLocationInfo.propTypes = {
  indications: PropTypes.array,
  protocol: PropTypes.object,
  site: PropTypes.object,
};

SiteLocationInfo.defaultProps = {
  indications: [],
  protocol: {},
  site: {},
};

export default SiteLocationInfo;
